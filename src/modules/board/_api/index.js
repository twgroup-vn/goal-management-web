import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`http://localhost:5000/api/board/getAll`, query);
}
  
export default {
    getData,
}