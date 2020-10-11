const SET_LIST_CONVERSATION = (state, messages) => {
    state.listConversation = messages.data;
    state.total = messages.total;
}

const SET_CONVERSATION_DETAIL = (state, messages) => {
    state.conversationDetail = messages.data;
}

const SET_USER_INFO_CONVERSATION = (state, messages) => {
    state.userInfoConversation = messages;
}

const SET_CONVERSATION_FOCUS = (state, messages) => {
    state.conversationId = messages;
}

const SET_USER_LIST = (state, messages) => {
    state.userList = messages;
}

export default{
    SET_LIST_CONVERSATION,
    SET_CONVERSATION_DETAIL,
    SET_CONVERSATION_FOCUS,
    SET_USER_INFO_CONVERSATION,
    SET_USER_LIST
}
