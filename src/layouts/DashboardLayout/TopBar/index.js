import clsx from 'clsx';
import React from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import Account from './Account';
import PropTypes from 'prop-types';
import Languages from './Languages';
import { Icon } from '@iconify/react';
import Notifications from './Notifications';
import UploadStockBtn from '../../../components/Ui/UploadStockBtn';
import menu2Fill from '@iconify-icons/eva/menu-2-fill';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, AppBar, Hidden, Toolbar, IconButton, Badge } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import constants from 'src/utils/constants';
import { PATH_APP } from 'src/routes/paths';
import helper from 'src/utils/helper';
import SearchBox from '../../../components/SearchBox';
import roundAddShoppingCart from '@iconify-icons/ic/round-add-shopping-cart';
import { MIconButton } from 'src/theme';
import { useSnackbar } from 'notistack';
import Button from 'src/components/Ui/Button';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 130;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 69;

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    backdropFilter: 'blur(8px)',
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: DRAWER_WIDTH,
      marginRight: theme.spacing(1),
    }
  },
  toolbar: {
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 5)
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: APPBAR_DESKTOP
    }
  }
}));

// ----------------------------------------------------------------------

TopBar.propTypes = {
  onOpenNav: PropTypes.func,
  className: PropTypes.string
};

function TopBar({ onOpenNav, className }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { cartItems } = useSelector((state) => state.market);
  const { currentPlan, loginObject } = useSelector((state) => state.authJwt);

  const handleGeneralSearch = (search) => {
    helper.handlePartSearch(dispatch, history, PATH_APP.general.partSearch, constants.MAX, search)
  }

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            onClick={onOpenNav}
            sx={{
              mr: 1,
              color: 'text.primary'
            }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>
        </Hidden>

        <Hidden lgDown><SearchBox type='topBarSearch' placeholder={t("Search by part number")} handleSubmit={handleGeneralSearch} /></Hidden>
        <Hidden lgUp><SearchBox type='topBarSearchSm' handleSubmit={handleGeneralSearch} /></Hidden>
        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > *': {
              ml: {
                xs: 0.5,
                sm: 2,
                lg: 3
              }
            }
          }}
        >
          {
          (loginObject) &&
          (currentPlan.status != 'A') &&
            <Button
              btnWidth="btnWidth"
              onClick={() => { helper.gotoPremium(history, enqueueSnackbar, t('There is a pending subscription'), PATH_APP.general.upgradeSubscription, t) }}
            >
              {t("Upgrade to Premium")}
            </Button>
          }
          <Box>
            <Hidden smDown>
              <UploadStockBtn bg={theme.palette.grey[0]} color={theme.palette.secondary.main} />
            </Hidden>
          </Box>
          <Languages />
          <MIconButton
            onClick={() => { history.push(`${PATH_APP.general.market}/cart`); }}
          >
            <Badge badgeContent={cartItems.length} color="error">
              <Icon icon={roundAddShoppingCart} color='#7E8D99' />
            </Badge>
          </MIconButton>
          <Notifications />
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
