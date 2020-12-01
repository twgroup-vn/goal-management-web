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
        v.mainResult = v.mainResult ? _.filter(v.mainResult, (o) => { return !o.isDelete }) : '';
        for(var x = 0; x < v.card.length; x++){
          v.assignObject = v.card[x].assign ? JSON.parse(v.card[x].assign.replace(/'/g, '"')) : '';
          console.log(v.assignObject);
        }
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
