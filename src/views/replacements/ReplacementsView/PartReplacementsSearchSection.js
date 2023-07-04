import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import SearchBox from '../../../components/SearchBox';
import { getPartReplacements } from 'src/redux/slices/replacements';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    replacementsPartSearch: {
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
        margin: theme.spacing(8, 'auto', 3.75)
    }
}));

// ----------------------------------------------------------------------

function PartReplacementsSearchSection() {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleReplacementsPartSearch = (search) => {
        dispatch(getPartReplacements(search));
    }

    return (
        <Box className={classes.replacementsPartSearch}>
            <SearchBox
                handleSubmit={handleReplacementsPartSearch}
                placeholder={t("replacementsTab.title")}
                type='topBarSearch'
                bg />
        </Box>
    );
}

export default PartReplacementsSearchSection;
