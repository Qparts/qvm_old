import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles } from '@material-ui/core/styles';
import {Container } from '@material-ui/core';

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
                <h3>بدائل متعددة من البراندات</h3>
                <p>
                  انت لا تبيع أو تشتري براند واحد بل تستطيع اليوم الوصول لجميع
                  ماركات السيارات وجميع البدائل للبراند من تجاري واصلي وغيرها
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
                <h3>عروض خاصة</h3>
                <p>
                  اذا كان لديك مخزون تود تصريفه بشكل سريع، يمكنك إضافة جميع
                  القطع وعرضها لجميع التجار والمستفيدين بالسعر وبالكمية التي
                  تريدها، من اليوم لن يضيع وقتك في ارسال الايملات وتوزيع العروض
                  المطبوعه على التجار
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
                <h3>اصدار و استقبال امر شراء</h3>
                <p>
                  الوقت لابد من اختصاره وزيادة كفاءة الموظف لديك، لذلك تم تطوير
                  هذه الخاصية لحجز القطع التي تريدها خلال لحظات
                </p>
              </article>
              <figure className="product-ex">
                <div>
                  <img src="/static/images/buy-now.png" />
                </div>
                <figcaption>
                  <header>
                    <h5>فلتر زيت</h5>
                    <p>
                      24.48<span>رس</span>
                    </p>
                    <img src="/static/images/arrow-down.svg" />
                  </header>
                  <p>
                    فلتر زيت ليساره جي ام ، مناسبه لسيارات الشيفورليه أي سي
                    ديلكو، الأبعاد: 2.6 × 2.6 × 3.8 بوصة
                  </p>
                  <footer>إشتري الآن</footer>
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
