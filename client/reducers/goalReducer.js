export default function reducer(state, action){
    const newState = Object.assign({}, state);
    switch(action.type) {
        case 'CREATE_GOAL_SUCCESSFUL':{
            console.log('CREATE_GOAL_SUCCESSFUL')
            break;
        }
        case 'CREATE_GOAL_FAILED':{
            console.log('CREATE_GOAL_FAILED')
            break;
        }
        case 'FETCH_GOALS_SUCCESSFUL':{
            console.log('FETCH_GOALS_SUCCESSFUL')
            break;
        }
        case 'FETCH_GOALS_FAILED': {
            console.log('FETCH_GOALS_FAILED')
            break;
        }
        case 'UPDATE_GOAL_SUCCESSFUL':{
            console.log('UPDATE_GOAL_SUCCESSFUL')
            break;
        }
        case 'UPDATE_GOAL_FAILED':{
            console.log('UPDATE_GOAL_FAILED')
            break;
        }
    }
    return newState;
}