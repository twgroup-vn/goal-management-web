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
                        <div class="chat-list" v-for="(item, index) in listConversation" :key="index">
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
                        <div class="chat-list" v-for="(item, index) in listUser" :key="index">
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
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import NoAvatar from "../../../assets/imgs/no-images.jpg";
export default {
    components: {},
    data() {
        return {
            search: '',
            NoAvatar
        }
    },
    props:['listConversation', 'listUser']
}
</script>