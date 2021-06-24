const INITIAL_STATE = {
    users : [],
    currUser : {},
    chats: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "USERDATA":
            return {
                ...state,
                currUser : action.payload
            }
        case "GETUSERS":
            return {
                ...state,
                users: action.payload
            }
        case "CHATS":
            return {
                ...state,
                chats:[...state.chats,action.payload]
            }
    }
    return state;
}