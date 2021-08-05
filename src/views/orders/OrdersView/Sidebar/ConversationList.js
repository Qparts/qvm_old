import clsx from 'clsx';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ConversationItem from './ConversationItem';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveConversation, updateCurrentContact } from 'src/redux/slices/chat';

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

  const { user } = useSelector((state) => state.authJwt);
  const { activeConversation } = useSelector((state) => state.chat);


  const handleSelectConversation = (item) => {
    // const friendId = item.members.find(x => parseInt(x) !== user.subscriber.id);
    // dispatch(updateCurrentContact(friendId));
    console.log("item" , item);
    dispatch(setActiveConversation(item));
    console.log("activeConversationId" , activeConversationId);
    console.log("activeConversation" , activeConversation);
    history.push(`/app/chat/${item._id}`);
  };

  return (
    <List disablePadding className={clsx(classes.root, className)} {...other}>
      {userConversations.length > 0 &&
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
