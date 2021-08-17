import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import {
    Card,
    Grid,
    CardContent,
    FormControl,
    MenuItem,
    Box,
    Typography,
} from '@material-ui/core';
import { handleFilterChange } from 'src/redux/slices/catalog';
import { useTranslation } from 'react-i18next';
import TextField from '../../../components/Ui/TextField';
import FilterResult from '../../../components/Ui/FilterResult';
import Accordion from '../../../components/Ui/Accordion';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    filterCont: {
        boxShadow: 'none',
        borderRadius: '20px',
        border: '1px solid #E7F0F7',
        margin: theme.spacing(2, 0, 1)
    },
    cardFilterContent: {
        padding: '15px',
        '&:last-child': {
            padding: '15px'
        }
    },
    catalogFilterResult: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}));

// ----------------------------------------------------------------------

function CarFilter() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { filters, selectedCatalog, selectedModel, filterKeysMap } = useSelector((state) => state.catalogs);
    const { t } = useTranslation();


    return (
        <Grid item xs={12} md={12} lg={12}>
            <Card className={classes.filterCont}>
                <CardContent className={classes.cardFilterContent}>
                    <Accordion
                        expand
                        title={<Typography>{t("filter")}</Typography>}>
                        <Box className={classes.catalogFilterResult}>
                            {Array.from(filterKeysMap.keys()).map((keyItem) => {
                                return (
                                    <FilterResult key={keyItem}>
                                        {t(keyItem)} : {filterKeysMap.get(keyItem).value}
                                        <ClearIcon
                                            className={classes.clearCatalogFilterResult}
                                            onClick={() => {
                                                dispatch(handleFilterChange(filterKeysMap, selectedCatalog, selectedModel, keyItem, null));
                                            }}
                                        />
                                    </FilterResult>
                                );
                            })}
                        </Box>

                        <Grid container spacing={1}>
                            {filters.map(
                                (filter) =>
                                    !filterKeysMap.has(filter.key) && (
                                        <Grid item xs={12} sm={4} md={3} key={filter.key}>
                                            <FormControl required style={{ width: "100%", textTransform: 'capitalize' }}>
                                                <TextField
                                                    type='select'
                                                    label={filter.key}
                                                    id={filter.key}
                                                    name="catalogFilter"
                                                    spaceToTop="spaceToTop"
                                                    onChange={(event) => {
                                                        dispatch(handleFilterChange(filterKeysMap, selectedCatalog, selectedModel, filter.key, JSON.parse(event.target.value)));
                                                    }}>
                                                    <MenuItem aria-label="None" value="" />
                                                    {filter.values.map((item, index) => (
                                                        <MenuItem value={JSON.stringify(item)} key={index}>
                                                            {item.value}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </FormControl>
                                        </Grid>
                                    )
                            )}
                        </Grid>
                    </Accordion>
                </CardContent >
            </Card>
        </Grid>
    );
}

export default CarFilter;
