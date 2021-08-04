import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  List,
  ListItem,
  Typography,
  Popover,
  Divider
} from '@material-ui/core';
import { fToNow } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    minHeight: 70,
    padding: theme.spacing((2 - 0.375), 3)
  },
  listItem: {
    padding: theme.spacing(1, 2.5)
  },
}));

// ----------------------------------------------------------------------

function OneAvatar({ participants }) {
  const participant = [...participants][0];

  if (participant === undefined) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="body3" sx={{ color: (theme) => theme.palette.secondary.main }}>{participant.name}</Typography>
        <Typography variant="body2" sx={{ color: (theme) => theme.palette.secondary.light }}>
          {participant.status !== 'offline'
            ? capitalCase(participant.status)
            : fToNow(participant.lastActivity)}
        </Typography>
      </Box>
      <Typography variant="subtitle2"> {participant.position} </Typography>
    </Box>
  );
}

function GroupAvatar({ participants }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <div>
      <Box onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {participants.length} persons
          <Icon icon={arrowIosForwardFill} />
        </Box>
        <Typography variant="body2" sx={{ color: (theme) => theme.palette.secondary.light }}>
          {t("tap for more info")}
        </Typography>
      </Box>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        classes={{ paper: classes.popover }}
      >
        <Typography noWrap variant="subtitle1" sx={{padding: (theme) => theme.spacing(1, 2)}}> {t("users in group")} </Typography>
        <Divider />
        <List>
          {participants.map((part, index) => {
            return <ListItem key={index} disableGutters className={classes.listItem}>
              {part.name}
            </ListItem>
          })}
        </List>

      </Popover>

      {/* <Link
        variant="body2"
        underline="none"
        component="button"
        color="text.secondary"
        onClick={() => { }}
      >
        <Box sx={{ display: 'flex' }}>
          {participants.map((part, index) => {
            return <Typography key={index} variant="body2" className={classes.groupUsers}>
              {part.name}
            </Typography>
          })}
        </Box>
      </Link> */}
    </div>
  );
}

HeaderDetail.propTypes = {
  className: PropTypes.string,
  participants: PropTypes.array
};

function HeaderDetail({ participants, className, ...other }) {
  const classes = useStyles();
  const isGroup = participants.length > 1;

  return (
    <div className={clsx(classes.root, className)} {...other}>
      {isGroup ? (
        <GroupAvatar participants={participants} />
      ) : (
        <OneAvatar participants={participants} />
      )}
    </div>
  );
}

export default HeaderDetail;
