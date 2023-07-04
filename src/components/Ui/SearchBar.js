import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PATH_APP } from 'src/routes/paths';
import helper from 'src/utils/helper';
import SearchBox from '../SearchBox';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    searchInput: {
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
        margin: '0 auto 30px'
    },
    searchPartStyl: { margin: theme.spacing(3, 'auto', 5) },
    searchHead: {
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightRegular,
        margin: theme.spacing(12, 0, 2.5),
        textAlign: 'center'
    }
}));

// ----------------------------------------------------------------------

function SearchBar({ searchHead, searchPartStyl }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleGeneralSearch = (search) => {
        helper.handlePartSearch(dispatch, history, PATH_APP.general.partSearch, search)
    }

    return (
        <Box className={clsx(classes.searchInput, classes[searchPartStyl])}>
            {searchHead && (
                <Typography variant="h4" className={classes.searchHead}>
                    {t("Search by part number")}
                </Typography>
            )}
            <SearchBox
                handleSubmit={handleGeneralSearch}
                placeholder={t("Search")}
                type='topBarSearch'
                bg />
        </Box>
    );
}

export default SearchBar;
