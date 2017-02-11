export default function reducer(state, action){
    const newState = Object.assign({}, state);
    switch(action.type) {
        case 'SIGNUP_FULFILLED': {
            console.log('SIGNUP_FULFILLED')
            break;
        }
        case 'SIGNIN_FULFILLED':{
            console.log('SIGNIN_FULFILLED')
            break;
        }
        case 'SIGNUP_SUCCESSFUL':{
            console.log('SIGNUP_SUCCESSFUL')
            break;
        }
        case 'SIGNIN_SUCCESSFUL':{
            console.log('SIGNIN_SUCCESSFUL')
            break;
        }
    }
   return newState;
}