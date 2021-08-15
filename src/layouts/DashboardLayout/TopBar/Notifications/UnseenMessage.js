import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { Icon } from '@iconify/react';
import { formatDistanceToNow } from 'date-fns';
import clockFill from '@iconify-icons/eva/clock-fill';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Avatar,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import links from 'src/constants/links';
import chatService from 'src/services/chatService';
import { useHistory } from 'react-router-dom';
import { getUnseenMessages } from 'src/redux/slices/chat';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5, 2.5),
    '&:not(:last-child)': {
      marginBottom: 1
    }
  },
  isUnRead: {
    backgroundColor: theme.palette.action.selected
  }
}));

// ----------------------------------------------------------------------

function getTitle(message, friend, t) {
  const title = (
    <Typography variant="subtitle2">
      {friend.companyName}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: 'text.secondary' }}
      >
        &nbsp; {noCase(message.contentType == 'text' ? message.text : t("Order is Pending"))}
      </Typography>
    </Typography>
  );

  return title;
}

UnseenMessage.propTypes = {
  message: PropTypes.object.isRequired,
  className: PropTypes.string
};

const uploadUrl = links.upload;


function UnseenMessage({ message, className }) {
  const classes = useStyles();
  const { userConversations, onlineUsers } = useSelector((state) => state.chat);
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, currentSocket } = useSelector((state) => state.authJwt);
  const friend = userConversations.filter(c => c._id == message.conversationId)[0].members.
    filter(x => x.id == parseInt(message.sender))[0];
  const avatar = <Avatar alt={friend.companyName}
    src={uploadUrl.getCompanyLogo(`logo_${friend.companyId}.png`)} />;
  const title = getTitle(message, friend, t);


  const viewUnSeenConversation = async () => {
    try {
      await chatService.markConversationAsSee(message.conversationId, user.subscriber.id);

      userConversations.filter(c => c._id == message.conversationId)[0].members.filter(x => x.id != user.subscriber.id &&
        x.companyId == user.subscriber.companyId).map((member) => {
          let onlineUserIndex = onlineUsers.findIndex(x => x.userId == member.id);
          if (onlineUserIndex != -1) {
            currentSocket.current.emit("companyMemberReadMessage", member.id);
          }
        })

      dispatch(getUnseenMessages(user.subscriber.id, userConversations));
      history.push(`/app/chat/${message.conversationId}`);
    } catch (error) {
      console.log("error", error);
      history.push(`/app/chat/new`);
    }

  }

  return (
    <ListItem
      button
      to="#"
      disableGutters
      key={message._id}
      component={RouterLink}
      className={clsx(
        classes.root,
        {
          [classes.isUnRead]: true
        },
        className
      )}

      onClick={viewUnSeenConversation}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box
              component={Icon}
              icon={clockFill}
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {formatDistanceToNow(new Date(message.createdAt))}
          </Typography>
        }
      />
    </ListItem>
  );
}

export default UnseenMessage;
