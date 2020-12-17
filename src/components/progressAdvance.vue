<template>
    <div>
        <div v-if="type===commonData.PERCENT">
            <el-progress :percentage="value" :format="format" :color="customColorMethod"></el-progress>
        </div>
        <div v-if="type===commonData.STAR">
            <el-rate
                v-model="value"
                :max="value > 5 ? 10 : 5"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>
        </div>
        <div v-if="type===commonData.VND">
            <span class="valueVND">{{ value | currency }}</span> <small>VNĐ</small>
        </div>
        <div v-if="type===commonData.DOLA">
            $ <span class="valueVND">{{ value | currency}}</span>
        </div>
        <div v-if="type===commonData.TIME">
            <span class="valueVND">{{ value | currency }}</span> <small>lần</small>
        </div>
        <div v-if="type===commonData.PRODUCT">
            <span class="valueVND">{{ value | currency }}</span> <small>sản phẩm</small>
        </div>
    </div>
</template>
<script>
import commonData from "../utils/common-data";
export default {
  data() {
    return {
        commonData,
    };
  },
  watch: {
    value: function(val){
        console.log(val);
    }
  },
  created() {
  },
  methods: {
    // percent format
    customColorMethod(percentage) {
      if (percentage < 10) {
        return '#909399';
      } else if (percentage < 50) {
        return '#ff0404';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    },
    format(percentage) {
      return percentage === 100 ? "Full" : `${percentage}%`;
    },
  },
  props: ['type', 'value']
};
</script>
<style scoped>
.valueVND{
    font-size: 14px;
    color: green;
}
</style>