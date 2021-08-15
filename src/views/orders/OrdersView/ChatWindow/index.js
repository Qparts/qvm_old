import RoomInfo from './RoomInfo';
import MessageList from './MessageList';
import React, { useEffect } from 'react';
import { PATH_APP } from 'src/routes/paths';
import MessageInput from './MessageInput';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {
  addRecipient,
  getConversation,
  resetActiveConversation,
  createNewMessage
} from 'src/redux/slices/chat';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider } from '@material-ui/core';

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
  const {
    activeConversationId,
    messages,
    activeConversation
  } = useSelector((state) => state.chat);
  const conversation = useSelector((state) => conversationSelector(state));
  const { user, currentSocket } = useSelector((state) => state.authJwt);

  const mode = conversationKey ? 'DETAIL' : 'COMPOSE';


  useEffect(() => {
    const getDetails = async () => {
      try {
        await dispatch(getConversation(conversationKey));
      } catch (error) {
        console.error(error);
        history.push(PATH_APP.app.chat.new);
      }
    };
    if (conversationKey) {
      getDetails();
    } else {
      if (activeConversationId) {
        dispatch(resetActiveConversation());
      }
    }
  }, [conversationKey]);


  const handleAddRecipient = (recipient) => {
    dispatch(addRecipient(recipient));
  };

  const handleSendMessage = async (value) => {
    try {
      console.log("activeConversation", activeConversation);
      // const receiverId = activeConversation.members.find(x => parseInt(x) !== user.subscriber.id);

      activeConversation.members.filter(x => x.id != user.subscriber.id).map((member) => {
        currentSocket.current.emit("sendMessage", {
          senderId: user.subscriber.id,
          receiverId: member.id,
          text: value.text
        });
      })

      dispatch(createNewMessage(value, messages));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>

      <Divider />

      <div className={classes.main}>
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
          {/* <MessageList conversation={conversation} /> */}
          <MessageList />

          <Divider />

          <MessageInput
            conversationId={activeConversationId}
            onSend={handleSendMessage}
            disabled={pathname === '/app/chat/new'}
          />
        </Box>

        {mode === 'DETAIL' && (
          <RoomInfo
            conversation={conversation}
          />
        )}
      </div>
    </div>
  );
}

export default ChatWindow;