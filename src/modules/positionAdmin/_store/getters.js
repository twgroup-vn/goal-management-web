import _ from 'lodash'

const getData = (state) => {
  var data = {};
  if (state.data) {
    data = _.map(state.data, (v) => {
      if(state.departmentList && state.departmentList.length && v.departmentId){
        v.departmentName = _.find(state.departmentList, (o)=>{ return o.id == v.departmentId });
        v.departmentName = v.departmentName.name;
      }
      else{
        v.departmentName = null;
      }
      return v;
    });
    data = _.filter(data, (o) => { return !o.isDelete });
    data.data = data;
    data.total = state.total;
  }
  return data;
};

const getDepartmentList = (state) => {
  return state.departmentList;
};

export default {
  getData,
  getDepartmentList
};
