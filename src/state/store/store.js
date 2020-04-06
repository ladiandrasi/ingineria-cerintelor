import {
    applyMiddleware, createStore, combineReducers,
} from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import UserReducers from "../components/users/UserReducers";
import ModalReducers from "../components/modal/ModalReducers";
import PostReducers from "../components/posts/PostReducers";
import ApplicationReducers from "../components/applications/ApplicationReducers";
import PostAuthorReducers from "../components/post-author/PostAuthorReducers";
const loggerMiddleware = createLogger();


const appReducer = combineReducers({
    user: UserReducers.reduce,
    modal: ModalReducers.reduce,
    posts: PostReducers.reduce,
    applications: ApplicationReducers.reduce,
    postAuthors: PostAuthorReducers.reduce,
});

const store = createStore(
    persistReducer(
        {
            storage,
            key: 'store',
            timeout: null,
        },
        appReducer,
    ),
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);
const persistor = persistStore(store);
export default store;

export { persistor }
