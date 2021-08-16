import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialize, updateCurrentSocket } from 'src/redux/slices/authJwt';
import { io } from "socket.io-client"
import { getContacts, getUnseenMessages, updateOnlineUsers, updateRecivedMessages, updateUnseenMessages } from 'src/redux/slices/chat';
import chatService from 'src/services/chatService';

// ----------------------------------------------------------------------

JwtProvider.propTypes = {
  // children: PropTypes.node
};

function JwtProvider(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authJwt);
  const { userConversations, activeConversation } = useSelector((state) => state.chat);
  const socket = useRef();


  useEffect(() => {
    socket.current = io(`ws://qtest.fareed9.com:8900`, {
      transports: ["websocket", "polling"]
    });
    dispatch(updateCurrentSocket(socket));
  }, []);


  useEffect(() => {
    dispatch(getInitialize());
  }, [dispatch]);


  useEffect(() => {

    const markConversationAsSeen = async (conversationId) => {
      try {
        await chatService.markConversationAsSee(conversationId, user.subscriber.id);
      } catch (error) {
        console.error(error);
      }
    };


    if (user != null && user.subscriber != null) {
      socket.current.emit("addUser", user.subscriber.id);
      socket.current.on("getUsers", users => {
        dispatch(updateOnlineUsers(users));
        dispatch(getUnseenMessages(user.subscriber.id, userConversations));
      });

      //update conversation list in reciever side.
      socket.current.on("contactsUpdated", () => {
        dispatch(getContacts(user.subscriber.id))
      });

      //get all unseen messages for login user. 
      socket.current.on("readMessage", () => {
        dispatch(getUnseenMessages(user.subscriber.id, userConversations));
      });


      //if user focus on the conversation of recieved message push the recieved message to message list.
      //if user is not the conversation of the arrival message update the unseen messages.
      socket.current.on("getMessage", data => {
        if (data && data.createdAt == null && userConversations.length > 0) {
          data.createdAt = Date.now();
          const path = window.location.pathname.split("/");
          if (path[path.length - 1] == data.conversationId) {
            data.status = 'S';
            dispatch(updateRecivedMessages(data));
            markConversationAsSeen(data.conversationId);
          } else {
            // dispatch(getUnseenMessages(user.subscriber.id, userConversations));
            dispatch(updateUnseenMessages(data));
          }

        }
      });

    }
    else {
      console.log("destroy app.");
      socket.current.emit("removeUser");
      socket.current.on("getUsers", users => {
        dispatch(updateOnlineUsers(users));
      });
    }

  }, [user]);

  return <>{props.children}</>;
}

export default JwtProvider;
