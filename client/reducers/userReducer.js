export default function reducer(state, action){
    const newState = Object.assign({}, state);
    switch(action.type) {
        case 'SIGNIN_OR_SIGNUP_FAILED': {
            console.log('SIGNIN_OR_SIGNUP_FAILED')
            break;
        }
        case 'SIGNIN_OR_SIGNUP_SUCCESSFUL':{
            console.log('SIGNIN_OR_SIGNUP_SUCCESSFUL')
            break;
        }
    }
   return newState;
}