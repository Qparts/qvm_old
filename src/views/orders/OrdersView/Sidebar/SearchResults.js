import clsx from 'clsx';
import React , {useEffect} from 'react';
import PropTypes from 'prop-types';
import SearchNotFound from 'src/components/SearchNotFound';
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

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    padding: theme.spacing(1.5, 3)
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
  const isFound = results.length > 0;

  useEffect(() => { 
    console.log("results" ,results);
  }, [])

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Typography
        paragraph
        variant="subtitle1"
        sx={{ px: 3, color: 'text.secondary' }}
      >
        Contacts
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
