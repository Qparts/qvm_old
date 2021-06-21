import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import {
    partSearch, handleChangePage, searchLocation, setLocationQuery,
    AddLocationfilter, deleteLocationfilter
} from '../../../redux/slices/partSearch';
import constants from 'src/utils/constants';
import { CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/core/Autocomplete';

import { useTranslation } from 'react-i18next';
import { Search } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';



// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function LocationFilterSection() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { locationOptions, locationQuery, locationFilters = [], query, filter } = useSelector((state) => state.PartSearch);
    const { themeDirection } = useSelector((state) => state.settings);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emptyFilterFromDelete, setEmptyFilterFromDelete] = useState(false);


    useEffect(() => {
        if ((emptyFilterFromDelete || locationFilters.length > 0) && query != "") {
            dispatch(handleChangePage({ newPage: 0 }));
            dispatch(partSearch(query, 0, constants.MAX, filter, locationFilters));
        }

    }, [locationFilters])



    return (
        <Box sx={{ width: '100%' }}>

            <Autocomplete
                noOptionsText={t("No Options")}
                id="location-filter"
                style={{ width: 300 }}
                open={open}
                loading={loading}
                autoComplete
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                onChange={(event, values) => {
                    if (locationOptions.length > 0 && values != null) {
                        dispatch(AddLocationfilter({ values: values }));

                    }
                }}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        e.stopPropagation();
                        setOpen(true);
                        setLoading(true);
                        dispatch(searchLocation(e.target.value));
                        setLoading(false);
                    }
                }}
                getOptionSelected={(option, value) => option.object.id === value.object.id}
                getOptionLabel={(option) => option.object.name + ' ' + option.object.nameAr}
                options={locationOptions}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={t("Filter results by location")}
                        variant="standard"
                        onChange={(e) => {
                            setOpen(false);
                            dispatch(setLocationQuery({ locationQuery: e.target.value }));
                        }}

                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : (
                                        <Search
                                            className="search-icon-input"
                                            color="inherit"
                                            size={20}
                                            onClick={() => {
                                                setOpen(true);
                                                setLoading(true);
                                                dispatch(searchLocation(locationQuery));
                                                setLoading(false);
                                            }}
                                        />
                                    )}
                                </>
                            ),
                        }}
                    />
                )}
            />

            <Box sx={{ mb: 6 }} />

            {
                locationFilters.map((locationItem, index) => {
                    return (
                        <div className="badge badge-pill badge-light " key={index} style={{ margin: 10 }}>
                            {locationItem.type == 'C' ? 'Country' : locationItem.type == 'T' ? 'City' : 'Region'} :  {themeDirection == 'ltr' ? locationItem.object.name : locationItem.object.nameAr}
                            <ClearIcon
                                onClick={() => {
                                    if (locationFilters.length == 1) {
                                        setEmptyFilterFromDelete(true);
                                    }
                                    dispatch(deleteLocationfilter({ locationFilter: locationItem }));

                                }}
                            />
                        </div>
                    )
                })
            }

        </Box>
    );
}

export default LocationFilterSection;
