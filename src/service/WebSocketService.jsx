
class WebSocketService {
    constructor(endpoint, userId, fallbackFunction) {
      this.endpoint = `${process.env.REACT_APP_WEBSOCKET_URL}/${endpoint}?userId=${userId}`;
      this.socket = null;
      this.fallbackFunction = fallbackFunction;
    }
  
    connect(onMessageCallback) {
      this.socket = new WebSocket(this.endpoint);
  
      this.socket.onopen = () => {
        console.log(`WebSocket connection established for ${this.endpoint}`);
      };
  
      this.socket.onmessage = (event) => {
        console.log(`Message received from WebSocket: ${event.data}`);
        const data = JSON.parse(event.data);
        onMessageCallback(data);
      };  
  
      this.socket.onerror = (error) => {
        console.log(`WebSocket error for ${this.endpoint}:`, error);
        if (this.fallbackFunction) {
          this.fallbackFunction();
        }
      };
  
      this.socket.onclose = () => {
        console.log(`WebSocket connection closed for ${this.endpoint}`);
        if (this.fallbackFunction) {
          this.fallbackFunction();
        }
      };
    }
  
    close() {
      if (this.socket) {
        this.socket.close();
      }
    }
  }
  
  export default WebSocketService;
  