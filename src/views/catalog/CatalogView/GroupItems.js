import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import {
    Card,
    Grid,
    CardContent,
    Typography
} from '@material-ui/core';
import clsx from 'clsx';
import { getGroups, getPart } from 'src/redux/slices/catalog';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    CarItems: {
        border: '1px solid #E7F0F7',
        boxShadow: '0px 4px 8px rgb(20 69 91 / 3%)',
        borderRadius: '10px'
    },
    CarItemsCont: {
        padding: '16px',
        '& img': {
            [theme.breakpoints.down('md')]: {
                margin: 'auto'
            }
        }
    },
    carItemName: {
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: 0,
        minHeight: '50px',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: 'pointer'
    }
}));

// ----------------------------------------------------------------------

function GroupItems() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { groups, selectedCar, selectedCatalog, fromList } = useSelector((state) => state.catalogs);

    return (
        <Grid container spacing={1}>
            {groups.map((groupItem) => (
                <Grid item xs={12} sm={6} md={3} key={groupItem.id}>
                    <Card className={clsx(classes.root, classes.CarItems)}>
                        <CardActionArea
                            onClick={() => {
                                const catalogId = fromList
                                    ? selectedCatalog.id
                                    : selectedCar.catalogId;
                                const carId = fromList ? selectedCar.id : selectedCar.carId;
                                if (groupItem.hasSubgroups) {
                                    dispatch(getGroups(catalogId, carId, groupItem.id, null, selectedCar));
                                }
                                else {
                                    dispatch(getPart(catalogId, carId, groupItem.id, null));
                                }
                            }}
                        >
                            <CardContent className={classes.CarItemsCont}>
                                <img
                                    src={
                                        groupItem.img != null
                                            ? groupItem.img
                                            : "https://q-product.ams3.digitaloceanspaces.com/na.png"
                                    }
                                    alt={groupItem.name}
                                />
                                <Typography gutterBottom variant="body1" className={classes.carItemName}>
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
