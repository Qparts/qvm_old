import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
//-------------------------------SWIPER
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import './BrandsSwiperStyle.css';

// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(12)

    }
  };
});

// ----------------------------------------------------------------------

Benefits.propTypes = {
  className: PropTypes.string
};
function Benefits({ className }) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="lg" className="brands">
        <Typography
          variant="h3"
          align="center"
          className={classes.headingWeight}
        >
          تستطيع الوصول لجميع ماركات السيارات و البدائل من تجاري واصلي
        </Typography>

        <Swiper slidesPerView={'auto'} spaceBetween={0}>
          <SwiperSlide>
            <img src="./static/images/brands/gm.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/hyundai.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/KIa.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/ford.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/toyota.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/jeep.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/chevrolet.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/honda.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/chrysler.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/renault.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/dodge.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/cadillac.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/mazda.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/geely.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/nissan.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/lexus.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/ray.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/luber.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/delphi.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/mize.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/mackay.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/remy.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/mahle.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/aam.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/pista.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/gt.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/peak.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/supercool.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/victor-reinz-detail.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/dayco.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/ACDelco.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/Airtex-logo.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./static/images/brands/gabriel.png" />
          </SwiperSlide>
        </Swiper>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button color="primary">إظهار كل الماركات</Button>
        </Box>
        <div class="brand-list">
          <ul class="list-unstyled">
            <li>
              <img src="./static/images/brands/gm.png" />
            </li>
            <li>
              <img src="./static/images/brands/hyundai.png" />
            </li>
            <li>
              <img src="./static/images/brands/KIa.png" />
            </li>
            <li>
              <img src="./static/images/brands/ford.png" />
            </li>
            <li>
              <img src="./static/images/brands/toyota.png" />
            </li>
            <li>
              <img src="./static/images/brands/jeep.png" />
            </li>
            <li>
              <img src="./static/images/brands/chevrolet.png" />
            </li>
            <li>
              <img src="./static/images/brands/honda.png" />
            </li>
            <li>
              <img src="./static/images/brands/chrysler.png" />
            </li>
            <li>
              <img src="./static/images/brands/renault.png" />
            </li>
            <li>
              <img src="./static/images/brands/dodge.png" />
            </li>
            <li>
              <img src="./static/images/brands/cadillac.png" />
            </li>
            <li>
              <img src="./static/images/brands/mazda.png" />
            </li>
            <li>
              <img src="./static/images/brands/geely.png" />
            </li>
            <li>
              <img src="./static/images/brands/nissan.png" />
            </li>
            <li>
              <img src="./static/images/brands/lexus.png" />
            </li>
            <li>
              <img src="./static/images/brands/ray.png" />
            </li>
            <li>
              <img src="./static/images/brands/luber.png" />
            </li>
            <li>
              <img src="./static/images/brands/delphi.png" />
            </li>
            <li>
              <img src="./static/images/brands/mize.png" />
            </li>
            <li>
              <img src="./static/images/brands/mackay.png" />
            </li>
            <li>
              <img src="./static/images/brands/remy.png" />
            </li>
            <li>
              <img src="./static/images/brands/mahle.png" />
            </li>
            <li>
              <img src="./static/images/brands/aam.png" />
            </li>
            <li>
              <img src="./static/images/brands/pista.png" />
            </li>
            <li>
              <img src="./static/images/brands/gt.png" />
            </li>
            <li>
              <img src="./static/images/brands/peak.png" />
            </li>
            <li>
              <img src="./static/images/brands/supercool.png" />
            </li>
            <li>
              <img src="./static/images/brands/victor-reinz-detail.png" />
            </li>
            <li>
              <img src="./static/images/brands/dayco.png" />
            </li>
            <li>
              <img src="./static/images/brands/ACDelco.png" />
            </li>
            <li>
              <img src="./static/images/brands/Airtex-logo.png" />
            </li>
            <li>
              <img src="./static/images/brands/gabriel.png" />
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default Benefits;
