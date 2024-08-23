import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate=useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
    //
  };

  const handleDeleteChats= async () =>{
    try {
      toast.loading("Clearing conversation",{id:"deletechats"});
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Conversation cleared",{id:"deletechats"});
    } catch (error) {
      console.log(error);
      toast.error("Cannot clear conversation",{id:"deletechats"});
    }
  }

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading conversations", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded conversations", {
            id: "loadchats",
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading failed", { id: "loadchats" });
        });
    }
  }, [auth]);
  useEffect(()=>{
    if(!auth?.user){
      return navigate("/login");
    }
  },[auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "#3f3f46",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 500,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography
            sx={{ mx: "auto", fontFamily: "work sans", p: 3, fontSize: "15px" }}
          >
            You're having conversation with Mr. Penguin
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              my: 3,
              p: 2,
              fontSize: "15px",
            }}
          >
            Mr. Penguin can answer all your queries
          </Typography>
          <Button
          onClick={handleDeleteChats}
            sx={{
              
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: 450,
              fontSize: "12px",
              borderRadius: 3,
              mx: "auto",
              bgcolor: "#f87171",
              ":hover": {
                bgcolor: "#ef4444",
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1, flexDirection: "column", px: 3 },
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "25px",
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Gemini
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            padding:'20px',
            borderRadius: 8,
            backgroundColor: "#52525b",
            display: "flex",
            marginRight: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white" }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
