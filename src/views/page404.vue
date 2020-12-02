<template>
  <div class="row" style="margin: 0 auto">
    <div class="col-md-6 col-md-offset-3">
      <div class="text-center content-group">
        <h1 class="error-title">404</h1>
        <h5>Xin lỗi, không tìm thấy trang này</h5>
      </div>
      <div class="text-center content-group">
        <button @click="redirectTo('/')" type="button" class="btn-primary"><i class="icon-circle-left2 position-left"></i> Trở về trang chủ </button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      redirectTo: function (path) {
        if (path) {
          this.$router.push(path)
        } else {
          this.$router.go(-1)
        }
      },
    }
  }
</script>