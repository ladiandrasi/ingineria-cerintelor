const baseUrl = 'http://localhost:4000/api/v1';

const auth = {
    login: () => `${baseUrl}/login`,
};

const users = {
    getOne: (userId) => `${baseUrl}/users/${userId}`,
    getAll: () => `${baseUrl}/users`,
    updateOne: (userId) => `${baseUrl}/users/${userId}`,
    insertOne: () => `${baseUrl}/users`,
};

const posts = {
    getOne: (postId) => `${baseUrl}/posts/${postId}`,
    getAll: () => `${baseUrl}/posts`,
    getFiltered: (filter) => `${baseUrl}/posts?filter=${filter}`,
    insertOne: () => `${baseUrl}/posts`,
    deleteOne: (postId) => `${baseUrl}/posts/${postId}`,
    updateOne: (postId) => `${baseUrl}/posts/${postId}`,
};

const applications = {
    getOne: (applicationId) => `${baseUrl}/applications/${applicationId}`,
    getAllStudentApplications: (userId) => `${baseUrl}/applications/student/${userId}`,
    getAllFirmApplications: (userId) => `${baseUrl}/applications/firm/${userId}`,
    insertOne: () => `${baseUrl}/applications`,
    updateOne: (applicationId) => `${baseUrl}/applications/${applicationId}`,
    deleteOne: (applicationId) => `${baseUrl}/applications/${applicationId}`,
};

const postAuthor = {
    getOne: (userId) => `${baseUrl}/post-authors/${userId}`,
};

export {
    users,
    posts,
    applications,
    auth,
    postAuthor,
}

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';

export {
    GET,
    POST,
    PUT,
    DELETE,
}
