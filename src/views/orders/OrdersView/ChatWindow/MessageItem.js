import clsx from 'clsx';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import links from 'src/constants/links';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(3)
  },
  container: {
    display: 'flex',
    '&.styleMe': { marginLeft: 'auto' }
  },
  content: {
    maxWidth: 320,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.neutral,
    '&.styleMe': {
      color: theme.palette.grey[800],
      backgroundColor: theme.palette.primary.lighter
    }
  },
  info: {
    display: 'flex',
    marginBottom: theme.spacing(0.75),
    color: theme.palette.text.secondary,
    '&.styleMe': { justifyContent: 'flex-end' }
  }
}));

// ----------------------------------------------------------------------

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  // conversation: PropTypes.object.isRequired,
  className: PropTypes.string
};

const uploadUrl = links.upload;


function MessageItem({
  message,
  currentContact = [],
  className,
  ...other
}) {

  const classes = useStyles();
  const { user } = useSelector((state) => state.authJwt);
  const isMe = parseInt(message.sender) === user.subscriber.id;

  const friend = currentContact.filter(x => x.id == parseInt(message.sender))[0];


  return (
    <div className={clsx(classes.root, className)} {...other}>
      <div className={clsx(classes.container, isMe && 'styleMe')}>
        {friend && !isMe && (
          <Avatar
            alt={friend.name}
            src={uploadUrl.getCompanyLogo(`logo_${friend.companyId}.png`)}
            sx={{ width: 32, height: 32 }}
          />
        )}
        <Box sx={{ ml: 2 }}>
          <Typography
            noWrap
            variant="caption"
            className={clsx(classes.info, isMe && 'styleMe')}
          >
            {!isMe && `${friend?.name},`}&nbsp;
            {formatDistanceToNowStrict(new Date(message.createdAt), {
              addSuffix: true
            })}
          </Typography>

          <div className={clsx(classes.content, isMe && 'styleMe')}>
            <Typography variant="body2">{message.text}</Typography>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default MessageItem;
