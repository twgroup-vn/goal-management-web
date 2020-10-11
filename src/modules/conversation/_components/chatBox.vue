<template>
    <div>
        <div :class="rightInfo == false ? 'group-chatBox' : 'group-chatBox active'">
            <div class="header">
                <div>{{ userInfoOfConversation && userInfoOfConversation.fullName ? userInfoOfConversation.fullName : "" }}</div>
                <div class="collapse-option">
                    <a @click="collapse">
                        <font-awesome-icon :icon="['fas', 'arrow-circle-right']" :class="{ show : rightInfo == false}"/>
                        <font-awesome-icon :icon="['fas', 'arrow-circle-left']" :class="{ show : rightInfo == true}"/>
                    </a>
                </div>
            </div>
            <div class="content" v-for="(item,index) in userChat" :key="index">
                <div class="group-chat friend-chat" v-if="!item.ownMessage">
                    <div class="mr-3">
                        <div class="avatar" :style="{ backgroundImage: `url(${ item.userInfo && item.userInfo.avatar ? item.userInfo.avatar : NoAvatar})` }"></div>
                        <div class="time">{{ item.isToday && item.createdAt ? item.createdAt.slice(10) : item.createdAt.slice(0,5) + ' -' + item.createdAt.slice(10,16) }}</div>
                    </div>
                    <div class="chat">{{item.content}}</div>
                </div>
                <div class="group-chat own-chat" v-else>
                    <div class="chat">{{item.content}}</div>
                    <div class="time ml-3">{{ item.isToday && item.createdAt ? item.createdAt.slice(10,16) : item.createdAt }}</div>
                </div>
            </div>
            <div class="footer">
                <textarea placeholder="Nhập tin nhắn văn bản" rows="2" v-model="formData.content"></textarea>
                <a class="btn btn-sendMail" @click="sendMail">
                    <font-awesome-icon :icon="['fas', 'paper-plane']" />
                </a>
            </div>
        </div>
        <div :class="rightInfo == false ? 'group-infoBox' : 'group-infoBox active'">
            <div>
                <div class="avatar" :style="{ backgroundImage: `url(${ userInfoOfConversation && userInfoOfConversation.avatar ? userInfoOfConversation.avatar : NoAvatar})` }"></div>
                <div class="email">{{ userInfoOfConversation && userInfoOfConversation.fullName ? userInfoOfConversation.fullName : "" }}</div>
                <div class="number">{{ userInfoOfConversation && userInfoOfConversation.phoneNumber ? userInfoOfConversation.phoneNumber : ''}}</div>
                <!-- <div class="department">
                    <div class="mb-2">IT Department</div>
                    <div>Front end designer</div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import NoAvatar from "../../../assets/imgs/no-images.jpg";
import { mapState } from "vuex";
export default {
    components: {},
    data() {
        return {
            NoAvatar,
            rightInfo: true,
            formData: {
                content: "",
                type: "text",
                isDelete: false,
                conversationId: ""
            }
        }
    },
    computed: {
        ...mapState({
            conversationId: state => state.$_conversation.conversationId,
            userInfoOfConversation: state => state.$_conversation.userInfoConversation,
        }),
    },
    methods:{
        collapse(){
            var _this = this;
            _this.rightInfo = ! _this.rightInfo;
        },
        async sendMail(){
            var _this = this;
            try{
                _this.formData.conversationId = _this.conversationId;
                await _this.$store.dispatch("$_conversation/sendMessage", _this.formData);
                await _this.$store.dispatch("$_loginPage/sendSocket", ({ userInput: _this.userInfoOfConversation.id, messageInput: _this.formData.content, functionInput: "$_conversation/getConversationDetail", paramsInput: _this.conversationId, typeInput: "sendTextMessage" }));
                await _this.$store.dispatch("$_conversation/getConversationDetail", _this.conversationId);
                await _this.$store.dispatch("$_conversation/getListConversation");
                _this.formData.content = "";
            }
            catch(error){
                console.log(error);
            }
    
        }
    },
    props:['userChat']
}
</script>