import links from "src/constants/links";
import http from "./httpService";

const subscriberUrl = links.subscriber;
const chatUrl = links.chat;


function chatSearch(query) {
  return http.get(subscriberUrl.getCompaniesByName(query));
}

function getCompanyUsers(companyId) {
  return http.get(subscriberUrl.getUsersByCompanyId(companyId));
}

function getUserConversations(userId) {
  return http.get(chatUrl.getUserConversations(userId));
}

function createUserConversation(conversation) {
  return http.post(chatUrl.postNewChat, conversation);
}


function getConversationMessage(conversationKey) {
  return http.get(chatUrl.getConversationMessages(conversationKey));
}

function createMessage(message) {
  return http.post(chatUrl.postNewMessage, message);
}


export default {
  chatSearch,
  getUserConversations,
  // getConversationDetails,
  getConversationMessage,
  createMessage,
  createUserConversation,
  getCompanyUsers
};