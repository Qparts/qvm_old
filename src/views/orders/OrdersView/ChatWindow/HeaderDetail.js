import clsx from 'clsx';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Avatar,
  Typography,
  Popover,
  List,
  ListItem,
  Divider
} from '@material-ui/core';
import links from 'src/constants/links';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ebf2ff',
    flexShrink: 0,
    minHeight: 64,
    padding: theme.spacing(1.25, 3)
  },
  isGroupRoot: { padding: theme.spacing(0.5, 3) },
  contentChatHead: {
    textAlign: 'left',
    marginLeft: theme.spacing(2)
  },
  usersNamesCont: {
    [theme.breakpoints.down('md')]: {
      cursor: 'pointer'
    }
  },
  groupNames: {
    marginLeft: theme.spacing(5.375),
    textAlign: 'left'
  },
  companyNameM: {
    marginLeft: theme.spacing(2)
  },
  listItem: {
    padding: theme.spacing(0.75, 2.5),
    borderBottom: '1px solid #ECF0F8',
    '&:first-of-type': { paddingTop: 0 },
    '&:last-of-type': { borderBottom: 0, paddingBottom: 0 }
  }
}));

// ----------------------------------------------------------------------

function OneAvatar({ participants = [] }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const participant = [...participants][0];
  const { onlineUsers = [] } = useSelector((state) => state.chat);
  const uploadUrl = links.upload;


  if (participant === undefined) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar alt={participant?.companyName} src={uploadUrl.getCompanyLogo(`logo_${participant?.companyId}.png`)} />
      </Box>
      <Box className={classes.contentChatHead}>
        <Typography variant="subtitle2">{participant.companyName}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {onlineUsers.findIndex(x => x.userId == participant?.id) > -1 ? t("online") : t("away")}
        </Typography>
      </Box>
    </Box>
  );
}

function GroupAvatar({ participants }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { themeDirection } = useSelector((state) => state.settings);
  const uploadUrl = links.upload;
  const { messages } = useSelector((state) => state.chat);
  const message = messages?.map(message => { return message.sender });
  const participant = participants.filter(x => x.id == parseInt(message))[0];
  const [open, setOpen] = useState(null);

  if (participant === undefined) {
    return null;
  }

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
          <Avatar
            alt={participant.name}
            src={uploadUrl.getCompanyLogo(`logo_${participant.companyId}.png`)}
            sx={{ width: 27, height: 27 }}
          />
          <Typography variant="subtitle2" className={classes.companyNameM}>{participant.companyName}</Typography>
        </Box>
        <Typography variant="subtitle2" className={classes.groupNames}>
          ({participants.length}) {t("persons")}
        </Typography>
      </Box>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: themeDirection === 'rtl' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: themeDirection === 'rtl' ? 'right' : 'left' }}
        classes={{ paper: classes.popover }}
      >
        <Typography noWrap variant="subtitle1" sx={{ padding: (theme) => theme.spacing(1, 2) }}> {t("users in group")} </Typography>
        <Divider />
        <List>
          {participants.map((part, index) => {
            return <ListItem key={index} disableGutters className={classes.listItem}>
              {part.name}
            </ListItem>
          })}
        </List>
      </Popover>
    </div>
  );
}

HeaderDetail.propTypes = {
  className: PropTypes.string,
  participants: PropTypes.array
};

function HeaderDetail({ participants, className, ...other }) {
  const classes = useStyles();
  const isGroup = participants?.length > 1;

  return (
    <div className={clsx(classes.root, isGroup ? classes.isGroupRoot : null, className)} {...other}>
      {isGroup ? (
        <GroupAvatar participants={participants} />
      ) : (
        <OneAvatar participants={participants} />
      )}

      <Box sx={{ flexGrow: 1 }} />
    </div>
  );
}

export default HeaderDetail;
