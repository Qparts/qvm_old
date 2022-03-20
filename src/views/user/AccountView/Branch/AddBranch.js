import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { Grid, Box, MenuItem, Typography } from '@material-ui/core';
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";
import { useSnackbar } from 'notistack';
import { PATH_APP } from 'src/routes/paths';
import { createBranch } from 'src/redux/slices/branches';
import { refreshToken } from 'src/redux/slices/authJwt';
import TextField from '../../../../components/Ui/TextField';
import CustomButton from '../../../../components/Ui/Button';
import { Location } from '../../../../icons/icons';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    map: {
        height: '300px',
        overflow: 'hidden',
        position: 'relative'
    },
    autocompleteDropdownContainer: {
        left: 0,
        top: 0,
        zIndex: 99999999999,
        backgroundColor: theme.palette.grey[0],
        width: '100%',
        border: '1px solid #D2D2D2',
        boxShadow: '0 2px 10px 0 rgba(30, 35, 67, 0.14)',
        position: 'absolute',
        '&:empty': {
            borderWidth: 0,
        }
    },
    inputSuggestion: {
        width: '100%',
        padding: '15px 10px',
        borderBottom: '1px solid #D2D2D2',
        display: 'flex',
        alignItems: 'flex-start',
        color: theme.palette.secondary.darker,
        fontWeight: theme.typography.fontWeightRegular,
        '& svg': {
            margin: '8px 5px 0 0',
        },
        '&:hover': {
            backgroundColor: '#f1f1f1 !important'
        }
    }
}));

// ----------------------------------------------------------------------

function AddBranch(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const { countries, loginObject } = useSelector((state) => state.authJwt);
    const { themeDirection } = useSelector((state) => state.settings);

    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [location, setLocation] = useState({});

    const [branchName, setBranchName] = useState("");
    const [countryId, setCountryId] = useState('');
    const [regionId, setRegionId] = useState('');
    const [cityId, setCityId] = useState('');
    const [address, setAddress] = useState('');

    const onMapClicked = (t, map, coord) => {
        let newLocation = {};
        const { latLng } = coord;
        newLocation.latitude = latLng.lat();
        newLocation.longitude = latLng.lng();
        setLocation(newLocation)
    };

    const handleSearchChange = (address) => {
        setAddress(address);
    };

    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                let newLocation = location;
                newLocation.latitude = latLng.lat;
                newLocation.longitude = latLng.lng;
                setLocation(newLocation);
            })
            .catch((error) => console.error("Error", error));
    };

    const BranchExists = (branchName) => {
        return loginObject.company.branches.some(el => {
            return el.name == branchName.trim();
        });
    }

    return (
        <>
            <TextField
                type='input'
                id="name"
                name="name"
                label={t("Name")}
                onChange={(e) => {
                    setBranchName(e.target.value)
                }}
            />

            <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        type='select'
                        spaceToTop="spaceToTop"
                        label={t("Country")}
                        value={countryId}
                        onChange={(event) => {
                            setCountryId(event.target.value);
                            setRegionId('');
                            setCityId('');
                            const country = countries.find(
                                (x) => x.id === parseInt(event.target.value)
                            );
                            const newregions = country != null ? country.regions : [];
                            setRegions(newregions);
                            setCities([]);
                        }}
                    >
                        <MenuItem aria-label="None" value="" />
                        {countries?.map((item, index) => (
                            <MenuItem value={item.id} key={index}>
                                {themeDirection == 'ltr' ? item.name : item.nameAr}
                            </MenuItem>))
                        }
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        type='select'
                        spaceToTop="spaceToTop"
                        label={t("Region")}
                        value={regionId}
                        onChange={(event) => {
                            setRegionId(event.target.value);
                            setCityId('');
                            const newCities = regions.find(
                                (x) => x.id === parseInt(event.target.value)
                            ).cities;
                            setCities(newCities);
                        }}
                    >
                        <MenuItem aria-label="None" value="" />
                        {regions?.map((item, index) => (
                            <MenuItem value={item.id} key={index}>
                                {themeDirection == 'ltr' ? item.name : item.nameAr}
                            </MenuItem>))
                        }
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        type='select'
                        spaceToTop="spaceToTop"
                        label={t("City")}
                        value={cityId}
                        onChange={(event) => {
                            setCityId(event.target.value);
                            const city = cities.find((e) => e.id == event.target.value);
                            let newLocation = {};
                            newLocation.latitude = city.latitude;
                            newLocation.longitude = city.longitude;
                            newLocation.mapZoom = city.mapZoom;
                            setLocation(newLocation);
                        }}
                    >
                        <MenuItem aria-label="None" value="" />
                        {cities?.map((item, index) => (
                            <MenuItem value={item.id} key={index}>
                                {themeDirection == 'ltr' ? item.name : item.nameAr}
                            </MenuItem>))
                        }
                    </TextField>
                </Grid>
            </Grid>

            {countryId != 0 &&
                regionId != 0 &&
                cityId != 0 &&
                (
                    <Box style={{ minHeight: 300 }}>
                        <Box className="mt-form auto-complete">
                            <PlacesAutocomplete
                                value={address}
                                onChange={handleSearchChange}
                                onSelect={handleSelect}
                            >
                                {({
                                    getInputProps,
                                    suggestions,
                                    getSuggestionItemProps,
                                    loading,
                                }) => (
                                    <Box>
                                        <Box>
                                            <TextField
                                                type='inputMap'
                                                spaceToTop='spaceToTop'
                                                getInputProps={getInputProps}
                                                label={`${t("Search Places")} ...`}
                                            />
                                        </Box>
                                        <Box sx={{ position: 'relative', marginTop: '5px' }}>
                                            <Box className={classes.autocompleteDropdownContainer}>
                                                {loading && <Box>{t("Loading")}...</Box>}
                                                {suggestions.map((suggestion, index) => {
                                                    const style = suggestion.active
                                                        ? {
                                                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                                                            cursor: "pointer",
                                                        }
                                                        : {
                                                            backgroundColor: "#ffffff",
                                                            cursor: "pointer",
                                                        };
                                                    return (
                                                        <Typography
                                                            variant="h6"
                                                            key={index}
                                                            className={classes.inputSuggestion}
                                                            {...getSuggestionItemProps(suggestion, {
                                                                style,
                                                            })}
                                                        >
                                                            <Location width='17px' height='17px' fill='#7E8D99' />
                                                            <span>{suggestion.description}</span>
                                                        </Typography>
                                                    );
                                                })}
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                            </PlacesAutocomplete>
                        </Box>

                        <Box className={classes.map}>
                            <Map
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: "relative",
                                }}
                                google={props.google}
                                initialCenter={{
                                    lat: location.latitude,
                                    lng: location.longitude,
                                }}
                                center={{
                                    lat: location.latitude,
                                    lng: location.longitude,
                                }}
                                onClick={onMapClicked}
                            >
                                <Marker
                                    position={{
                                        lat: location.latitude,
                                        lng: location.longitude,
                                    }}
                                />
                            </Map>
                        </Box>
                    </Box>
                )}

            <Box sx={{ marginTop: '20px' }}>
                <CustomButton
                    disabled={branchName == "" || countryId == 0 || regionId == 0 || cityId == 0 || !location.latitude || !location.longitude}
                    onClick={async () => {
                        if (BranchExists(branchName)) {
                            enqueueSnackbar(t('Branch already exist'), { variant: 'error' });
                        } else {
                            await dispatch(createBranch(branchName, countryId, regionId, cityId, location, countries));
                            await dispatch(refreshToken());
                            window.location = PATH_APP.management.user.account;
                            enqueueSnackbar(t('Success'), { variant: 'success' });
                        }
                    }}
                >
                    {t("Create")}
                </CustomButton>
            </Box>
        </>
    );
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyACI9aMajhzCpV4mJwbVKVlFu6jaNV9d5E",
})(AddBranch);
