import { axiosPrivate } from '../common/configuration/ApiAuth';
import {
  CREATE_GROUP_CHAT_API,
  GET_GROUPS_API,
  GET_GROUPS_BY_USER_API,
  GET_MESSAGES_API,
  SEND_MESSAGE_API,
  JOIN_GROUP_CHAT_API,
  QUIT_GROUP_CHAT_API
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
      const response = await axiosPrivate.get(`${GET_MESSAGES_API}/${groupChatId}`);
      return response.data;
    } catch (err) {
      console.error("Error getting messages:", err);
      throw err;
    }
  }

  static async sendMessage(messageData) {
    try {
      const response = await axiosPrivate.post(SEND_MESSAGE_API, messageData);
      return response.data;
    } catch (err) {
      console.error("Error sending message:", err);
      throw err;
    }
  }

  static async createGroupChat(groupData) {
    try {
      const response = await axiosPrivate.post(CREATE_GROUP_CHAT_API, groupData);
      return response.data;
    } catch (err) {
      console.error("Error creating group chat:", err);
      throw err;
    }
  }

  static async joinGroupChat(userId, groupId) {
    try {
      const response = await axiosPrivate.post(`${JOIN_GROUP_CHAT_API}/${userId}/${groupId}`);
      return response.data;
    } catch (err) {
      console.error("Error joining group chat:", err);
      throw err;
    }
  }

  static async quitGroupChat(userId, groupId) {
    try {
      const response = await axiosPrivate.post(`${QUIT_GROUP_CHAT_API}/${userId}/${groupId}`);
      return response.data;
    } catch (err) {
      console.error("Error quitting group chat:", err);
      throw err;
    }
  }
}

export default ChatService;
