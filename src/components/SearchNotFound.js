import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
  className: PropTypes.string
};

function SearchNotFound({ searchQuery = '', className, ...other }) {
  const { t } = useTranslation();
  return (
    <Box className={className} {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        {t("Not found")}
      </Typography>
      <Typography variant="body2" align="center">
        {t("No results found for")} &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. {t("Try checking for typos or using complete words")}
      </Typography>
    </Box>
  );
}

export default SearchNotFound;
