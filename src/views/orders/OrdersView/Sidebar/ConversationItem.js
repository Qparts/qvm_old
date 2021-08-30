import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BadgeStatus from 'src/components/BadgeStatus';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import links from 'src/constants/links';

// ----------------------------------------------------------------------

const AVATAR_SIZE = 48;
const AVATAR_SIZE_GROUP = 32;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5, 2),
    transition: theme.transitions.create('all'),
    borderBottom: '1px solid #ECF0F8',
    '&:last-of-type': { borderBottom: 0 },
    '&:hover': {
      backgroundColor: 'rgb(235 242 255 / 45%)'
    }
  },
  listItemSelected: {
    backgroundColor: 'rgb(235 242 255 / 60%)',
    '&:hover': {
      backgroundColor: 'rgb(235 242 255 / 60%)'
    }
  },
  avatar: {
    position: 'relative',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    '& .MuiAvatar-img': { borderRadius: '50%' },
    '& .MuiAvatar-root': { width: '100%', height: '100%' }
  },
  avatarGroup: {
    position: 'relative',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    '& $avatar': {
      position: 'absolute',
      width: AVATAR_SIZE_GROUP,
      height: AVATAR_SIZE_GROUP,
      '&:nth-child(1)': {
        zIndex: 9,
        left: 0,
        bottom: 2,
        '& .MuiAvatar-root': {
          border: `solid 2px ${theme.palette.background.paper}`
        }
      },
      '&:nth-child(2)': { top: 2, right: 0 }
    }
  },
  lastActivity: {
    fontSize: 12,
    lineHeight: '22px',
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1.25),
    color: theme.palette.text.disabled
  }
}));

// ----------------------------------------------------------------------

ConversationItem.propTypes = {
  isSelected: PropTypes.bool,
  conversation: PropTypes.object.isRequired,
  isOpenSidebarConversation: PropTypes.bool,
  onSelectConversation: PropTypes.func,
  className: PropTypes.string
};

const uploadUrl = links.upload;

function ConversationItem({
  isSelected,
  conversation,
  onSelectConversation,
  isOpenSidebarConversation,
  className,
  ...other
}) {
  const classes = useStyles();
  const { user } = useSelector((state) => state.authJwt);
  const { onlineUsers = [] } = useSelector((state) => state.chat);
  const { unseenMessages } = useSelector((state) => state.chat);
  const [friends, setFriends] = useState(conversation?.members?.filter(x => x.id != user.subscriber.id
    && x.companyId != user.company.companyId));

  const unseenMessagesCompanyId = unseenMessages.map(message => { return message.companyId });
  const unRead = unseenMessagesCompanyId.filter(mess => mess === friends[0]?.companyId).length > 0;

  const isGroup = friends.length > 1;

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


      <ListItemAvatar>
        <div className={clsx({ [classes.avatarGroup]: isGroup })}>

          <div className={classes.avatar} >
            <Avatar alt={friends[0]?.companyName} src={uploadUrl.getCompanyLogo(`logo_${friends[0]?.companyId}.png`)} />
            <BadgeStatus
              status={onlineUsers.findIndex(x => x.userId == friends[0]?.id) > -1 ? "online" : "away"}
              sx={{ right: 2, bottom: 2, position: 'absolute' }}
            />
          </div>

        </div>
      </ListItemAvatar>

      {isOpenSidebarConversation && friends && (
        <>
          <ListItemText
            primary={friends[0]?.companyName}
            primaryTypographyProps={{
              noWrap: true,
              variant: unRead ? 'body3' : 'subtitle2',
              color: (theme) => theme.palette.secondary.main,
              fontWeight: unRead ? 600 : 500
            }}
            secondary={friends.map((friend) => friend.name).join(" , ")}
            secondaryTypographyProps={{
              noWrap: true,
              variant: 'body2',
              color: (theme) => theme.palette.secondary.light,
              fontWeight: unRead ? 600 : 500
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
          </Box>
        </>
      )}
    </ListItem>
  );
}

export default ConversationItem;
