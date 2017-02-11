export default function(state, action){
    const newState = Object.assign({}, state)
    switch(action.type){
        case 'FETCH_TRANSACTIONS_SUCCESSFUL':{
            console.log('FETCH_TRANSACTIONS_SUCCESSFUL')
            break;
        }
        case 'FETCH_TRANSACTIONS_FAILED':{
            console.log('FETCH_TRANSACTIONS_FAILED')
            break;
        }

    }
    return newState;
}