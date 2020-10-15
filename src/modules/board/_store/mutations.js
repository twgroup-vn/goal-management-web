const SET_DATA = (state, messages) => {
    state.data = messages.data;
    state.total = messages.total;
}

const SET_USER_LIST = (state, messages) => {
    state.userList = messages;
}

export default{
    SET_DATA,
    SET_USER_LIST
}
