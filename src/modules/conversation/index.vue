<template>
  <div>
    <div class="row">
      <div class="col-md-4 pr-0">
        <conversation-list></conversation-list>
      </div>
      <div class="col-md-8 pl-0">
        <chat-box></chat-box>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import commonData from '../../utils/common-data';
import store from "./_store";
import ConversationList from './_components/conversationList'
import ChatBox from './_components/chatBox'
// import _ from 'lodash';
export default {
  components: {
    'conversation-list': ConversationList,
    'chat-box': ChatBox
  },
  data() {
    return {
      commonData,
    };
  },
  computed: {
    ...mapState({
      // headers: state => state.$_conversation.headers,
      // searchRequest: state => state.$_conversation.searchRequest,
    }),
    ...mapGetters({
        // data: "$_conversation/getData",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_conversation";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    // await _this.$store.dispatch("$_conversation/getData");
  },
  methods: {
    // async handleSearch(){
    //   var _this = this;
    //   _this.searchRequest.description = _this.description;
    //   await _this.$store.dispatch("$_replyAdmin/getData");
    // },
  },
};
</script>
