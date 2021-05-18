import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import CardActionArea from '@material-ui/core/CardActionArea';


import {
    Card,
    Grid,
    CardContent,
    Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { getGroups, getPart } from 'src/redux/slices/catalog';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function GroupItems() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { groups, selectedCar, selectedCatalog, fromList , groupsStack  } = useSelector((state) => state.catalogs);

    return (

        <Grid container spacing={1}>

                {groups.map((groupItem) => (
                    <Grid item xs={12} sm={4} md={3} key={groupItem.id}>
                        <Card className={classes.root}>
                            <CardActionArea
                            onClick={() => {
                                const catalogId = fromList
                                    ? selectedCatalog.id
                                    : selectedCar.catalogId;
                                const carId = fromList ? selectedCar.id : selectedCar.carId;
                                if (groupItem.hasSubgroups) {
                                    dispatch(getGroups(catalogId, carId, groupItem.id, null , selectedCar));
                                } 
                                else {
                                    dispatch(getPart(catalogId, carId, groupItem.id, null));
                                }
                            }}
                            >

                                <CardContent>
                                    <img
                                        src={
                                            groupItem.img != null
                                                ? groupItem.img
                                                : "https://s3.eu-central-1.amazonaws.com/q-product/na.png"
                                        }
                                        alt={groupItem.name}
                                    />
                                    <Typography gutterBottom variant="h5" component="h5">
                                        {groupItem.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                        </Card>
                    </Grid>
                ))}


        </Grid>
    );
}

export default GroupItems;
