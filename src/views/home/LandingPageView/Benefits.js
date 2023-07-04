import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

//-------------------------------SWIPER
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

import './BenefitsSwiperStyle.css';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(12)
      }
    }
  };
});

// ----------------------------------------------------------------------

Benefits.propTypes = {
  className: PropTypes.string
};

function Benefits({ className }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="lg" className="features">
        <Swiper
          slidesPerView={'auto'}
          centeredSlides={true}
          spaceBetween={50}
          pagination={{
            clickable: true
          }}
          className="mySwiper"
          autoplay={{
            "delay": 3500,
            "disableOnInteraction": false
          }}
        >
          <SwiperSlide>
            <div className="box-shadow brand-variety">
              <article className="article-disc">
                <h3> {t("Multiple Brand Alternatives")} </h3>
                <p>
                  {t("You don't buy or sell one brand, today you can access all brands and aftermarket alternatives")}
                </p>
              </article>
              <figure>
                <img src="/static/images/brand-variety.jpg" />
              </figure>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="box-shadow offer">
              <article className="article-disc">
                <h3> {t("Special Offers")} </h3>
                <p>
                  {t("If you have stock that you want to quickly dispose, you can add display them to all suppliers and beneficiaries at the price you want and the quantity you want You don't need to send emails or print brochures to distribute on vendors")}
                </p>
              </article>
              <figure>
                <img src="/static/images/offers.png" />
              </figure>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="box-shadow product-ex">
              <article className="article-disc">
                <h3> {t("Issuing and Receiving Purchase Oders (*soon)")} </h3>
                <p>
                  {t("Cut the time short and make your employees work more effeciently, keep away from phone calls, official e-mails, and printed invoices")}
                </p>
              </article>
              <figure className="product-ex">
                <div>
                  <img src="/static/images/buy-now.png" />
                </div>
                <figcaption>
                  <header>
                    <h5> {t("Oil FIlter")} </h5>
                    <p>
                      24.48<span> {t("SAR")} </span>
                    </p>
                    <img src="/static/images/arrow-down.svg" />
                  </header>
                  <p>
                    {t("GM Left oil filter, suitable for Chevy ACDelco vehicles")}
                  </p>
                  <footer> {t("Buy now")} </footer>
                </figcaption>
              </figure>
            </div>
          </SwiperSlide>
        </Swiper>
      </Container>
    </div>
  );
}

export default Benefits;
