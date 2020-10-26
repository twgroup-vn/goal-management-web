import _ from 'lodash'

const getBoardDetail = (state) => {
  var data = {};
  if (state.boardDetail) {
    data = _.cloneDeep(state.boardDetail);
    data.userList = [];
    data.participantOject = data.participant ? JSON.parse(data.participant.replace(/'/g, '"')) : '';
    if(data.participantOject && data.participantOject.length && state.userList){
        for( let i = 0; i < data.participantOject.length ; i++ ){
          let userInfo = _.find(state.userList, o => { return o.id === data.participantOject[i]});
          data.userList.push(userInfo);
        }
    }
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
