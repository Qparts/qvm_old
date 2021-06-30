import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import {
    Card,
    Grid,
    CardContent,
    FormControl,
    MenuItem
} from '@material-ui/core';
import { handleFilterChange } from 'src/redux/slices/catalog';
import { useTranslation } from 'react-i18next';
import Select from '../../../components/Ui/Select';
import FilterResult from '../../../components/Ui/FilterResult';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {},
    filterCont: {
        boxShadow: '0px 4px 8px rgb(20 69 91 / 3%)',
        borderRadius: '20px',
    },
    cardFilterContent: {
        padding: '15px',
        '&:last-child': {
            padding: '15px'
        }
    },
    accordionCont: {
        border: 'none',
        boxShadow: 'none !important',
    },
    accordionDetails: {
        borderTop: '1px solid #E7F0F7'
    },
    catalogFilterResult: {
        display: 'flex'
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
                    <Accordion defaultExpanded className={classes.accordionCont}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            aria-label="Expand">

                            <Typography>{t("filter")}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>
                            <div className={classes.catalogFilterResult}>
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
                            </div>

                            <Grid container spacing={1}>
                                {filters.map(
                                    (filter) =>
                                        !filterKeysMap.has(filter.key) && (
                                            <Grid item xs={12} sm={4} md={3} key={filter.key}>
                                                <FormControl required style={{ width: "100%", textTransform: 'capitalize' }}>
                                                    <Select
                                                        label={filter.key}
                                                        id={filter.key}
                                                        value=''
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
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        )
                                )}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                </CardContent >
            </Card>
        </Grid>
    );
}

export default CarFilter;
