const SET_CARD = (state, messages) => {
    state.card = messages.card;
    state.cardGroup = messages.cardGroup;
}

const SET_USER_LIST = (state, messages) => {
    state.userList = messages;
}

const SET_BOARD_DETAIL = (state, messages) => {
    state.boardDetail = messages;
}

const SET_COMPANY_GOAL_LIST = (state, messages) => {
    state.companyGoalList = messages.data;
}

export default{
    SET_USER_LIST,
    SET_BOARD_DETAIL,
    SET_COMPANY_GOAL_LIST,
    SET_CARD
}
