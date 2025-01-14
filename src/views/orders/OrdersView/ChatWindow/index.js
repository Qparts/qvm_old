import MessageList from './MessageList';
import HeaderDetail from './HeaderDetail';
import React, { useEffect, useRef } from 'react';
import { PATH_APP } from 'src/routes/paths';
import MessageInput from './MessageInput';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {
  getConversation,
  createNewMessage,
  setActiveConversation,
  getUnseenMessages
} from 'src/redux/slices/chat';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider } from '@material-ui/core';
import { setActiveConversationId } from '../../../../redux/slices/chat';
import chatService from 'src/services/chatService';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    overflow: 'hidden'
  }
}));

// ----------------------------------------------------------------------

const conversationSelector = (state) => {
  const { conversations, activeConversationId } = state.chat;
  const conversation = conversations?.byId[activeConversationId];
  if (conversation) {
    return conversation;
  }
  return {
    id: null,
    messages: [],
    // participants: [],
    unreadMessages: 0
  };
};

function ChatWindow(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const { conversationKey } = useParams();
  const messageListRef = useRef();
  const {
    activeConversationId,
    messages,
    activeConversation,
    onlineUsers
  } = useSelector((state) => state.chat);
  const conversation = useSelector((state) => conversationSelector(state));
  const { user, currentSocket } = useSelector((state) => state.authJwt);
  const currentContact = activeConversation?.members?.filter(x => x.id != user.subscriber.id);
  const mode = conversationKey ? 'DETAIL' : 'COMPOSE';


  useEffect(() => {
    //get messages of the current conversation.
    const getDetails = async () => {
      try {
        if (activeConversation == null) {
          let newActiveConversation = props.userConversations.filter(x => x._id == conversationKey)[0];
          dispatch(setActiveConversation(newActiveConversation));
          dispatch(setActiveConversationId(conversationKey));
        }
        //update the status of selected conversation's messages to be S.
        await chatService.markConversationAsSee(conversationKey, user.subscriber.id);
        dispatch(getUnseenMessages(user.subscriber.id, props.userConversations));
        await dispatch(getConversation(conversationKey, 1));
      } catch (error) {
        console.error(error);
        history.push(PATH_APP.general.chat.new);
      }
    };
    if (conversationKey) {
      getDetails();
    }
  }, [conversationKey]);



  //create new message and emit it to other conversation 's members.
  const handleSendMessage = async (value) => {
    try {
      dispatch(createNewMessage(value, messages));
      messageListRef.current.scrollDown();
      activeConversation.members.filter(x => x.id != user.subscriber.id).map((member) => {
        let onlineUserIndex = onlineUsers.findIndex(x => x.userId == member.id);
        if (onlineUserIndex != -1) {
          currentSocket.current.emit("sendMessage", {
            senderId: user.subscriber.id,
            receiverId: member.id,
            text: value.text,
            companyId: user.company.companyId,
            conversationId: activeConversation._id
          });
        }
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      {mode === 'DETAIL' ? <HeaderDetail participants={currentContact} /> : null}
      <div className={classes.main}>
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
          <MessageList ref={messageListRef} />
          <Divider />
          <MessageInput
            conversationId={activeConversationId}
            onSend={handleSendMessage}
            disabled={pathname === '/app/chat/new'}
          />
        </Box>
      </div>
    </div>
  );
}

export default ChatWindow;
