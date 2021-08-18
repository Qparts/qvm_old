import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import phoneFill from '@iconify-icons/eva/phone-fill';
import emailFill from '@iconify-icons/eva/email-fill';
import personFill from '@iconify-icons/eva/person-fill';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify-icons/eva/arrow-ios-downward-fill';
import Scrollbars from 'src/components/Scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Avatar,
  Button,
  Divider,
  Collapse,
  Typography,
  List
} from '@material-ui/core';
import links from 'src/constants/links';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: 'flex',
    margin: theme.spacing(1.5, 0)
  },
  itemIcon: {
    width: 16,
    height: 16,
    marginTop: 4,
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  itemText: {
    flexGrow: 1,
    maxWidth: 160,
    wordWrap: 'break-word'
  },
  button: {
    ...theme.typography.overline,
    height: 40,
    borderRadius: 0,
    padding: theme.spacing(1, 2),
    justifyContent: 'space-between',
    color: theme.palette.text.disabled
  }
}));

// ----------------------------------------------------------------------

OneParticipant.propTypes = {
  // participants: PropTypes.array.isRequired,
  isCollapse: PropTypes.bool,
  onCollapse: PropTypes.func,
  className: PropTypes.string
};

const uploadUrl = links.upload;
const HEIGHT = 64;


function OneParticipant({
  participants,
  isCollapse,
  onCollapse,
  className,
  ...other
}) {
  const classes = useStyles();

  if (participants === undefined) {
    return null;
  }

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Box
        sx={{
          pt: 4,
          pb: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Avatar
          alt={participants[0]?.companyName}
          src={uploadUrl.getCompanyLogo(`logo_${participants[0]?.companyId}.png`)}
          sx={{ width: 96, height: 96 }}
        />
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1">{participants[0]?.companyName}</Typography>
        </Box>
      </Box>

      <Divider />

      <Button
        fullWidth
        color="inherit"
        onClick={onCollapse}
        className={classes.button}
        endIcon={
          <Icon
            icon={isCollapse ? arrowIosDownwardFill : arrowIosForwardFill}
            width={16}
            height={16}
          />
        }
      >
        In room ({participants.length})
      </Button>

      <Box sx={{ height: isCollapse ? HEIGHT * 4 : 0, overflow: 'hidden' }}>
        <Scrollbars>
          <Collapse in={isCollapse}>
            <Box sx={{ px: 2.5, pb: 1 }}>
              {
                participants.map((participant, index) => (
                  <>
                    <div className={classes.item}>
                      <Icon icon={personFill} className={classes.itemIcon} />
                      <Typography variant="body4" className={classes.itemText}>
                        {participant.name}
                      </Typography>
                    </div>
                    {index != participants.length - 1 && <Divider />}
                  </>
                ))
              }
            </Box>
          </Collapse>
        </Scrollbars>
      </Box>
    </div>
  );
}

export default OneParticipant;
