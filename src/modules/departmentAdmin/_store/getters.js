import _ from 'lodash'

const getData = (state) => {
  var data = {};
  if (state.data) {
    data = _.map(state.data, (v) => {
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
