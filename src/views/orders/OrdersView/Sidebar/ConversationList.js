import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ConversationItem from './ConversationItem';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveConversation } from 'src/redux/slices/chat';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  root: {}
}));

// ----------------------------------------------------------------------

ConversationList.propTypes = {
  conversations: PropTypes.object,
  isOpenSidebarConversation: PropTypes.bool,
  activeConversationId: PropTypes.string,
  className: PropTypes.string
};

function ConversationList({
  conversations,
  isOpenSidebarConversation,
  activeConversationId,
  className,
  userConversations,
  ...other
}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, currentSocket } = useSelector((state) => state.authJwt);
  const { activeConversation, onlineUsers } = useSelector((state) => state.chat);


  const handleSelectConversation = async (item) => {
    //update the unseen message list of online users that belong to the login user company. 
    item.members.filter(x => x.id != user.subscriber.id &&
      x.companyId == user.subscriber.companyId).map((member) => {
        let onlineUserIndex = onlineUsers.findIndex(x => x.userId == member.id);
        if (onlineUserIndex != -1) {
          currentSocket.current.emit("companyMemberReadMessage", member.id);
        }
      })

    dispatch(setActiveConversation(item));
    history.push(`/app/chat/${item._id}`);
  };

  return (
    <List disablePadding className={clsx(classes.root, className)} {...other}>
      {
        userConversations.map((item) => (
          < ConversationItem
            key={item._id}
            isOpenSidebarConversation={isOpenSidebarConversation}
            conversation={item}
            isSelected={activeConversationId === item._id && activeConversation}
            onSelectConversation={() => handleSelectConversation(item)}
          />
        ))
      }
    </List>
  );
}

export default ConversationList;
