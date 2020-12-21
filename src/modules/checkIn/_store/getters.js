import _ from 'lodash'
import moment from 'moment';

const getUserList = (state) => {
  var data = {};
  if (state.userList) {
    data = _.map(state.userList, (v) => {
      return v;
    });
  }
  return data;
};

const getCompanyGoalList = (state) => {
  var data = {};
  if (state.companyGoalList) {
    data = _.map(state.companyGoalList, (v) => {
      return v;
    });
  }
  return data;
};

const getGoalList = (state) => {
    var data = {};
    var currentDate = moment(new Date()).format('DD/MM/YYYY');
    if (state.goalList) {
      data = _.map(state.goalList, (v) => {
        v.mainResult = v.mainResult ? _.filter(v.mainResult, (o) => { return !o.isDelete && !o.subGoalId }) : '';
        v.card = _.map(v.card, (x) => {
          x.assignObject = x.assign ? JSON.parse(x.assign.replace(/'/g, '"')) : '';
          x.assignees = state.userList.filter(o => x.assignObject.includes(o.id));
          return x;
        });
        var higherUser = _.find(state.userList, (o)=>{ return o.id === v.higherUserId });
        v.higherUserName = higherUser && higherUser.fullName ? higherUser.fullName : '';
        if(v.checkIn && v.checkIn.length){
            for( var i = 0; i < v.checkIn.length; i++){
                if( v.checkIn[i].createdAt.slice(0,10) === currentDate){
                    v.checkInStatus = 'done';
                    break;
                }
                else
                {
                    v.checkInStatus = 'waitingCheckIn';
                }
            }
        }
        else
        {
            v.checkInStatus = 'waitingCheckIn';
        }
        return v;
      });
      data.total = state.total;
    }
    return data;
};

export default {
  getUserList,
  getGoalList,
  getCompanyGoalList
};
