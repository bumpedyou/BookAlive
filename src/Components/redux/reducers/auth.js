const token = localStorage.getItem("token") 
                ? JSON.parse(localStorage.getItem("token")) 
                : null;

const initialState = token
    ? { isLoggedIn: true, token }
    : { isLoggedIn: false, token: null };

function auth(state = initialState, action){
    
    switch (action.type) {

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                token: action.tokenObj,
            };

        case 'LOGOUT':
                return {
                ...state,
                isLoggedIn: false,
                token: null,
        };

        default:
            return state;
        }
}
export default auth;