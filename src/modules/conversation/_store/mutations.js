const SET_DATA = (state, messages) => {
    state.data = messages.data;
    state.total = messages.total;
}

const SET_USER_LIST = (state, messages) => {
    state.userList = messages;
}

const SET_GOAL_LIST = (state, messages) => {
    state.goalList = messages.data;
    state.total = messages.total;
}

export default{
    SET_DATA,
    SET_USER_LIST,
    SET_GOAL_LIST
}
