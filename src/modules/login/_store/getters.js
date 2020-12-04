import _ from 'lodash'

const getCompanyOfUser = (state) => {
  return state.companiesOfUser;
};

const getCompanyDetail = (state) =>{
  return state.companyDetails;
}

const getCurrentUser = (state) =>{
  var data = {};
  if(state.currentUser){
    data = _.cloneDeep(state.currentUser);
    data.positionObject = data && data.position ? JSON.parse(data.position) : null;
  }
  return data;
}

const getQuestionsCompany = (state) =>{
  if (state.companyDetails) {
    var sortArray = _.filter(state.companyDetails.checkInQuestion, (o) => { return o.orderNo < 5 });
    sortArray.sort((a, b) => {
      if (a.orderNo < b.orderNo)
        return -1;
      if (a.orderNo > b.orderNo)
        return 1;
      return 0;
    });
    return sortArray;
  }
}

const getCycleCompany = (state) => {
  var data = [];
  if(state.companyDetails && state.companyDetails.cycle){
    data = _.cloneDeep(state.companyDetails.cycle);
  }
  return data;
}

const getEvaluateCriteriaCompany = (state) => {
  var data = [];
  if(state.companyDetails && state.companyDetails.evaluativeCriteria){
    data = _.cloneDeep(state.companyDetails.evaluativeCriteria);
  }
  return data;
}

export default {
  getCompanyOfUser,
  getCompanyDetail,
  getQuestionsCompany,
  getCurrentUser,
  getCycleCompany,
  getEvaluateCriteriaCompany
};
