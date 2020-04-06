import express from 'express'
import passport from 'passport';
import LocalStrategy from 'passport-local';
import DB from './db/DB';
import cors from 'cors';
import BaseDao from "./components/base/dao/BaseDao";
import UserRoutes from "./components/users/UserRoutes";
import PostRoutes from "./components/posts/PostRoutes";
import ApplicationRoutes from "./components/applications/ApplicationRoutes";
import PostAuthorRoutes from "./components/post-author/PostAuthorRoutes";
const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        const dao = new BaseDao('users');
        dao.findOne({ email }).then(user=> {
            if(user.email !== email) {
                return done('Wrong email');
            }
            if(user.password !== password) {
                return done('Wrong password');
            }
            return done(null, user)
        })
    }
));

app.post('/api/v1/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(400).send({ message: err}); }
        if (!user) { return res.status(400).send({ message: info}); }
        return res.status(200).send({ message: 'Logged in.', user});
    })(req, res, next);
});

new UserRoutes(app, '/api/v1/users').mount();
new PostRoutes(app, '/api/v1/posts').mount();
new ApplicationRoutes(app, '/api/v1/applications').mount();
new PostAuthorRoutes(app, '/api/v1/post-authors').mount();

DB.connect().then(() => {
    app.listen(4000, () => console.log('Server started on 4000!'));
});

