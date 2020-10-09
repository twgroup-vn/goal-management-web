<template>
    <div>
        <div :class="rightInfo == false ? 'group-chatBox' : 'group-chatBox active'">
            <div class="header">
                <div>Minh Nhựt</div>
                <div class="collapse-option">
                    <a @click="collapse">
                        <font-awesome-icon :icon="['fas', 'arrow-circle-right']" :class="{ show : rightInfo == false}"/>
                        <font-awesome-icon :icon="['fas', 'arrow-circle-left']" :class="{ show : rightInfo == true}"/>
                    </a>
                </div>
            </div>
            <div class="content">
                <div class="group-chat friend-chat">
                    <div class="mr-3">
                        <div class="avatar" :style="{ backgroundImage: `url(${NoAvatar})` }"></div>
                        <div class="time">10.35AM</div>
                    </div>
                    <div class="chat">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at dignissim orci. Suspendisse euismod, odio nec bibendum ornare, nibh purus bibendum quam, eu varius mi lectus eu elit.</div>
                </div>
                <div class="group-chat own-chat">
                    <div class="chat">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at dignissim orci. Suspendisse euismod, odio nec bibendum ornare, nibh purus bibendum quam, eu varius mi lectus eu elit.</div>
                    <div class="time ml-3">10.35AM</div>
                </div>
            </div>
            <div class="footer">
                <textarea placeholder="Nhập tin nhắn văn bản" rows="2"></textarea>
                <a class="btn btn-sendMail" @click="sendMail">
                    <font-awesome-icon :icon="['fas', 'paper-plane']" />
                </a>
            </div>
        </div>
        <div :class="rightInfo == false ? 'group-infoBox' : 'group-infoBox active'">
            <div class="avatar" :style="{ backgroundImage: `url(${NoAvatar})` }"></div>
            <div class="email">nguyennt@twgroup.vn</div>
            <div class="number">0941203233</div>
            <div class="department">
                <div class="mb-2">IT Department</div>
                <div>Front end designer</div>
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
            NoAvatar,
            rightInfo: true
        }
    },
    methods:{
        collapse(){
            var _this = this;
            _this.rightInfo = ! _this.rightInfo;
        },
        sendMail(val){
            console.log(val)
        }
    }
}
</script>