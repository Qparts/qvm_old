import { createSlice } from '@reduxjs/toolkit';
import chatService from 'src/services/chatService';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  activeConversationId: null,
  activeConversation: null,
  isOpenSidebarConversation: true,
  isOpenSidebarInfo: true,
  userConversations: [],
  messages: [],
  onlineUsers: [],
  currentContact: null
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET CONTACT SSUCCESS
    getUserConversationsSuccess(state, action) {
      state.userConversations = action.payload;
    },

    // GET CONVERSATION
    getConversationSuccess(state, action) {
      const conversation = action.payload;
      if (conversation) {
        state.activeConversationId = action.payload.conversationKey;
        state.messages = action.payload.messages;
      } else {
        state.activeConversationId = null;
      }
    },

    // ON SEND MESSAGE
    onSendMessage(state, action) {
      const conversation = action.payload;
      const {
        conversationId,
        messageId,
        message,
        contentType,
        attachments,
        createdAt,
        senderId
      } = conversation;

      const newMessage = {
        id: messageId,
        body: message,
        contentType: contentType,
        attachments: attachments,
        createdAt: createdAt,
        senderId: senderId
      };

      state.conversations.byId[conversationId].messages.push(newMessage);
    },

    setActiveConversation(state, action) {
      state.activeConversation = action.payload;
    },

    createMessageSuccess(state, action) {
      state.messages = action.payload;
    },

    updateRecivedMessages(state, action) {
      state.messages = [...state.messages, action.payload];
    },

    updateOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },

    // updateCurrentContactSuccess(state, action) {
    //   state.currentContact = action.payload;
    // },

    // RESET ACTIVE CONVERSATION
    resetActiveConversation(state) {
      state.activeConversationId = null;
    },

    addRecipient(state, action) {
      const recipients = action.payload;
      state.recipients = recipients;
    },

    // SIDEBAR
    onOpenSidebarConversation(state) {
      state.isOpenSidebarConversation = true;
    },

    onCloseSidebarConversation(state) {
      state.isOpenSidebarConversation = false;
    },

    onOpenSidebarInfo(state) {
      state.isOpenSidebarInfo = true;
    },

    onCloseSidebarInfo(state) {
      state.isOpenSidebarInfo = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  addRecipient,
  onSendMessage,
  onOpenSidebarInfo,
  onCloseSidebarInfo,
  resetActiveConversation,
  onOpenSidebarConversation,
  onCloseSidebarConversation,
  setActiveConversation,
  updateRecivedMessages,
  updateOnlineUsers,

} = slice.actions;

// ----------------------------------------------------------------------

export function getContacts(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const { data: userConversations } = await chatService.getUserConversations(userId);
      dispatch(slice.actions.getUserConversationsSuccess(userConversations));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

export function getConversation(conversationKey) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await chatService.getConversationMessage(conversationKey);
      // console.log("conversationKey slice" , conversationKey);
      dispatch(
        slice.actions.getConversationSuccess({ messages: response.data, conversationKey })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------


export function createNewMessage(value, messages) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await chatService.createMessage(value);
      const newMessages = [...messages, response.data];
      dispatch(
        slice.actions.createMessageSuccess(newMessages)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// export function updateCurrentContact(friendId) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     slice.actions.updateCurrentContactSuccess(null);
//     try {
//       const friendDetails = await chatService.getConversationDetails(friendId);
//       const currentFriend = friendDetails.data[0];
//       dispatch(
//         slice.actions.updateCurrentContactSuccess(currentFriend)
//       );
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }
