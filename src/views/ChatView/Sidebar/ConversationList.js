import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import helper from 'src/utils/helper';
import ConversationItem from './ConversationItem';

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
  ...other
}) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <List disablePadding className={clsx(classes.root, className)} {...other}>
      {conversations.allIds.map((conversationId) => (
        <ConversationItem
          key={conversationId}
          isOpenSidebarConversation={isOpenSidebarConversation}
          conversation={conversations.byId[conversationId]}
          isSelected={activeConversationId === conversationId}
          onSelectConversation={() => helper.handleSelectConversation(conversationId, conversations, history)}
        />
      ))}
    </List>
  );
}

export default ConversationList;
