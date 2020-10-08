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
                        <div class="chat-list">
                            <div class="col-md-8 d-flex align-items-center">
                                <div class="avatar-circle chatList" :style="{ backgroundImage: `url(${NoAvatar})` }"></div>
                                <div class="ml-3">
                                    <div class="name">Hiếu Thuận</div>
                                    <div class="lastest-chat">Chào</div>
                                </div>
                            </div>
                            <div class="col-md-4 noti-group">
                                <div class="noti-number chat">1</div>
                            </div>
                        </div>
                        <div class="chat-list">
                            <div class="col-md-8 d-flex align-items-center">
                                <div class="avatar-circle chatList" :style="{ backgroundImage: `url(${NoAvatar})` }"></div>
                                <div class="ml-3">
                                    <div class="name">Phương Linh</div>
                                    <div class="lastest-chat">Chào</div>
                                </div>
                            </div>
                            <div class="col-md-4 noti-group">
                                <div class="noti-number chat">1</div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label">
                            <font-awesome-icon :icon="['fas', 'address-book']" />
                        </span>
                        <div></div>
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
    }
}
</script>