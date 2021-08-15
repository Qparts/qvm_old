import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout, verify, forgotPassword, validateResetToken, resetPassword } from 'src/redux/slices/authJwt';

// ----------------------------------------------------------------------

useAuth.propTypes = {
  method: PropTypes.oneOf(['jwt', 'firebase'])
};

export default function useChat() {

  const { activeConversationId, activeConversation, userConversations,
    unseenMessages, messages, onlineUsers } = useSelector(
      (state) => state.chat
    );

  return {
    activeConversationId: activeConversationId,
    activeConversation: activeConversation,
    userConversations: userConversations,
    unseenMessages: unseenMessages,
    messages: messages,
    onlineUsers: onlineUsers
  };
}
