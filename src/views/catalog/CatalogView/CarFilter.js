import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
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
    TextField,
    Box
} from '@material-ui/core';
import { handleFilterChange } from 'src/redux/slices/catalog';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {}
}));

// ----------------------------------------------------------------------

function CarFilter() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { filters, selectedCatalog, selectedModel, filterKeysMap } = useSelector((state) => state.catalogs);
    const { t } = useTranslation();


    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12}>
                <Card >
                    <CardContent className={classes.cardContent}>
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                aria-label="Expand"
                            >

                                <Typography>filter</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="border-top d-block">
                                <Grid container spacing={1}>
                                    {Array.from(filterKeysMap.keys()).map((keyItem) => {
                                        return (
                                            <Grid
                                                item
                                                xs={12} sm={2} md={2}
                                                key={keyItem}>
                                                <div className="badge badge-pill badge-light ">
                                                    {t(keyItem)} : {filterKeysMap.get(keyItem).value}
                                                    <ClearIcon
                                                        onClick={() => {
                                                            dispatch(handleFilterChange(filterKeysMap, selectedCatalog, selectedModel, keyItem, null));
                                                        }}
                                                    />
                                                </div>
                                            </Grid>
                                        );
                                    })}
                                </Grid>

                                <Box sx={{ mt: 3 }} />


                                <Grid container spacing={1}>
                                    {filters.map(
                                        (filter) =>
                                            !filterKeysMap.has(filter.key) && (
                                                <Grid item xs={12} sm={4} md={3} key={filter.key}>
                                                    <TextField
                                                        select
                                                        fullWidth
                                                        label={t(filter.key)}
                                                        id={filter.key}
                                                        name={filter.key}
                                                        onChange={(event) => {
                                                            dispatch(handleFilterChange(filterKeysMap, selectedCatalog, selectedModel, filter.key, JSON.parse(event.target.value)));
                                                        }}
                                                        SelectProps={{ native: true }}
                                                    >
                                                        <option aria-label="None" value="" />
                                                        {filter.values.map((item, index) => (
                                                            <option value={JSON.stringify(item)} key={index}>
                                                                {item.value}
                                                            </option>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                            )
                                    )}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                    </CardContent >
                </Card>

            </Grid>
        </Grid>
    );
}

export default CarFilter;
