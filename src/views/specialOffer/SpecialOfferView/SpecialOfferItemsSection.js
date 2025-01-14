import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, MenuItem, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import { getSpecialOffersLive, setFilteredSepcialOffer } from 'src/redux/slices/specialOffer';
import SecContainerOffer from '../../../components/Ui/SecContainerOffer';
// import Slider from '../../../components/Ui/Slider';
import TextField from '../../../components/Ui/TextField';
// import Label from '../../../components/Ui/Label';
import OfferContainer from '../../../components/Ui/OfferContainer';

// ----------------------------------------------------------------------

function SpecialOfferItemsSection() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { specialOffers = [], tags = [], latest } = useSelector((state) => state.specialOffer);
    const [filter, setFilter] = useState(false);
    const [offersFilter, setoffersFilter] = useState("all");

    useEffect(() => {
        if (specialOffers.length === 0 || latest === true) {
            dispatch(getSpecialOffersLive());
        }
    }, []);

    const toggleFilter = () => {
        setFilter(!filter);
    };

    const handleOffersFilterChange = (event) => {
        if (event.target.value === 'all') {
            setoffersFilter(event.target.value);
            dispatch(setFilteredSepcialOffer({ filteredSpecialOffers: specialOffers }))
        } else {
            let filteredSpecialOffers = specialOffers.filter(spec => {
                return spec.tag.includes(event.target.value)
            })
            setoffersFilter(event.target.value);
            dispatch(setFilteredSepcialOffer({ filteredSpecialOffers: filteredSpecialOffers }))
        }
    };

    return (
        <SecContainerOffer
            header={t('Special Offers')}
            filter={toggleFilter}>
            {filter ?
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                type='select'
                                label={t("Brand")}
                                id="category"
                                name="category"
                                value={offersFilter}
                                selectBg='selectBg'
                                spaceToTop="spaceToTop"
                                onChange={(event) => handleOffersFilterChange(event)}
                            >
                                {tags.map((option, index) => (
                                    <MenuItem key={index} value={option} sx={{ textTransform: 'capitalize' }}>
                                        {option === 'all' ? t("Show all brands") : option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Box mb={2} />
                </>
                : null}
            <OfferContainer md={3} />
        </SecContainerOffer>
    );
}

export default SpecialOfferItemsSection;
