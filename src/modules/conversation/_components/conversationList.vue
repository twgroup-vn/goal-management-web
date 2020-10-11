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
                        <div class="chat-list" v-for="(item, index) in listConversation" :key="index" @click="getConversationDetail(item)">
                            <div class="col-md-8 d-flex align-items-center">
                                <div>
                                    <div class="avatar-circle chatList" :style="{ backgroundImage: `url(${item.userInfo.avatar})` }" v-if="item.userInfo.avatar"></div>
                                    <div class="avatar-circle chatList" :style="{ backgroundImage: `url(${NoAvatar})` }" v-else></div>
                                </div>
                                <div class="ml-3">
                                    <div class="name">{{ item.userInfo.fullName ? item.userInfo.fullName : '' }}</div>
                                    <div class="lastest-chat" :class="{isRead: !item.isRead}" >{{ item.latestMessage ? item.latestMessage : '' }}</div>
                                </div>
                            </div>
                            <div class="col-md-4 noti-group">
                                <div class="noti-number chat" v-if="item.newMessage > 0 && !item.isRead">{{ item.newMessage }}</div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label">
                            <font-awesome-icon :icon="['fas', 'address-book']" />
                        </span>
                        <div class="chat-list" v-for="(item, index) in listUser" :key="index" @click="createConversationDetail(item.id)">
                            <div v-if="item.id !== userId">
                                <div class="col-12 d-flex align-items-center">
                                    <div>
                                        <div class="avatar-circle chatList" :style="{ backgroundImage: `url(${item.avatar})` }" v-if="item.avatar"></div>
                                        <div class="avatar-circle chatList" :style="{ backgroundImage: `url(${NoAvatar})` }" v-else></div>
                                    </div>
                                    <div class="ml-3">
                                        <div class="name">{{ item.fullName ? item.fullName : '' }}</div>
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
    methods: {
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
                   await _this.$store.dispatch("$_conversation/setUserInfoConversation", userInfo);
                   await _this.$store.dispatch("$_conversation/getConversationDetail", response.id);
                }
                _this.formData.participant = []; 
            }
        }
    },
    props:['listConversation', 'listUser']
}
</script>