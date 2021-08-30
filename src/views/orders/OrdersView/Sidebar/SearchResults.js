import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  Avatar,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';
import links from 'src/constants/links';
import SearchNotFound from 'src/components/SearchNotFound';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    padding: theme.spacing(1.5, 2),
    borderBottom: '1px solid #ECF0F8',
    '&:last-of-type': { borderBottom: 0 },
    '&:hover': {
      backgroundColor: 'rgb(235 242 255 / 45%)'
    }
  },
  notFound: {
    margin: 'auto',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    width: `calc(100% - ${theme.spacing(6)})`,
    backgroundColor: theme.palette.background.neutral
  }
}));

// ----------------------------------------------------------------------

SearchResults.propTypes = {
  query: PropTypes.string,
  results: PropTypes.array,
  onSelectContact: PropTypes.func,
  className: PropTypes.string
};

const uploadUrl = links.upload;


function SearchResults({
  query,
  results,
  onSelectContact,
  className,
  ...other
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const isFound = results.length > 0;

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Typography
        paragraph
        variant="subtitle1"
        sx={{ px: 3, color: 'text.secondary', mt: 2 }}
      >
        {t("Contacts")}
      </Typography>

      <List disablePadding>
        {results.map((result) => (
          <ListItem
            key={result.id}
            button
            onClick={() => onSelectContact(result)}
            className={classes.listItem}
          >
            <ListItemAvatar>
              <Avatar alt={result.name} src={uploadUrl.getCompanyLogo(`logo_${result.id}.png`)} />
            </ListItemAvatar>
            <ListItemText
              primary={result.name}
              primaryTypographyProps={{
                noWrap: true,
                variant: 'subtitle2'
              }}
            />
          </ListItem>
        ))}
      </List>
      {!isFound && (
        <SearchNotFound searchQuery={query} className={classes.notFound} />
      )}
    </div>
  );
}

export default SearchResults;
