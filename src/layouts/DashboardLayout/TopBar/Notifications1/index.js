import Scrollbars from 'src/components/Scrollbars';
import NotificationItem from './NotificationItem';
import PopoverMenu from 'src/components/PopoverMenu';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useState, useEffect } from 'react';
import {
  markAllAsRead,
  getNotifications
} from 'src/redux/slices/notifications';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  List,
  Badge,
  Button,
  Tooltip,
  Divider,
  Typography,
  ListSubheader
} from '@material-ui/core';
import { MIconButton } from 'src/theme';
import { Note } from '../../../../icons/icons';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  listSubheader: {
    ...theme.typography.overline,
    lineHeight: 'unset',
    textTransform: 'uppercase',
    padding: theme.spacing(1, 2.5)
  }
}));

// ----------------------------------------------------------------------

function Notifications() {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);
  const { unseenMessages } = useSelector((state) => state.chat);
  const totalUnRead = notifications.filter((item) => item.isUnRead === true)
    .length;

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={() => setOpen(true)}
        color={isOpen ? 'primary' : 'default'}
      >
        <Badge badgeContent={unseenMessages.length} color="error">
          <Note width='24' height='24' fill='#7E8D99' />
        </Badge>
      </MIconButton>

      <PopoverMenu
        width={360}
        open={isOpen}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <MIconButton color="primary" onClick={handleMarkAllAsRead}>
              </MIconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Box sx={{ height: { xs: 340, sm: 'auto' } }}>
          <Scrollbars>
            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  disableGutters
                  className={classes.listSubheader}
                >
                  New
                </ListSubheader>
              }
            >
              {notifications.slice(0, 2).map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </List>

            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  disableGutters
                  className={classes.listSubheader}
                >
                  Before that
                </ListSubheader>
              }
            >
              {notifications.slice(2, 5).map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </List>
          </Scrollbars>
        </Box>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple component={RouterLink} to="#">
            View All
          </Button>
        </Box>
      </PopoverMenu>
    </>
  );
}

export default Notifications;
