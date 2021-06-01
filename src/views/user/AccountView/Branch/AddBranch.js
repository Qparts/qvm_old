import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import Button from "src/components/button/CustomButton";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Form, FormikProvider, useFormik } from 'formik';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import * as Yup from 'yup';
import {
    Box,
    Grid,
    Card,
    Switch,
    TextField,
    CardContent,
    FormControlLabel,
    Typography,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { createBranch, updateLocation } from 'src/redux/slices/branches';
import GridItem from './../../../../components/grid/GridItem';
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import PlacesAutocomplete from "react-places-autocomplete";
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function AddBranch(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const isMountedRef = useIsMountedRef();
    const { enqueueSnackbar } = useSnackbar();

    const { countries } = useSelector(
        (state) => state.authJwt
    );
    // const { regions, cities } = useSelector((state) => state.branches);

    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [location, setLocation] = useState({});



    const [branchName, setBranchName] = useState("");
    const [countryId, setCountryId] = useState(0);
    const [regionId, setRegionId] = useState(0);
    const [cityId, setCityId] = useState(0);
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

    return (

        <Grid container >

            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                required={true}
                                onChange={(e) => {
                                    setBranchName(e.target.value)
                                }}
                            />
                        </Grid>


                        <Grid item xs={12} sm={12}>

                            <FormControl fullWidth>
                                <InputLabel id="countryId">Country</InputLabel>
                                <Select
                                    native={true}
                                    labelId="countryLabelId"
                                    label="Country"
                                    value={countryId}

                                    onChange={(event) => {
                                        setCountryId(event.target.value);
                                        setRegionId(0);
                                        setCityId(0);
                                        const country = countries.find(
                                            (x) => x.id === parseInt(event.target.value)
                                        );
                                        const newregions = country != null ? country.regions : [];
                                        setRegions(newregions);
                                        setCities([]);
                                        // dispatch(updateLocation({ regions: newregions, cities: [] }))
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {countries?.map((item, index) => (
                                        <option value={item.id} key={index}>
                                            {item.name}
                                        </option>))
                                    }
                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel id="regionId">Region</InputLabel>
                                <Select
                                    native={true}
                                    labelId="regionLabelId"
                                    label="Region"
                                    value={regionId}
                                    onChange={(event) => {
                                        setRegionId(event.target.value);
                                        setCityId(0);
                                        const newCities = regions.find(
                                            (x) => x.id === parseInt(event.target.value)
                                        ).cities;
                                        setCities(newCities);
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {regions?.map((item, index) => (
                                        <option value={item.id} key={index}>
                                            {item.name}
                                        </option>))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel id="cityId">City</InputLabel>
                                <Select
                                    native={true}
                                    labelId="cityLabelId"
                                    label="City"
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
                                    <option aria-label="None" value="" />
                                    {cities?.map((item, index) => (
                                        <option value={item.id} key={index}>
                                            {item.name}
                                        </option>))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>




                        <Grid item xs={12} md={12}>
                            {countryId != 0 &&
                                regionId != 0 &&
                                cityId != 0 &&
                                (
                                    <div style={{ minHeight: 300 }}>


                                        <div className="mt-form auto-complete">
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
                                                    <div className="mb-2">
                                                        <div className="MuiFormControl-root undefined makeStyles-formControl-556 MuiFormControl-fullWidth">
                                                            <div className="MuiInputBase-root MuiInput-root MuiInput-underline makeStyles-underline MuiInputBase-formControl MuiInput-formControl">
                                                                <input
                                                                    {...getInputProps({
                                                                        placeholder: `${t("Search Places")} ...`,
                                                                        className:
                                                                            "MuiInputBase-input MuiInput-input",
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="position-relative">
                                                            <div className="autocomplete-dropdown-container position-absolute">
                                                                {loading && <div>{t("Loading")}...</div>}
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
                                                                        <div
                                                                            key={index}
                                                                            className="input-suggestion"
                                                                            {...getSuggestionItemProps(suggestion, {
                                                                                style,
                                                                            })}
                                                                        >
                                                                            <i className="material-icons">
                                                                                location_on{" "}
                                                                            </i>{" "}
                                                                            <span>{suggestion.description}</span>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </PlacesAutocomplete>
                                        </div>



                                        <div className="map-container">
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
                                        </div>
                                    </div>
                                )}
                        </Grid>




                    </Grid>

                    <div className="d-flex justify-content-end">
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            onClick={() => {
                                dispatch(createBranch(branchName, countryId, regionId, cityId, location, countries));
                                props.setAddBranchIsOpen(false);
                            }}
                        >
                            Create
                         </LoadingButton>
                    </div>

                </CardContent>
            </Card>
        </Grid>

    );
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyACI9aMajhzCpV4mJwbVKVlFu6jaNV9d5E",
})(AddBranch);
