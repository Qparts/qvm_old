import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PATH_APP } from 'src/routes/paths';
import helper from 'src/utils/helper';
import SearchBox from '../../../components/SearchBox';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    generalSearch: {
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
        margin: '0 auto 30px'
    },
    searchHead: {
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightRegular,
        margin: theme.spacing(12, 0, 2.5),
        textAlign: 'center'
    }
}));

// ----------------------------------------------------------------------

function GeneralSearchSection() {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleGeneralSearch = (search) => {
        helper.handlePartSearch(dispatch, history, PATH_APP.general.partSearch, search)
    }

    return (
        <Box className={classes.generalSearch}>
            <Typography variant="h4" className={classes.searchHead}>
                {t("Search by part number")}
            </Typography>
            <SearchBox
                handleSubmit={handleGeneralSearch}
                placeholder={t("Search")}
                type='topBarSearch'
                bg />
        </Box>
    );
}

export default GeneralSearchSection;
