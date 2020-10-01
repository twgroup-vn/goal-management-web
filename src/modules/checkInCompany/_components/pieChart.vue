<template>
    <div id="chart" class="chart donut">
      <apexchart type="donut" :options="options" :series="series"></apexchart>
    </div>
</template>
<script>
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
Vue.component("apexchart", VueApexCharts);
export default {
  data() {
    return {
      options: {},
      series: []
    }
  },
  async mounted() {
    var _this = this;
    _this.loadData();

  },
  async created() {
    var _this = this;
    _this.loadData();
  },
  methods: {
    loadData(){
        var _this = this;
        _this.series = [44, 55, 41, 17, 15],
        _this.options = {
            chart: {
              type: 'donut',
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 120,
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
        }                          
    }
  }    
}
</script>