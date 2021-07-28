import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Logo from 'src/components/Logo';
import LogoDark from 'src/components/LogoDark';
import React, { useState, useRef } from 'react';
import useOffSetTop from 'src/hooks/useOffSetTop';
import homeFill from '@iconify-icons/eva/home-fill';
import PopoverMenu from 'src/components/PopoverMenu';
import roundSpeed from '@iconify-icons/ic/round-speed';
import menu2Fill from '@iconify-icons/eva/menu-2-fill';
import { PATH_PAGE } from 'src/routes/paths';
import bookOpenFill from '@iconify-icons/eva/book-open-fill';
import roundStreetview from '@iconify-icons/ic/round-streetview';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { makeStyles, alpha } from '@material-ui/core/styles';
import {
  Box,
  List,
  Link,
  AppBar,
  Hidden,
  Toolbar,
  MenuItem,
  Container,
  ListItemText,
} from '@material-ui/core';
import { MIconButton } from 'src/theme';
import Languages from '../DashboardLayout/TopBar/Languages';
import { useTranslation } from 'react-i18next';
import { pxToRem } from 'src/utils/formatFontSize';
import Button from '../../components/Ui/Button';

// ----------------------------------------------------------------------
const MENU_LINKS = [
  { title: 'home', icon: homeFill, href: PATH_PAGE.common.home },
  { title: 'prices', icon: roundStreetview, href: PATH_PAGE.common.prices },
  { title: 'contactUs', icon: roundSpeed, href: PATH_PAGE.common.contactUs },
  { title: 'login', icon: bookOpenFill, href: PATH_PAGE.auth.login }
];
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 70;
const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    height: APP_BAR_MOBILE,
    transition: theme.transitions.create(['height', 'background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    [theme.breakpoints.up('md')]: {
      height: APP_BAR_DESKTOP
    }
  },
  isHome: {
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.text.disabled,
    }
  },
  isDesktopActive: {
    color: theme.palette.secondary.lighter
  },
  isMobileActive: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    )
  },
  onScroll: {
    '& $toolbar': {
      minHeight: APP_BAR_DESKTOP
    },
    [theme.breakpoints.up('md')]: {
      '& $toolbar': {
        height: APP_BAR_DESKTOP - 20
      }
    }
  },
  navButton: {
    fontSize: pxToRem(17),
    boxShadow: 'none',

  },
  whiteBtn: {
    background: theme.palette.grey[0],
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.grey[0],
    },
  },
  transparentNav: {
    background: 'transparent',
    '&$onScroll': {
      '& $toolbar': {
        backgroundColor: theme.palette.secondary.darker
      },
    }
  }
}));

// ----------------------------------------------------------------------

function TopBar() {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const { pathname } = useLocation();
  const offset = useOffSetTop(100);
  const [openMenu, setOpenMenu] = useState(false);
  const isHome = pathname === '/';
  const isLogo = (pathname === '/' || pathname === '/auth/login' || pathname === '/auth/register');

  const { t } = useTranslation();

  const renderMenuDesktop = (
    <div>
      {MENU_LINKS.map((link) => (
        <Link
          exact
          to={link.href}
          key={link.title}
          target={link.title === 'login' ? "_blank" : null}
          underline="none"
          variant="subtitle1"
          component={RouterLink}
          activeClassName={classes.isDesktopActive}
          className={clsx({
            [classes.isHome]: isHome
          })}
          sx={{ mr: 5, color: 'text.primary' }}
        >
          {t(link.title)}
        </Link>
      ))}

    </div>
  );

  const renderMenuMobile = (
    <PopoverMenu
      width={220}
      open={openMenu}
      anchorEl={anchorRef.current}
      onClose={() => setOpenMenu(false)}
    >
      <List>
        {MENU_LINKS.map((link) => (
          <MenuItem
            exact
            to={link.href}
            key={link.title}
            component={RouterLink}
            onClick={() => setOpenMenu(false)}
            activeClassName={classes.isMobileActive}
            sx={{ color: 'text.secondary' }}
          >
            <ListItemText>{link.title}</ListItemText>
          </MenuItem>
        ))}
      </List>
    </PopoverMenu>
  );

  return (
    <AppBar
      color='inherit'
      className={clsx(classes.root, { [classes.onScroll]: offset }, { [classes.transparentNav]: isHome })}
      sx={{ boxShadow: isHome ? 'none' : (theme) => theme.shadows[25].z8 }}
    >
      <Toolbar disableGutters className={classes.toolbar}>
        <Container
          maxWidth="lg"
          sx={{
            lineHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <RouterLink to="/">
            {isLogo ? <Logo /> : <LogoDark />}
          </RouterLink>
          <Box sx={{ flexGrow: 1 }} />

          <Hidden mdDown>{renderMenuDesktop}</Hidden>

          <Button
            homeBtn='homeBtn'
            btnWidth='btnWidth'
            widthAuto='widthAuto'
            whiteBtn={isHome ? 'whiteBtn' : null}
            component={Link}
            target="_blank"
            href={PATH_PAGE.auth.register}
          >
            {t("registeration")}
          </Button>

          <Hidden mdUp>
            <MIconButton
              ref={anchorRef}
              onClick={() => setOpenMenu(true)}
              className={clsx({
                [classes.isHome]: isHome
              })}
            >
              <Icon icon={menu2Fill} />
            </MIconButton>
            {renderMenuMobile}
          </Hidden>

          <Languages />
        </Container>
      </Toolbar>
      {offset && (
        <Box
          sx={{
            left: 0,
            right: 0,
            bottom: 0,
            height: 24,
            zIndex: -1,
            margin: 'auto',
            borderRadius: '50%',
            position: 'absolute',
            width: `calc(100% - 48px)`,
          }}
        />
      )}
    </AppBar>
  );
}

export default TopBar;
