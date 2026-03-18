import { Link, useSearchParams } from "react-router-dom";
import { IMAGE } from "../constent/theme";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import CommonBanner2 from "../element/CommonBanner2";
import { findServiceBySlug, serviceItems } from "../data/services";

const slider = [
  { img: IMAGE.blog_gridPic1 },
  { img: IMAGE.blog_gridPic2 },
  { img: IMAGE.blog_gridPic3 },
  { img: IMAGE.blog_gridPic1 },
  { img: IMAGE.blog_gridPic2 },
  { img: IMAGE.blog_gridPic3 },
];

const ServiceDetail = () => {
  const [searchParams] = useSearchParams();
  const selectedService = findServiceBySlug(searchParams.get("slug"));
  const swiperRef = useRef<SwiperRef | null>(null);

  return (
    <div className="page-content bg-white">
      <CommonBanner2 title={selectedService.title} img={IMAGE.banner1} />
      <div className="content-block">
        <div className="section-full content-inner-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4" style={{ zIndex: 2 }}>
                <div className="sticky-top">
                  <ul className="service-list m-b30">
                    {serviceItems.map((item) => (
                      <li key={item.slug} className={item.slug === selectedService.slug ? "active" : ""}>
                        <Link to={`/services-details?slug=${encodeURIComponent(item.slug)}`}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                  <div className="download-brochure m-b30">
                    <h4>Product Snapshot</h4>
                    <p>{selectedService.intro}</p>
                    <Link to="/booking" className="site-button">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <h2 className="m-t0 m-b10 fw6">{selectedService.title}</h2>
                <p>{selectedService.intro}</p>
                <Swiper
                  className="blog-carousel mfp-gallery owl-loaded owl-theme owl-carousel gallery owl-btn-center-lr owl-btn-1 primary m-b30"
                  slidesPerView={3}
                  spaceBetween={30}
                  speed={1500}
                  loop={true}
                  ref={swiperRef}
                  breakpoints={{
                    1200: {
                      slidesPerView: 3,
                    },
                    600: {
                      slidesPerView: 2,
                    },
                    240: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  {slider.map((item, index) => (
                    <SwiperSlide className="item" key={index}>
                      <div className="dlab-box service-iconbox">
                        <div className="dlab-media dlab-img-overlay5">
                          <Link to={`/services-details?slug=${encodeURIComponent(selectedService.slug)}`}>
                            <img src={item.img} alt={selectedService.title} />
                          </Link>
                        </div>
                        <div className="dlab-info p-a30 p-t60 border-1 bg-white text-center">
                          <div className="icon-bx-sm radius bg-white m-b20">
                            <Link to={`/services-details?slug=${encodeURIComponent(selectedService.slug)}`} className="icon-cell">
                              <i className={selectedService.icon}></i>
                            </Link>
                          </div>
                          <h6 className="dlab-title m-t0">
                            <Link to={`/services-details?slug=${encodeURIComponent(selectedService.slug)}`}>
                              {selectedService.shortTitle}
                            </Link>
                          </h6>
                          <p className="m-b15">
                            {selectedService.highlights[index % selectedService.highlights.length]}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                  <div className="light-carousel-buttons">
                    <div onClick={() => { swiperRef.current?.swiper.slidePrev(); }} className="button-prev">
                      <i className="ti-angle-left"></i>
                    </div>
                    <div onClick={() => { swiperRef.current?.swiper.slideNext(); }} className="button-next">
                      <i className="ti-angle-right"></i>
                    </div>
                  </div>
                </Swiper>
                {selectedService.description.map((paragraph, index) => (
                  <p className={index === selectedService.description.length - 1 ? "m-b20" : ""} key={index}>
                    {paragraph}
                  </p>
                ))}
                <AccordionAndCards selectedServiceSlug={selectedService.slug} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function AccordionAndCards({ selectedServiceSlug }: { selectedServiceSlug: string }) {
  const selectedService = findServiceBySlug(selectedServiceSlug);
  const accordionItems = [
    { title: "1. Product Overview", subtitle: selectedService.summary },
    { title: "2. Key Highlights", subtitle: selectedService.highlights.join(", ") },
    { title: "3. Ingredients", subtitle: selectedService.ingredients.join(", ") },
    { title: "4. Price", subtitle: selectedService.price || "Price varies by product selection." },
  ];

  return (
    <>
      <div className="m-tb20">
        <div className="accordion no-gap" id="accordion1">
          {accordionItems.map((item, index) => (
            <div className="panel" key={index}>
              <div className="acod-head">
                <h6 className="acod-title">
                  <Link to="#" className={index === 0 ? "" : "collapsed"} onClick={(event) => event.preventDefault()}>
                    {item.title}
                  </Link>
                </h6>
              </div>
              <div className={`acod-body collapse ${index === 0 ? "show" : ""}`}>
                <div className="acod-content">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="row m-lr0">
        {serviceItems.map((item) => (
          <div className="col-lg-4 col-md-6 col-sm-6 p-lr0" key={item.slug}>
            <div className="icon-bx-wraper center p-a30 bg-gray">
              <div className="icon-lg radius m-b20">
                <Link to={`/services-details?slug=${encodeURIComponent(item.slug)}`} className="icon-cell">
                  <i className={item.icon}></i>
                </Link>
              </div>
              <div className="icon-content">
                <h6 className="dez-tilte">
                  <Link to={`/services-details?slug=${encodeURIComponent(item.slug)}`}>{item.title}</Link>
                </h6>
                <p>{item.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ServiceDetail;
