import _ from 'lodash'

const getData = (state) => {
  var data = {};
  if (state.data) {
    data = _.map(state.data, (v) => {
      v.positionDetails = JSON.parse(v.position);
      v.positionInCompany = _.find(v.positionDetails, (o)=>{ return o.CompanyId == localStorage.getItem('companyId') });
      if(state.departmentList){
        v.departmentName = v.positionInCompany && v.positionInCompany.DepartmentId ? _.find(state.departmentList,(o)=>{ return o.id == v.positionInCompany.DepartmentId }).name  : '';
      }
      if(state.positionList){
        v.positionName = v.positionInCompany && v.positionInCompany.PositionId ? _.find(state.positionList,(o)=>{ return o.id == v.positionInCompany.PositionId }).name  : '';
      }
      return v;
    });
    data = _.filter(data, (o) => { return !o.isDelete });
    data.data = data;
    data.total = state.total;
  }
  return data;
};

export default {
  getData,
};
