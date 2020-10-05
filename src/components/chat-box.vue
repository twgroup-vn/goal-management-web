<template>
  <div>
    <div class="chatbox" :class="{ chatboxShow : !open}">
      <div class="chatbox-top">
        <div class="chat-name">Thuận</div>
        <div class="chatbox-icons">
            <a href="javascript:void(0);" @click="minimizeChat">
                <font-awesome-icon :icon="['fas', 'chevron-down']" />
            </a>
        </div>
      </div>

      <div class="chat-messages">
        <div class="message-box-holder">
          <div class="message-box">Hello bồ</div>
        </div>

        <div class="message-box-holder">
          <div class="message-sender">Nhựt</div>
          <div class="message-box message-partner">Hi bồ</div>
        </div>
      </div>

      <div class="chat-input-holder">
        <textarea class="chat-input"></textarea>
        <button class="btn btn-primary btn-medium border-radius-0">
            <font-awesome-icon :icon="['fas', 'paper-plane']" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
      open: false
    };
  },
  computed: {
    
  },
  methods:{
    minimizeChat: function(){
        var _this = this;
        _this.open = !_this.open;
    },
    closeChat: function(){
        var _this = this;
        _this.open = false;
    }
  }
};
</script>

<style scoped>
</style>