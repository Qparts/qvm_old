import http from "./httpService";

function chatSearch(query) {
  // return http.get(`http://localhost:7000/users/search/${query}/${userId}`);
  return http.get(`http://localhost:7000/comapny/${query}`);
}


function getUserConversations(userId) {
  return http.get('http://localhost:7000/conversation/alt/' + userId);
}

function createUserConversation(conversation) {
  return http.post('http://localhost:7000/conversation/alt', conversation);
}

function getConversationDetails(userId) {
  return http.get('http://localhost:7000/users/' + userId);
}

function getCompanyUsers(companyId) {
  return http.get('http://localhost:7000/users/' + companyId);
}

function getConversationMessage(conversationKey) {
  return http.get('http://localhost:7000/messages/' + conversationKey);
}

function createMessage(message) {
  return http.post('http://localhost:7000/messages/', message);
}


export default {
  chatSearch,
  getUserConversations,
  getConversationDetails,
  getConversationMessage,
  createMessage,
  createUserConversation,
  getCompanyUsers
};
