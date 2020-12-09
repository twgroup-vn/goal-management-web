<template>
    <div>
        <div class="group-conversationList">
            <div class="main-title">Conversation list</div>
            <div class="group-search">
                <font-awesome-icon :icon="['fas', 'search']" class="icon-search"/>
                <el-input placeholder="Search" v-model="search" class="mb-3"></el-input>
            </div>
            <div class="group-tab">
                <el-tabs type="border-card">
                    <el-tab-pane>
                        <span slot="label">
                            <font-awesome-icon :icon="['fas', 'history']" />
                        </span>
                        <div class="group-chatList" v-on:scroll="handleScroll">
                            <div class="chat-list" :class="conversationId == item.id ? 'active' : ''" v-for="(item, index) in listConversation" :key="index" @click="getConversationDetail(item)">
                                <div class="d-flex align-items-center">
                                    <div>
                                        <div class="avatar-circle chatList" :style="{ backgroundImage: `url(${item.userInfo.avatar})` }" v-if="item && item.userInfo && item.userInfo.avatar"></div>
                                        <div class="avatar-circle chatList" :style="{ backgroundImage: `url(${NoAvatar})` }" v-else></div>
                                    </div>
                                    <div class="ml-3">
                                        <div class="name">{{ item && item.userInfo && item.userInfo.fullName ? item.userInfo.fullName : '' }}</div>
                                        <div class="lastest-chat" :class="{isRead: !item.isRead}">{{ item.latestMessage ? item.latestMessage : '' }}</div>
                                    </div>
                                </div>
                                <div class="noti-group">
                                    <div class="noti-number chat" v-if="item.newMessage > 0 && !item.isRead">{{ item.newMessage }}</div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label">
                            <font-awesome-icon :icon="['fas', 'address-book']" />
                        </span>
                        <div class="group-chatList">
                            <div class="chat-list mb-2" v-for="(item, index) in listUser" :key="index" @click="createConversationDetail(item.id)">
                                <div v-if="item.id !== userId">
                                    <div class="d-flex align-items-center">
                                        <div>
                                            <div class="avatar-circle chatList" :style="{ backgroundImage: `url(${item.avatar})` }" v-if="item && item.avatar"></div>
                                            <div class="avatar-circle chatList" :style="{ backgroundImage: `url(${NoAvatar})` }" v-else></div>
                                        </div>
                                        <div class="ml-3">
                                            <div class="name">{{ item && item.fullName ? item.fullName : '' }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import NoAvatar from "../../../assets/imgs/no-images.jpg";
import { mapState } from "vuex";
import _ from "lodash";
export default {
    components: {},
    data() {
        return {
            search: '',
            NoAvatar,
            userId: localStorage.getItem("userId"),
            formData: {
                participant: [],
                isDelete: false,
                IsRead: true,
            },
        }
    },
    computed: {
        ...mapState({
            searchRequest: state => state.$_conversation.searchRequest,
            conversationId: state => state.$_conversation.conversationId,
        }),
  },
    methods: {
        async handleScroll(e) {
            if(e.target.scrollTop == 0){
                var _this = this;
                _this.searchRequest.pageSize = _this.searchRequest.pageSize + 5;
                await _this.$store.dispatch("$_conversation/getListConversation");
            }
        },
        async getConversationDetail(data){
            var _this = this;
            localStorage.setItem("userInfoOfConversation", JSON.stringify(data.userInfo));
            await _this.$store.dispatch("$_conversation/setUserInfoConversation", data.userInfo);
            await _this.$store.dispatch("$_conversation/getConversationDetail", data.id);
        },
        async createConversationDetail(userId){
            var _this = this;
            var exist = _.find(_this.listConversation, o => { return o.participantOject.indexOf(userId) > -1 });
            if(exist){
                localStorage.setItem("userInfoOfConversation", JSON.stringify(exist.userInfo));
                localStorage.setItem("conversationId", exist.id);
                await _this.$store.dispatch("$_conversation/setUserInfoConversation", exist.userInfo);
                await _this.$store.dispatch("$_conversation/getConversationDetail", exist.id);
            }
            else{
                _this.formData.participant.push(localStorage.getItem('userId'));
                _this.formData.participant.push(userId);
                _this.formData.participant = JSON.stringify(_this.formData.participant);
                _this.formData.participant = _this.formData.participant.replace(/"/g, "'");
                var response = await _this.$store.dispatch("$_conversation/createConversation", _this.formData);
                if(response){
                   var userInfo =  _.filter(_this.listUser, o => { return o.id === userId });
                   localStorage.setItem("userInfoOfConversation", JSON.stringify(userInfo));
                   localStorage.setItem("conversationId", response.id);
                   window.location.reload();
                   await _this.$store.dispatch("$_conversation/setUserInfoConversation", userInfo);
                   await _this.$store.dispatch("$_conversation/getConversationDetail", response.id);
                }
                _this.formData.participant = []; 
            }
        },
    },
    mounted: function () {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed: function () {
      window.removeEventListener('scroll', this.handleScroll);
    },
    props:['listConversation', 'listUser']
}
</script>