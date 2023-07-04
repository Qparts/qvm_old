import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialize, updateCurrentSocket } from 'src/redux/slices/authJwt';
import { io } from 'socket.io-client';
import {
  getContacts,
  getUnseenMessages,
  updateOnlineUsers,
  updateRecivedMessages,
  updateUnseenMessages
} from 'src/redux/slices/chat';
import chatService from 'src/services/chatService';

// ----------------------------------------------------------------------

JwtProvider.propTypes = {
  // children: PropTypes.node
};

function JwtProvider(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authJwt);
  const { userConversations, activeConversation } = useSelector(
    (state) => state.chat
  );
  const socket = useRef();
  const socketURL = process.env.REACT_APP_WS_HOST;

  useEffect(() => {
    socket.current = io(`${socketURL}`, {
      transports: ['websocket']
    });
    dispatch(updateCurrentSocket(socket));
  }, []);

  useEffect(() => {
    dispatch(getInitialize());
  }, [dispatch]);

  useEffect(() => {
    const markConversationAsSeen = async (conversationId) => {
      try {
        await chatService.markConversationAsSee(
          conversationId,
          user.subscriber.id
        );
      } catch (error) {
        console.error(error);
      }
    };

    if (user != null && user.subscriber != null) {
      socket.current.emit('addUser', user.subscriber.id);
      socket.current.on('getUsers', (users) => {
        dispatch(updateOnlineUsers(users));
        dispatch(getUnseenMessages(user.subscriber.id, userConversations));
      });

      //update conversation list in reciever side.
      socket.current.on('contactsUpdated', () => {
        dispatch(getContacts(user.subscriber.id));
      });

      //get all unseen messages for login user.
      socket.current.on('readMessage', () => {
        dispatch(getUnseenMessages(user.subscriber.id, userConversations));
      });

      //if user focus on the conversation of recieved message push the recieved message to message list.
      //if user is not the conversation of the arrival message update the unseen messages.
      socket.current.on('getMessage', (data) => {
        if (data && userConversations.length > 0) {
          if (data.createdAt == null)
            data.createdAt = Date.now();
          const path = window.location.pathname.split('/');
          if (path[path.length - 1] == data.conversationId) {
            if (data.status == 'I' || !data.status) {
              data.status = 'S';
              // markConversationAsSeen(data.conversationId);
            }
            dispatch(updateRecivedMessages(data));
          } else {
            dispatch(updateUnseenMessages(data));
          }
        }
      });
    } else {
      console.log('destroy app.');
      socket.current.emit('removeUser');
      socket.current.on('getUsers', (users) => {
        dispatch(updateOnlineUsers(users));
      });
    }
  }, [user]);

  return <>{props.children}</>;
}

export default JwtProvider;
