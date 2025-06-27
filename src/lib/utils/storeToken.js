
export const storeAccessToken = (responses) => {
    const token = responses.accessToken;
    if (token) {
        sessionStorage.setItem('token', token);
    }
};
export const getAccessToken = () => {
    return sessionStorage.getItem('token');
};

export const clearAccessToken = () => {
    sessionStorage.removeItem('token');
};
