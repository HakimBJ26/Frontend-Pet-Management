import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  Avatar,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SendIcon from "@mui/icons-material/Send";
import ChatService from "../../service/ChatService";
import UserService from "../../service/UserService";
import useToast from "../../hooks/useToast";
import {
  ERROR_QUIT_GROUP_CHAT_CREATED_TOAST,
  SUCCESS_QUIT_GROUP_CHAT_CREATED_TOAST,
} from "../../common/configuration/constants/ToastConfig";
import WebSocketService from "../../service/WebSocketService";
import '../../styles/GroupChat.css'

function GroupChat() {
  const location = useLocation();
  const navigate = useNavigate();
  const { groupId, groupName } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = localStorage.getItem("id");
  const messagesEndRef = useRef(null);
  const [userImageUrl, setImageUrl] = useState("");
  const userName = localStorage.getItem("name");
  const [openQuitModal, setOpenQuitModal] = useState(false);
  const { showToast } = useToast();

  const webSocketServiceRef = useRef(null);

  const fetchUserImg = async () => {
    try {
      const res = await UserService.getUserImage(userId);
      setImageUrl(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesResponse = await ChatService.getMessages(groupId);
        setMessages(messagesResponse);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    fetchUserImg();

    const webSocketService = new WebSocketService(
      `chat?groupId=${groupId}`,
      userId,
      () => fetchMessages()
    );

    webSocketService.connect((data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    webSocketServiceRef.current = webSocketService;

    return () => {
      if (webSocketServiceRef.current) {
        webSocketServiceRef.current.close();
        webSocketServiceRef.current = null;
      }
    };
  }, [groupId, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageObj = {
        groupId: parseInt(groupId),
        senderId: parseInt(userId),
        text: newMessage,
        photoUrl: userImageUrl,
        timestamp: new Date().toISOString(),
        edited: false,
        senderName: userName,
      };

      try {
        await ChatService.sendMessage(messageObj);
        setNewMessage("");
        const updatedMessages = await ChatService.getMessages(groupId);
        setMessages(updatedMessages);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleBackClick = () => {
    if (webSocketServiceRef.current) {
      webSocketServiceRef.current.shouldReconnect = false; 
      webSocketServiceRef.current.close();
      webSocketServiceRef.current = null;
    }
    navigate(-1);
  };

  const handleQuitGroupClick = () => {
    setOpenQuitModal(true);
  };

  const handleConfirmQuit = async () => {

    
    try {
      await ChatService.quitGroupChat(userId, groupId);
      showToast(SUCCESS_QUIT_GROUP_CHAT_CREATED_TOAST);
      if (webSocketServiceRef.current) {
        webSocketServiceRef.current.shouldReconnect = false; 
        webSocketServiceRef.current.close();
        webSocketServiceRef.current = null;
      }
      navigate(-1);
    } catch (error) {
      console.error("Error quitting group:", error);
      showToast(ERROR_QUIT_GROUP_CHAT_CREATED_TOAST);
    }
    setOpenQuitModal(false);
  };

  const handleCloseQuitModal = () => {
    setOpenQuitModal(false);
  };

  return (
    <Container sx={{ position: "relative", height: "100vh", maxWidth: "md", padding: 0 }}>
      {/* Header */}
      <Box
       className="groupChatHeader"
       sx={{backgroundColor: "background.paper"}}
      >
        <IconButton onClick={handleBackClick} color="primary" sx={{ width: 40, height: 40 }}>
          <ArrowCircleLeftIcon fontSize="large" />
        </IconButton>
        <Typography variant="h5" gutterBottom sx={{ flexGrow: 1, textAlign: 'center' }}>
          Group Chat - {groupId} - {groupName}
        </Typography>
        <IconButton onClick={handleQuitGroupClick} color="secondary" sx={{ width: 40, height: 40 }}>
          <ExitToAppIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Messages Box */}
      <Box  className="groupChatMessagesBox"
            sx={{backgroundColor: "background.paper"}}
      >
        {messages.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No messages yet.
          </Typography>
        ) : (
          messages.map((message) => (
            <Box
              key={message.timestamp}
              sx={{
                display: "flex",
                justifyContent: message.senderId === parseInt(userId) ? "flex-end" : "flex-start",
                my: 2,
              }}
            >
              <Paper
                sx={{
                  padding: 1,
                  maxWidth: "60%",
                  backgroundColor: message.senderId === parseInt(userId) ? "#e1ffc7" : "#f1f1f1",
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  {message.senderId === parseInt(userId) ? "You" : message.senderName}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  {message.photoUrl && (
                    <Avatar src={message.photoUrl} sx={{ width: 30, height: 30, mr: 1 }} />
                  )}
                  <Typography variant="body2">{message.text}</Typography>
                </Box>
                {message.edited && (
                  <Typography variant="caption" color="textSecondary" sx={{ fontStyle: "italic" }}>
                    Edited
                  </Typography>
                )}
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          ))
        )}
        {/* Ref to scroll to */}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input and Send Button */}
      <Box className="groupChatInputContainer"
           sx={{backgroundColor: "background.paper"}}

      >
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          sx={{ mr: 1 }}
        />
        <IconButton onClick={handleSendMessage} color="primary">
          <SendIcon />
        </IconButton>
      </Box>

      {/* Quit Confirmation Dialog */}
      <Dialog open={openQuitModal} onClose={handleCloseQuitModal}>
        <DialogTitle>Confirm Quit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to quit the group chat? You will not be able to send or receive messages.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQuitModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmQuit} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default GroupChat;
