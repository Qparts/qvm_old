import clsx from 'clsx';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import { Icon } from '@iconify/react';
import homeFill from '@iconify-icons/eva/home-fill';
import { useTranslation } from 'react-i18next';
import { PATH_APP } from 'src/routes/paths';
import Button from "./Button";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(4, 2)
  },
  btnHomeIcon: {
    fontSize: '20px', 
    marginRight: theme.spacing(1)
  }
}));

// ----------------------------------------------------------------------

EmptyContent.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string
};

function EmptyContent({ title, description, img, url, btnTitle, btnHome, className, ...other }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={clsx(classes.root, className)} {...other}>
      <Box
        component="img"
        alt="empty content"
        src={img ? img : '/static/illustrations/illustration_empty_content.svg'}
        sx={{ height: 240, mb: 3 }}
      />

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }} gutterBottom>
          {description}
        </Typography>
      )}

      {btnTitle && (
        <Button btnWidth="btnWidth" onClick={url}>
          {btnTitle}
        </Button>
      )}

      {btnHome && (
        <Button btnWidth="btnWidth" component={RouterLink} to={PATH_APP.general.dashboard}>
          {<Icon icon={homeFill} className={classes.btnHomeIcon} />}
          {t("Back to home")}
        </Button>
      )}
    </Box>
  );
}

export default EmptyContent;
