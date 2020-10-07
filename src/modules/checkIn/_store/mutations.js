const SET_USER_LIST = (state, messages) => {
    state.userList = messages;
}

const SET_GOAL_LIST = (state, messages) => {
    state.goalList = messages.data;
    state.total = messages.total;
}

const SET_COMPANY_GOAL_LIST = (state, messages) => {
    state.companyGoalList = messages.data;
}

export default{
    SET_USER_LIST,
    SET_GOAL_LIST,
    SET_COMPANY_GOAL_LIST
}
