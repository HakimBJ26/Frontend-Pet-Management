import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const socket = new SockJS('/ws');
const stompClient = Stomp.over(socket);

stompClient.connect({}, () => {
    stompClient.subscribe('/topic/sensordata', (data) => {
        const sensorData = JSON.parse(data.body);
    });
});
