<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
export default {
    components: {},
    data() {
        return {};
    },
    created() {
        const formData = new FormData();
        formData.append('username', '123');

        // this.$axios
        //     .post('http://client.trpforex.com/api/fund/graph?t=1631346508&month=3', formData)
        //     .then((res) => {})
        //     .catch((err) => {});
        // //stompjs http://172.16.1.164:17101/hqlive-im/im/websocket
        //let socket = new SockJS(`/im/hqlive-push/push/websocket/websocket`);
        //let socket = new WebSocket(`ws://dev.m.hqlive.com/im/hqlive-push/push/websocket/websocket`);
        // console.log(socket);
        // socket.onopen = function () {
        //     //当WebSocket创建成功时，触发onopen事件
        //     console.log('open');
        //     socket.send('hello'); //将消息发送到服务端
        // };
        // socket.onmessage = function (e) {
        //     //当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
        //     console.log(e.data);
        // };
        // socket.send()
        // let stompClient = Stomp.over(socket);
        // let client = stompClient;
        // console.log('===========', stompClient);
        // stompClient.connect(
        //     {},
        //     function (frame) {
        //         console.log(123123);
        //         client.subscribe(`/top/p`, (msg) => {
        //             console.log('===========');
        //             console.log(msg);
        //         });
        //     },
        //     function (frame) {
        //         console.log('====================');
        //         console.log(frame);
        //     }
        // );
    },
};
</script>
<style>
#app {
    overflow-x: auto;
    height: 100%;
    overflow-y: hidden;
    min-width: 1440px;
}
</style>
