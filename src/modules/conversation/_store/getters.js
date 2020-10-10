import _ from 'lodash'

const getListConversation = (state) => {
  var data = {};
  if (state.listConversation && state.userList && state.userList.length) {
    data = _.map(state.listConversation, (v) => {
      v.participantOject = v.participant ? JSON.parse(v.participant.replace(/'/g, '"')) : '';
       _.filter(v.participantOject, x => {return x.id === localStorage.getItem("userId")});
      v.userInfo = _.find(state.userList, (o)=>{ return v.participantOject.indexOf(o.id) > -1 });
      v.isRead = v.isRead && v.latestMessenger !== localStorage.getItem("userId")  ? false : true
      console.log(v)
      return v;
    });
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
  getListConversation,
  getUserList
};
