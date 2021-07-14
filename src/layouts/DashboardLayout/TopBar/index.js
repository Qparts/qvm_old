import clsx from 'clsx';
import React from 'react';
import { useHistory } from "react-router";
import { useDispatch } from 'react-redux';
import Account from './Account';
import PropTypes from 'prop-types';
import Languages from './Languages';
import { Icon } from '@iconify/react';
import Notifications from './Notifications';
import UploadStockBtn from '../../../components/Ui/UploadStockBtn';
import Orders from './Orders';
import menu2Fill from '@iconify-icons/eva/menu-2-fill';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, AppBar, Hidden, Toolbar, IconButton } from '@material-ui/core';
import constants from 'src/utils/constants';
import { PATH_APP } from 'src/routes/paths';
import { partSearch, getProductInfo, handleChangePage, resetLocationfilter, setFilter } from '../../../redux/slices/partSearch';
import SearchBox from '../../../components/SearchBox';
import roundAddShoppingCart from '@iconify-icons/ic/round-add-shopping-cart';
import { MButton } from 'src/theme';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';


// ----------------------------------------------------------------------

const DRAWER_WIDTH = 130;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 69;

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    backdropFilter: 'blur(8px)',
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: DRAWER_WIDTH
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
  const { t } = useTranslation();
  const { cartItems } = useSelector((state) => state.market);
  const { enqueueSnackbar } = useSnackbar();

  const handlePartSearch = (search) => {
    dispatch(resetLocationfilter());
    dispatch(setFilter({ filter: "" }));
    dispatch(handleChangePage({ newPage: 0 }));
    dispatch(partSearch(search, 0, constants.MAX, ""));
    getPartinfo(search);
    history.push(PATH_APP.general.partSearch);
  }

  const getPartinfo = (search) => {
    dispatch(getProductInfo(search, ""));
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

        <Hidden lgDown><SearchBox type='topBarSearch' handleSubmit={handlePartSearch} /></Hidden>
        <Hidden lgUp><SearchBox type='topBarSearchSm' handleSubmit={handlePartSearch} /></Hidden>
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
          <Hidden smDown>
            <UploadStockBtn bg={theme.palette.primary.main} color={theme.palette.grey[0]} />
          </Hidden>

          <MButton
            size="large"
            type="button"
            color="secandary"
            // variant="contained"
            startIcon={<Icon icon={roundAddShoppingCart} />}
            sx={{ whiteSpace: 'nowrap' }}
            onClick={() => {
              if (cartItems.length == 0) {
                history.push(PATH_APP.general.market);
                enqueueSnackbar( t("No items in cart") , { variant: 'warning' });
              } else {
                history.push(`${PATH_APP.general.market}/cart`);
              }

            }}
          >
            {t("Shopping Cart")}
          </MButton>

          <Languages />
          <Orders />
          <Notifications />
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
