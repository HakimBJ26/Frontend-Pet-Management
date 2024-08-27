import { axiosPrivate } from '../common/configuration/ApiAuth';
import {
  GET_GROUPS_API,
  GET_GROUPS_BY_USER_API,
  GET_MESSAGES_API,
  SEND_MESSAGE_API,
} from '../common/configuration/constants/PathBack';

class ChatService {
  static async getGroups() {
    try {
      const response = await axiosPrivate.get(GET_GROUPS_API);
      return response.data;
    } catch (err) {
      console.error("Error getting groups:", err);
      throw err;
    }
  }

  static async getGroupsByUser(userId) {
    try {
      const response = await axiosPrivate.get(`${GET_GROUPS_BY_USER_API}/${userId}`);
      return response.data;
    } catch (err) {
      console.error("Error getting groups for user:", err);
      throw err;
    }
  }

  static async getMessages(groupChatId) {
    try {
      const response = await axiosPrivate.get(`${GET_MESSAGES_API}?groupChatId=${groupChatId}`);
      return response.data;
    } catch (err) {
      console.error("Error getting messages:", err);
      throw err;
    }
  }

  static async sendMessage(groupChatId, messageData) {
    try {
      const response = await axiosPrivate.post(SEND_MESSAGE_API, {
        groupChatId,
        ...messageData
      });
      return response.data;
    } catch (err) {
      console.error("Error sending message:", err);
      throw err;
    }
  }
}

export default ChatService;
