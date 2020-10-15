import _ from 'lodash'

const getData = (state) => {
  var data = {};
  if (state.data) {
    var myBoard = []; 
    data = _.map(state.data, (v) => {
      v.userList = [];
      v.participantOject = v.participant ? JSON.parse(v.participant.replace(/'/g, '"')) : '';
      if(v.participantOject && v.participantOject.length && state.userList){
          for( let i = 0; i < v.participantOject.length ; i++ ){
            let userInfo = _.find(state.userList, o => { return o.id === v.participantOject[i]});
            v.userList.push(userInfo);
          }
      }
      v.isMember = v.participant && v.participant.includes(localStorage.getItem("userId")) ? true : false;
      if(v.isMember){
        myBoard.push(v);
      }
      return v;
    });
    data.data = data;
    data.myBoard = myBoard;
    data.total = state.total;
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

export default {
  getData,
  getUserList
};
