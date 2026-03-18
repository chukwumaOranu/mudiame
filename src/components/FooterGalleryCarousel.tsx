import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useFooterGalleryItemsQuery } from '../hooks/useFooterGallery';

type FooterGalleryFallbackItem = {
  image_url: string;
  thumbnail_url: string;
  title: string;
};

type FooterGalleryCarouselProps = {
  fallbackItems: FooterGalleryFallbackItem[];
  swiperClassName: string;
  slidesPerView: number;
  breakpoints: Record<number, { slidesPerView: number }>;
  slideClassName?: string;
  wrapperClassName?: string;
};

const FooterGalleryCarousel = ({
  fallbackItems,
  swiperClassName,
  slidesPerView,
  breakpoints,
  slideClassName = 'swiper-slide',
  wrapperClassName = 'portfolio-gallery',
}: FooterGalleryCarouselProps) => {
  const footerGalleryQuery = useFooterGalleryItemsQuery(1, fallbackItems.length);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const items = useMemo(() => {
    const remoteItems = footerGalleryQuery.data?.items || [];
    if (remoteItems.length) {
      return remoteItems.map((item) => ({
        image_url: item.image_url,
        thumbnail_url: item.thumbnail_url || item.image_url,
        title: item.title,
      }));
    }

    return fallbackItems;
  }, [fallbackItems, footerGalleryQuery.data?.items]);

  const activeImage = selectedIndex !== null ? items[selectedIndex] : null;

  const openImage = (index: number) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const prevHandler = () => {
    if (!items.length) {
      return;
    }

    setSelectedIndex((current) => {
      if (current === null) {
        return 0;
      }

      return current > 0 ? current - 1 : items.length - 1;
    });
  };

  const nextHandler = () => {
    if (!items.length) {
      return;
    }

    setSelectedIndex((current) => {
      if (current === null) {
        return 0;
      }

      return current < items.length - 1 ? current + 1 : 0;
    });
  };

  return (
    <>
      <div className={wrapperClassName}>
        <div className="container-fluid">
          <div className="row">
            <Swiper
              className={swiperClassName}
              slidesPerView={slidesPerView}
              speed={1500}
              modules={[Autoplay]}
              autoplay={{ delay: 1200 }}
              loop={items.length > 1}
              breakpoints={breakpoints}
            >
              {items.map((item, index) => (
                <SwiperSlide className={slideClassName} key={`${item.thumbnail_url}-${index}`}>
                  <Link
                    onClick={() => openImage(index)}
                    to="#"
                    className="dynamic-gallery-demo swiper-slide mfp-link dlab-media dlab-img-overlay3"
                  >
                    <img className="footer-slide-image" src={item.thumbnail_url} alt={item.title} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <div className={`image_gallery_div ${selectedIndex !== null ? 'image_gallery' : ''}`}>
        <div className="overlay" onClick={closeImage}></div>
        <div className="mfp">
          <button onClick={closeImage} className="mfp-close">
            <i className="ti-close"></i>
          </button>
          <img className="all_images" src={activeImage?.image_url || ''} alt={activeImage?.title || ''} />
        </div>
        <div className="galleryButtons">
          <div onClick={prevHandler} className="prev mfp-arrow mfp-arrow-left mfp-prevent-close"></div>
          <div onClick={nextHandler} className="next mfp-arrow mfp-arrow-right mfp-prevent-close"></div>
        </div>
      </div>
    </>
  );
};

export default FooterGalleryCarousel;
