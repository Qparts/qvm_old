import clsx from 'clsx';
import React from 'react';
import { last } from 'lodash';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import BadgeStatus from 'src/components/BadgeStatus';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  ListItem,
  ListItemText,
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5, 3),
    transition: theme.transitions.create('all'),
    borderBottom: '1px solid #ECF0F8',
  },
  listItemSelected: {
    backgroundColor: theme.palette.action.selected
  },
  lastActivity: {
    fontSize: 12,
    lineHeight: '22px',
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1.25),
    color: theme.palette.secondary.light
  }
}));

// ----------------------------------------------------------------------

const getDetails = (conversation, currentUserId) => {
  const otherParticipants = conversation.participants.filter(
    (participant) => participant.id !== currentUserId
  );
  const displayNames = otherParticipants
    .reduce((names, participant) => [...names, participant.name], [])
    .join(', ');
  let displayText = '';
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  if (lastMessage) {
    const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';
    const message =
      lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.body;
    displayText = `${sender}${message}`;
  }
  return { otherParticipants, displayNames, displayText };
};

ConversationItem.propTypes = {
  isSelected: PropTypes.bool,
  conversation: PropTypes.object.isRequired,
  isOpenSidebarConversation: PropTypes.bool,
  onSelectConversation: PropTypes.func,
  className: PropTypes.string
};

function ConversationItem({
  isSelected,
  conversation,
  onSelectConversation,
  isOpenSidebarConversation,
  className,
  ...other
}) {
  const classes = useStyles();
  const details = getDetails(
    conversation,
    '8864c717-587d-472a-929a-8e5f298024da-0',
  );

  const displayLastActivity = last(conversation.messages).createdAt;
  const isUnread = conversation.unreadCount > 0;

  return (
    <ListItem
      button
      disableGutters
      onClick={onSelectConversation}
      className={clsx(
        classes.root,
        { [classes.listItemSelected]: isSelected },
        className
      )}
      {...other}
    >

      {isOpenSidebarConversation && (
        <>
          <ListItemText
            primary={details.displayNames}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'body1',
              fontWeight: isUnread ? 600 : 500,
              color: isUnread ? (theme) => theme.palette.secondary.darker : (theme) => theme.palette.secondary.main
            }}
            secondary={details.displayText}
            secondaryTypographyProps={{
              noWrap: true,
              variant: isUnread ? 'subtitle2' : 'body2',
              color: isUnread ? (theme) => theme.palette.secondary.darker : (theme) => theme.palette.secondary.light,
              fontWeight: isUnread ? 600 : 500
            }}
          />

          <Box
            sx={{
              ml: 2,
              height: 44,
              display: 'flex',
              alignItems: 'flex-end',
              flexDirection: 'column'
            }}
          >
            <div className={classes.lastActivity}>
              {formatDistanceToNowStrict(new Date(displayLastActivity), {
                addSuffix: false
              })}
            </div>
            {isUnread && <BadgeStatus status="unread" size="small" />}
          </Box>
        </>
      )}
    </ListItem>
  );
}

export default ConversationItem;
