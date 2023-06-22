import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
//-------------------------------SWIPER
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import './BrandsSwiperStyle.css';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(12)
    },
    headingWeight: {
      [theme.breakpoints.down('sm')]: {
        fontSize: '21px !important',
      },
    }
  };
});

// ----------------------------------------------------------------------

Benefits.propTypes = {
  className: PropTypes.string
};

const brands = [
  // "./static/images/brands/gm.png",
  "./static/images/brands/nissan.png",
  "./static/images/brands/hyundai.png",
  "./static/images/brands/KIa.png",
  "./static/images/brands/ford.png",
  "./static/images/brands/toyota.png",
  // "./static/images/brands/jeep.png",
  // "./static/images/brands/chevrolet.png",
  // "./static/images/brands/honda.png",
  // "./static/images/brands/chrysler.png",
  // "./static/images/brands/renault.png",
  // "./static/images/brands/dodge.png",
  // "./static/images/brands/cadillac.png",
  // "./static/images/brands/mazda.png",
  // "./static/images/brands/geely.png",
  // "./static/images/brands/lexus.png",
  // "./static/images/brands/ray.png",
  // "./static/images/brands/luber.png",
  // "./static/images/brands/delphi.png",
  // "./static/images/brands/mize.png",
  // "./static/images/brands/mackay.png",
  // "./static/images/brands/remy.png",
  // "./static/images/brands/mahle.png",
  // "./static/images/brands/aam.png",
  // "./static/images/brands/pista.png",
  // "./static/images/brands/gt.png",
  // "./static/images/brands/peak.png",
  // "./static/images/brands/supercool.png",
  // "./static/images/brands/victor-reinz-detail.png",
  // "./static/images/brands/dayco.png",
  // "./static/images/brands/ACDelco.png",
  // "./static/images/brands/Airtex-logo.png",
  // "./static/images/brands/gabriel.png"
]

function Benefits({ className }) {
  const classes = useStyles();
  const { t } = useTranslation();
  
  // const [showAll, setShowAll] = useState(false);

  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="lg" className="brands">
        <Typography
          variant="h3"
          align="center"
          className={classes.headingWeight}
        >
          {t("access all brands of cars and alternatives, both commercial and original")}
        </Typography>

        {/* {showAll == false &&
          <>
            <Swiper slidesPerView={'auto'} spaceBetween={0}>
              {
                brands.map((brand, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img src={brand} />
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>

            <Box display="flex" justifyContent="center" mt={2}>
              <Button color="primary" onClick={() => setShowAll(true)}>{t("Show all brands")}</Button>
            </Box>
          </>
        } */}

        {/* {showAll &&
          <> */}
            <div class="brand-list">
              <ul class="list-unstyled">
                {
                  brands.map((brand, index) => {
                    return (
                      <li key={index}>
                        <img src={brand} />
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            {/* <Box display="flex" justifyContent="center" mt={2}>
              <Button color="primary" onClick={() => setShowAll(false)}>{t("Hid all brands")}</Button>
            </Box>
          </>
        } */}
      </Container>
    </div>
  );
}

export default Benefits;
