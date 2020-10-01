const SET_USER_LIST = (state, messages) => {
    state.userList = messages;
}

const SET_GOAL_LIST = (state, messages) => {
    state.goalList = messages.data;
    state.total = messages.total;
}

const SET_GOAL_USER = (state, messages) => {
    state.goalUser = messages.data;
}

const SET_GOAL_USER_AFTER_CHANGE_CYCLE = (state, messages) => {
    state.cycleId = messages;
}

export default{
    SET_USER_LIST,
    SET_GOAL_LIST,
    SET_GOAL_USER,
    SET_GOAL_USER_AFTER_CHANGE_CYCLE
}
