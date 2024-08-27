export const LOCATION_CANAL = 'location';
export const VITAL_SIGNS_CANAL = 'vital_signs';
class WebSocketService {
  constructor(endpoint, userId, fallbackFunction) {
    this.endpoint = `${process.env.REACT_APP_WEBSOCKET_URL}/${endpoint}?userId=${userId}`;
    this.socket = null;
    this.fallbackFunction = fallbackFunction;
    this.reconnectInterval = 50000; 
    this.connect();
  }
  connect(onMessageCallback) {
    this.socket = new WebSocket(this.endpoint);

    this.socket.onopen = () => {
      console.log(`WebSocket connection established for ${this.endpoint}`);
    };

    this.socket.onmessage = (event) => {
      try {
        console.log(`Message received from WebSocket: ${event.data}`);
        const data = JSON.parse(event.data);
        onMessageCallback(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.socket.onerror = (error) => {
      console.error(`WebSocket error for ${this.endpoint}:`, error);
      if (this.fallbackFunction) {
        this.fallbackFunction();
      }
    };

    this.socket.onclose = (event) => {
      console.log(`WebSocket connection closed for ${this.endpoint}`, event);
      if (this.fallbackFunction) {
        this.fallbackFunction();}
        setTimeout(() => this.connect(onMessageCallback), this.reconnectInterval); }; }
   close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
export default WebSocketService;
