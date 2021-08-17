import { Icon } from '@iconify/react';
import Scrollbars from 'src/components/Scrollbars';
import PopoverMenu from 'src/components/PopoverMenu';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useState, useEffect } from 'react';
import doneAllFill from '@iconify-icons/eva/done-all-fill';
import { useTranslation } from 'react-i18next';
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
import { Chart, Info, Mail, Orders, OrdersArrow, Parts } from '../../../../icons/icons';
import UnseenMessage from './UnseenMessage';

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
  const { t } = useTranslation();
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
        <Badge badgeContent={unseenMessages.length > 0 ? unseenMessages.length : null} color="error">
          <Mail width='24' height='24' fill='#7E8D99' fillArr='#F20505' />
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
            <Typography variant="subtitle1">{t("Messages")}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t("You have {{count}} unread messages",
                { count: unseenMessages.length })}
            </Typography>
          </Box>

          {unseenMessages.length > 0 && (
            <Tooltip title=" Mark all as read">
              <MIconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </MIconButton>
            </Tooltip>
          )}
        </Box>

        {unseenMessages.length > 0 &&
          <>
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
                      {t("New")}
                    </ListSubheader>
                  }
                >
                  {unseenMessages.map((message) => (
                    <UnseenMessage
                      key={message._id}
                      message={message}
                      setOpen={setOpen}
                    />
                  ))}
                </List>
              </Scrollbars>
            </Box>

            <Divider />

            <Box sx={{ p: 1 }}>
              <Button fullWidth disableRipple component={RouterLink} to="#">
                {t("View All")}
              </Button>
            </Box>
          </>}

      </PopoverMenu>
    </>
  );
}

export default Notifications;
