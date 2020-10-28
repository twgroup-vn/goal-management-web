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
            <div class="content" ref="containerChat">
                <div class="wrapper" v-for="(item,index) in userChat" :key="index">
                    <div class="group-chat friend-chat" v-if="!item.ownMessage">
                        <div class="mr-3">
                            <div class="avatar" :style="{ backgroundImage: `url(${ item.userInfo && item.userInfo.avatar ? item.userInfo.avatar : NoAvatar})` }"></div>
                            <div class="time">{{ item.isToday && item.createdAt ? item.createdAt.slice(10,16) : item.createdAt.slice(0,5) + ' -' + item.createdAt.slice(10,16) }}</div>
                        </div>
                        <div class="chat" v-if="item.type !== 'sticker'">
                            <img :src="item.image" v-if="item.image && item.type == 'image'" class="img-fluid"/>
                            <div>{{item.content}}</div>
                        </div>
                        <div class="sticker" v-else>
                            <img :src="item.image" v-if="item.image && item.type == 'sticker'" class="img-fluid"/>
                        </div>
                    </div>
                    <div class="group-chat own-chat" v-else>
                        <div class="chat" v-if="item.type !== 'sticker'">
                            <img :src="item.image" v-if="item.image && item.type == 'image'" class="img-fluid"/>
                            <div>{{item.content}}</div>
                        </div>
                         <div class="sticker" v-else>
                            <img :src="item.image" v-if="item.image && item.type == 'sticker'" class="img-fluid"/>
                        </div>
                        <div class="time ml-3">{{ item.isToday && item.createdAt ? item.createdAt.slice(10,16) : item.createdAt.slice(0,5) + ' -' + item.createdAt.slice(10,16) }}</div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <textarea placeholder="Nhập tin nhắn văn bản" rows="2" v-model="formData.content"></textarea>
                <div class="position-relative">
                    <div class="dropdown-menu uploadChat" :class="{ show : modalImageChat}">
                        <font-awesome-icon :icon="['fas', 'times']"  @click="removeImage"/>
                        <div class="dropdown-item">
                            <div class="image-chat shake" :style="{ backgroundImage: `url(${path})` }" ></div>
                        </div>
                    </div>
                </div>
                <div class="position-relative">
                    <div class="dropdown-menu sticker" :class="{ show : modalSticker}">
                        <font-awesome-icon :icon="['fas', 'chevron-down']"  @click="closeModalStickerChat"/>
                        <div class="dropdown-item">
                            <el-tabs class="w-100">
                                <el-tab-pane v-for="(item, index) in stickerList" :key="index">
                                    <span slot="label">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="mr-2">{{ item.name }}</div>
                                            <img :src="item.image" class="img-fluid tab-image"/>
                                        </div>
                                    </span>
                                    <div class="row">
                                        <div class="col-md-3" v-for="(icon, key) in item.sticker" :key="key">
                                            <div class="group-stickers" :style="{ backgroundImage: `url(${icon.image})` }" v-if="icon.image" @click="sendSticker(icon.image)"></div>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </div>
                <a class="btn btn-chat stiker" @click="handleModalSticker">
                    <font-awesome-icon :icon="['fas', 'smile-wink']" />
                </a>
                <label for="uploadImageChat" class="btn btn-chat image">
                    <font-awesome-icon :icon="['fas', 'image']" />
                    <input type="file" id="uploadImageChat" style="display:none" @change="handleFileUpload">
                </label>
                <a class="btn btn-chat mail" @click="sendMail">
                    <font-awesome-icon :icon="['fas', 'paper-plane']" />
                </a>
            </div>
        </div>
        <div :class="rightInfo == false ? 'group-infoBox' : 'group-infoBox active'">
            <div>
                <div class="avatar" :style="{ backgroundImage: `url(${ userInfoOfConversation && userInfoOfConversation.avatar ? userInfoOfConversation.avatar : NoAvatar})` }"></div>
                <div class="email">{{ userInfoOfConversation && userInfoOfConversation.fullName ? userInfoOfConversation.fullName : "" }}</div>
                <div class="number">{{ userInfoOfConversation && userInfoOfConversation.phoneNumber ? userInfoOfConversation.phoneNumber : ''}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import NoAvatar from "../../../assets/imgs/no-images.jpg";
import { mapState, mapGetters } from "vuex";
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
                conversationId: "",
                image: null
            },
            file: null,
            path: null,
            modalSticker: false,
            modalImageChat: false,
            modalStickerChat: false
        }
    },
    computed: {
        ...mapState({
            conversationId: state => state.$_conversation.conversationId,
            userInfoOfConversation: state => state.$_conversation.userInfoConversation,
        }),
        ...mapGetters({
            stickerList: "$_conversation/getStickerList",
        }),
    },
    methods:{
        collapse(){
            var _this = this;
            _this.rightInfo = ! _this.rightInfo;
        },
        scrollTop(){
            var _this = this;
            var container = _this.$refs.containerChat;
            container.scrollTop = container.scrollHeight;
        },
        handleModalSticker(){
            var _this = this;
            _this.modalSticker = true;
            _this.modalImageChat = false;
            _this.removeImage();
        },
        closeModalStickerChat(){
            var _this = this;
            _this.modalSticker = false;
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
                if(_this.formData.type === 'image'){
                    _this.formData.type = 'text';
                    _this.modalImageChat = false;
                }
                _this.formData.image = null;
            }
            catch(error){
                console.log(error);
            }
    
        },
        async sendSticker(val){
            var _this = this;
            try{
                _this.formData.conversationId = _this.conversationId;
                _this.formData.image = val;
                _this.formData.type = "sticker";
                await _this.$store.dispatch("$_conversation/sendMessage", _this.formData);
                await _this.$store.dispatch("$_loginPage/sendSocket", ({ userInput: _this.userInfoOfConversation.id, messageInput: _this.formData.content, functionInput: "$_conversation/getConversationDetail", paramsInput: _this.conversationId, typeInput: "sendTextMessage" }));
                await _this.$store.dispatch("$_conversation/getConversationDetail", _this.conversationId);
                await _this.$store.dispatch("$_conversation/getListConversation");
                _this.formData.type = 'text';
                _this.formData.image = null;
                _this.modalStickerChat = false;
            }
            catch(error){
                console.log(error);
            }
        },
        async handleFileUpload(e) {
            var _this = this;
            _this.file = e.target.files[0];
            if (_this.file) {
                var response = await this.$store.dispatch("$_conversation/uploadImage", _this.file);
                if (response && response.path) {
                _this.path = response.path;
                _this.formData.type = 'image';
                _this.formData.image = _this.path;
                _this.modalImageChat = true;
                _this.modalSticker = false;
                }
            } else {
                this.$notify.error({
                title: "Thất bại",
                message: "Ảnh k đúng định dạng",
                });
            }
        },
        removeImage(){
            var _this = this;
            _this.file = '',
            _this.path = '';
            _this.formData.type = 'text';
            _this.formData.image = null;
            _this.modalImageChat = false;
        }
    },
    updated () {
        var _this = this;
        _this.scrollTop(); 
    },
    mounted () {
        var _this = this;
        _this.scrollTop();	
    },
    props:['userChat']
}
</script>