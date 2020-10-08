<template>
    <div>
        <div class="group-chatBox">
            <div class="header">Minh Nhựt</div>
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
                <textarea placeholder="Type your message here..." rows="2"></textarea>
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
            NoAvatar
        }
    }
}
</script>