import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MyAvatar from 'src/components/MyAvatar';
import BadgeStatus from 'src/components/BadgeStatus';
import roundPowerSettingsNew from '@iconify-icons/ic/round-power-settings-new';
import { useTranslation } from 'react-i18next';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  List,
  Divider,
  Popover,
  Tooltip,
  ListItem,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import helper from 'src/utils/helper';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    padding: theme.spacing(1, 2.5)
  },
}));

// ----------------------------------------------------------------------

Account.propTypes = {
  className: PropTypes.string
};

function Account({ className }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.authJwt);
  const { themeDirection } = useSelector((state) => state.settings);
  const [open, setOpen] = useState(null);
  const [status, setStatus] = useState('online');

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Box sx={{ position: 'relative' }}>
        <MyAvatar
          onClick={handleOpen}
          sx={{ cursor: 'pointer', width: 48, height: 48 }}
        />
        <BadgeStatus
          status={status}
          sx={{ position: 'absolute', bottom: 2, right: 2 }}
        />
      </Box>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: themeDirection === 'rtl' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: themeDirection === 'rtl' ? 'right' : 'left' }}
      >
        <Box
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <MyAvatar />

          <Box sx={{ ml: 2, mr: 3 }}>
            <Typography noWrap variant="subtitle1">
              {themeDirection === 'ltr' ? user.company.name : user.company.nameAr}
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: 'text.secondary' }}>
              {user.subscriber.email}
            </Typography>
          </Box>

          <Tooltip title={t('Logout')}>
            <IconButton onClick={() => helper.handleLogout(logout, dispatch, isMountedRef, history, '/', enqueueSnackbar)}>
              <Icon icon={roundPowerSettingsNew} width={24} height={24} />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider />

        <List>
          <ListItem disableGutters className={classes.listItem}>
            <ListItemIcon>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <BadgeStatus status={status} />
              </Box>
            </ListItemIcon>
            <ListItemText>{t(status)}</ListItemText>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}

export default Account;
