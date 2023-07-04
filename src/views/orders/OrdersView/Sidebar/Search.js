import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify-icons/eva/search-fill';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  ClickAwayListener
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'rgb(246 248 252 / 70%)',
    padding: theme.spacing(1, 2),
    borderBottom: '1px solid #ECF0F8',
  },
  search: {
    transition: theme.transitions.create('box-shadow', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': { boxShadow: theme.shadows[25].z8 },
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  }
}));

// ----------------------------------------------------------------------

Search.propTypes = {
  query: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onClickAway: PropTypes.func,
  className: PropTypes.string
};

function Search({ query, onChange, onFocus, onClickAway, className }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div className={clsx(classes.root, className)}>
        <FormControl fullWidth size="small" sx={{backgroundColor: (theme) => theme.palette.grey[0]}}>
          <OutlinedInput
            value={query}
            onFocus={onFocus}
            onChange={onChange}
            placeholder={t("Search contacts")}
            startAdornment={
              <InputAdornment position="start">
                <Box
                  component={Icon}
                  icon={searchFill}
                  sx={{ color: 'text.disabled' }}
                />
              </InputAdornment>
            }
            className={classes.search}
          />
        </FormControl>
      </div>
    </ClickAwayListener>
  );
}

export default Search;
