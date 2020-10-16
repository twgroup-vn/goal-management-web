import _ from 'lodash'

const getBoardDetail = (state) => {
  var data = {};
  if (state.boardDetail) {
    data = _.cloneDeep(state.boardDetail);
  }
  return data;
};

const getUserList = (state) => {
    var data = {};
    if (state.userList) {
      data = _.map(state.userList, (v) => {
        return v;
      });
    }
    return data;
};

const getListCard = (state) => {
  var data = [];
  if (state.card) {
    data = _.map(state.card, o => {
      return o;
    });
  }
  return data;
};

export default {
    getUserList,
    getBoardDetail,
    getListCard
};
