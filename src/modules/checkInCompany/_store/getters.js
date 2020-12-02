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

const getAllGoalOfCompany = (state) => {
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
        v.mainResult = v.mainResult ? _.filter(v.mainResult, (o) => { return !o.isDelete }) : '';
        v.card = _.map(v.card, (x) => {
          x.assignObject = x.assign ? JSON.parse(x.assign.replace(/'/g, '"')) : '';
          x.assignee = state.userList.find(o => o.id == x.assignObject).fullName;
          x.avatarAssign = state.userList.find(o => o.id == x.assignObject).avatar;
          return x;
        });
        var userDetails = _.find(state.userList, (o)=>{ return o.id === v.userId });
        v.convertName = userDetails.fullName.split(" ").map(x => x[0]).join("").slice(-2);
        v.avatar = userDetails.avatar ? userDetails.avatar : '';
        v.fullName = userDetails.fullName ? userDetails.fullName : '';
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

const getUserGoal = (state) => {
  var data = {};
  if (state.goalUser) {
    data = _.map(state.goalUser, (v) => {
      return v;
    });
    if(state.cycleId){
      data = _.filter(data,(o)=>{
        return o.cycleId === state.cycleId
      });
    }
  }
  return data;
};


export default {
  getUserList,
  getGoalList,
  getUserGoal,
  getAllGoalOfCompany
};
