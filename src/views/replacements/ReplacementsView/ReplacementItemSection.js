import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import Datatable from 'src/components/table/DataTable';
import constants from 'src/utils/constants';
import 'react-slideshow-image/dist/styles.css'
import ImageSlider from 'ac-react-simple-image-slider';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------


function ReplacementItemSection({ replacementItem }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [imageData, setImageData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(constants.MAX);




    useEffect(() => {
        let itemimageData = [];
        for (let image of replacementItem.images) {
            itemimageData.push({ src: image.imageURL200 });
        }
        setImageData(itemimageData);
    }, [])




    return (

        <Box sx={{ width: '100%' }}>
            <Card >
                <CardContent className={classes.cardContent}>

                    <div className="row">
                        <div className="col-md-6">
                            {t("Part Number")}
                        </div>

                        <div className="col-md-6">
                            {replacementItem.articleNumber}
                        </div>

                        <div className="col-md-6">
                            {t("Brand")}
                        </div>

                        <div className="col-md-6">
                            {replacementItem.mfrName}
                        </div>

                        <div className="col-md-6">
                            {t("Description")}
                        </div>

                        <div className="col-md-6">
                            {replacementItem.genericArticles[0].genericArticleDescription}
                        </div>

                    </div>


                    <Box sx={{ mb: 6 }} />

                    {imageData.length > 0 &&
                        <div className="row d-flex justify-content-center">
                            <ImageSlider height='400px' width='400px' data={imageData} autoPlay={false} showArrows={imageData.length > 1} />

                        </div>


                    }

                    <Box sx={{ mb: 6 }} />

                    <Datatable
                        header={[
                            {
                                name: t("Part Number"),
                                attr: 'articleNumber',
                            },
                            {
                                name: t("Brand"),
                                attr: 'mfrName'
                            }

                        ]}


                        datatable={replacementItem.oemNumbers}
                        page={page}
                        isLazy={false}
                        rowsPerPage={rowsPerPage}
                    />

                </CardContent >
            </Card>


        </Box >

    );
}

export default ReplacementItemSection;
