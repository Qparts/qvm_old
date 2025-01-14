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
  unseenMessages: [],
  messages: [],
  onlineUsers: [],
  conversationsCompanies: []
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
      state.isLoading = false;
    },

    //MESSAGE WITH I STATUS.
    getUnseenMessagesSuccess(state, action) {
      state.unseenMessages = action.payload;
      state.isLoading = false;
    },

    // GET MESSAGES OF SELECTED  CONVERSATION.
    getConversationSuccess(state, action) {
      const conversation = action.payload;
      if (conversation) {
        state.activeConversationId = action.payload.conversationKey;
        state.messages = action.payload.messages;
      } else {
        state.activeConversationId = null;
      }
      state.isLoading = false;
    },

    //SET ACTIVE CONVERSATION AND ACTIVE CONVERSATION KEY
    setActiveConversation(state, action) {
      const conversation = action.payload;
      state.activeConversation = conversation;
      state.activeConversationId = conversation?._id;
      state.isLoading = false;
    },

    //CREATE NEW MESSAGE SUCCESS
    createMessageSuccess(state, action) {
      state.messages = action.payload;
      state.isLoading = false;
    },

    //APPAND ARRIVAL MESSAGE TO MESSAGE LIST IF ACTOIVE CONVERSATION ID
    // EQUALS ARRIVALE MESSAGE CONVERSATION ID.
    updateRecivedMessages(state, action) {
      state.messages = [...state.messages, action.payload];
      state.isLoading = false;
    },

    //UPDATE ORDERR IN THE RECIVER SIDE.
    updateRecivedOrderMessages(state, action) {
      let updatedOrder = action.payload;
      let newMessages = [...state.messages];
      let orderIndex = newMessages.findIndex((x) => x._id == updatedOrder._id);
      if (orderIndex != -1)
        newMessages[orderIndex] = updatedOrder;
      state.messages = newMessages;
      state.isLoading = false;
    },

    //UDATE ONLINE USERS.
    updateOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
      state.isLoading = false;
    },

    updateUnseenMessages(state, action) {
      state.unseenMessages = [...state.unseenMessages, action.payload];
      state.isLoading = false;
    },

    updateMessages(state, action) {
      state.messages = action.payload;
      state.isLoading = false;
    },

    //UPDATE ACTIVE CONVERSATION ID.
    setActiveConversationId(state, action) {
      state.activeConversationId = action.payload;
      state.isLoading = false;
    },

    setConversationsCompanies(state, action) {
      state.conversationsCompanies = action.payload;
      state.isLoading = false;
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
  onOpenSidebarInfo,
  onCloseSidebarInfo,
  updateUnseenMessages,
  setActiveConversationId,
  onOpenSidebarConversation,
  onCloseSidebarConversation,
  setActiveConversation,
  updateRecivedMessages,
  updateRecivedOrderMessages,
  updateOnlineUsers,
  updateMessages
} = slice.actions;

// ----------------------------------------------------------------------

//GET ALL CONVERSATION OF LOGIN USER.
export function getContacts(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const {
        data: userConversations
      } = await chatService.getUserConversations();

      var conversationsCompanies = getAllConversationsCompanies(userConversations);

      dispatch(slice.actions.getUserConversationsSuccess(userConversations));
      dispatch(slice.actions.setConversationsCompanies(conversationsCompanies));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

const getAllConversationsCompanies = (userConversations) => {
  let userConversationsCompanies = new Set();
  const currentCompanyId = JSON.parse(localStorage.getItem('loginObject')).company.id;
  userConversations.forEach(element => {
    element.members.forEach(member => {
      if (member.companyId != currentCompanyId) {
        userConversationsCompanies.add(JSON.stringify({
          companyId: member.companyId,
          companyName: member.companyName,
          companyNameAr: member.companyNameAr
        }))
      }
    })
  });

  return Array.from(userConversationsCompanies);
}

//GET UNSEEN MESSAGES OF LOGIN USER (FOR ALL USER'S CONVERSATIONS)
export function getUnseenMessages(sender, userConversations) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      var conversations = userConversations.map((item) => {
        return item._id;
      });
      const { data: unseenMessages } = await chatService.getUnseenMessages({
        sender: sender,
        conversations: conversations
      });
      dispatch(slice.actions.getUnseenMessagesSuccess(unseenMessages));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

//GET MESSAGES OF SPECIFIC CONVERSATION.
export function getConversation(conversationKey, page) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await chatService.getConversationMessage(
        conversationKey,
        page
      );
      dispatch(
        slice.actions.getConversationSuccess({
          messages: response.data,
          conversationKey
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

//CREATE NEW MESSAGE.
export function createNewMessage(value, messages) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await chatService.createMessage(value);
      const newMessages = [...messages, response.data];
      dispatch(slice.actions.createMessageSuccess(newMessages));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


//UPDATE ORDER MESSAGE.
export function updateOrderMessage(orderValue) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await chatService.updateMessage(orderValue);
      dispatch(slice.actions.updateRecivedOrderMessages(orderValue));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

//GET CONVERSATION MEMBERS BY ADDING LOGIN USER TO COMPANY SUBSCRIBERS.
export const getCompanyUsers = async (companyId, user) => {
  try {
    let { data: companyUsers = [] } = await chatService.getCompanyUsers(
      companyId
    );
    let users = [];
    for (let companyUser of companyUsers) {
      users.push({
        id: companyUser.id,
        companyId: companyUser.company.id,
        name: companyUser.name,
        companyName: companyUser.company.name,
        companyNameAr: companyUser.company.nameAr
      });
    }

    for (let subscriber of user.company.subscribers) {
      users.push({
        id: subscriber.id,
        companyId: subscriber.companyId,
        name: subscriber.name,
        companyName: user.company.name,
        companyNameAr: user.company.nameAr
      });
    }

    return users;
  } catch (error) {
    console.log('error', error);
  }
};

//CHECK IF THE SELECTED CONVERSATION ALREAY EXIST IN THE CURRENT CONVERSATION OF THR LOGIN USER.
export const getSelectedConversation = (userConversations, companyId) => {
  for (let conversation of userConversations) {
    if (conversation.members.findIndex((x) => x.companyId == companyId) != -1) {
      return conversation;
    }
  }
};
