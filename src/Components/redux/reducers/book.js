
function auth(state = [], action){
    
    switch (action.type) {

        case 'ADD_BOOK':

            let isExistBookItem = state.find((item, i) => item === action.payload);
            
            if(isExistBookItem){
                return state.filter((item, i) => item !== action.payload);
            }

            return [
                ...state,
                action.payload,
            ];          
        case 'CLEAR_BOOK':
            return [];
        default:
            return state;
        }
}
export default auth;