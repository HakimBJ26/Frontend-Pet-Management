import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const socket = new SockJS('/ws');
const stompClient = Stomp.over(socket);

stompClient.connect({}, () => {
    stompClient.subscribe('/topic/sensordata', (data) => {
        // Handle received data
        const sensorData = JSON.parse(data.body);
        // Update state accordingly
    });
});
