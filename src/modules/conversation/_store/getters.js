import _ from 'lodash';
import moment from 'moment';

const getListConversation = (state) => {
  var data = {};
  if (state.listConversation && state.userList && state.userList.length) {
    data = _.map(state.listConversation, (v) => {
      v.participantOject = v.participant ? JSON.parse(v.participant.replace(/'/g, '"')) : '';
      v.participantOject = _.filter(v.participantOject, x => { return x !== localStorage.getItem("userId")});
      v.userInfo = _.find(state.userList, (o)=>{ return v.participantOject.indexOf(o.id) > -1 });
      v.isRead = !v.isRead && v.latestMessenger !== localStorage.getItem("userId")  ? false : true;
      return v;
    });
  }
  return data;
};

const getConversationDetail = (state) => {
  var data = {};
  var currentDate = moment(new Date()).format('DD/MM/YYYY');
  if (state.conversationDetail && state.userList && state.userList.length) {
    data = _.map(state.conversationDetail, (v) => {
      v.userInfo = _.find(state.userList, (o)=>{ return o.id === v.userId });
      v.ownMessage = v.userId === localStorage.getItem('userId') ? true : false; 
      v.isToday = v.createdAt.slice(0,10) === currentDate ? true : false;
      return v;
    });
    data = _.reverse(data);
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
  getConversationDetail,
  getUserList
};
