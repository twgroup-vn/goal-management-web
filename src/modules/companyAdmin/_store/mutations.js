const SET_DATA = (state, messages) => {
    state.data = messages.data;
}

const SET_DATA_NO_PAGING = (state, messages) => {
    state.total = messages.data.length;
}

const SET_SEARCH = (state, messages) => {
    state.search = messages
};

const SET_ORDERBY = (state, messages) => {
    state.sortBy = messages;
};

const SET_ORDER_DIRECTION = (state, messages) => {
    state.sortDirection = messages;
};

const DELETE_DATA = (state, messages) => {
    state.data = messages;
};

export default{
    SET_DATA,
    SET_DATA_NO_PAGING,
    SET_SEARCH,
    SET_ORDERBY,
    SET_ORDER_DIRECTION,
    DELETE_DATA
}
