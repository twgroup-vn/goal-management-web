const SET_LIST_CONVERSATION = (state, messages) => {
    state.listConversation = messages.data;
    state.total = messages.total;
}

const SET_USER_LIST = (state, messages) => {
    state.userList = messages;
}

export default{
    SET_LIST_CONVERSATION,
    SET_USER_LIST
}
