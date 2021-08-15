import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ConversationItem from './ConversationItem';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import helper from 'src/utils/helper';

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
  const { activeConversation } = useSelector((state) => state.chat);

  return (
    <List disablePadding className={clsx(classes.root, className)} {...other}>
      {userConversations.length > 0 &&
        userConversations.map((item) => (
          < ConversationItem
            key={item._id}
            isOpenSidebarConversation={isOpenSidebarConversation}
            conversation={item}
            isSelected={activeConversationId === item._id && activeConversation}
            onSelectConversation={() => helper.handleSelectConversation(item, dispatch, history, `/app/chat/${item._id}`)}
          />
        ))
      }
    </List>
  );
}

export default ConversationList;
