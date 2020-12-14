<template>
  <div>
    <div class="row">
      <div class="col-3 pr-0 page-content">
        <conversation-list :list-conversation="dataConversation" :list-user="userList"></conversation-list>
      </div>
      <div class="col-9 pl-0 page-content">
        <chat-box :user-chat="conversationDetail"></chat-box>
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
      searchRequest: state => state.$_conversation.searchRequest,
    }),
    ...mapGetters({
        conversationDetail: "$_conversation/getConversationDetail",
        dataConversation: "$_conversation/getListConversation",
        userList: "$_conversation/getUserList",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_conversation";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    await _this.$store.dispatch("$_conversation/getUserList");
    await _this.$store.dispatch("$_conversation/getListConversation");
    await _this.$store.dispatch("$_conversation/getStickerList");
    if(localStorage.getItem("conversationId") && localStorage.getItem("userInfoOfConversation")){
      await _this.$store.dispatch("$_conversation/setUserInfoConversation", JSON.parse(localStorage.getItem("userInfoOfConversation")));
      await _this.$store.dispatch("$_conversation/getConversationDetail", localStorage.getItem("conversationId"));
    }
    else{
      if(_this.dataConversation && _this.dataConversation.length){
        localStorage.setItem("userInfoOfConversation", JSON.stringify(_this.dataConversation[0].userInfo));
        await _this.$store.dispatch("$_conversation/setUserInfoConversation", _this.dataConversation[0].userInfo);
        await _this.$store.dispatch("$_conversation/getConversationDetail", _this.dataConversation[0].id);
      }
    }
  },
  methods: {},
};
</script>
