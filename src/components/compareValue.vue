<template>
    <div>
        {{ value > 0 ? `+${value}` : `-${value}` }}
        <span v-if="type===commonData.PERCENT">
            %
        </span>
        <span v-if="type===commonData.STAR">
            <font-awesome-icon :icon="['fa', 'star']" class="icon-star-color" />
        </span>
        <span v-if="type===commonData.VND">
            VNĐ
        </span>
        <span v-if="type===commonData.DOLA">
            $
        </span>
        <span v-if="type===commonData.TIME">
            lần
        </span>
        <span v-if="type===commonData.PRODUCT">
            sản phẩm
        </span>
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
  props: ['type', 'value']
}
</script>
<style scoped>
.icon-star-color{
    color: #f7ba2a;
}
</style>