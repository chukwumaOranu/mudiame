const princingList = [
  {
    title: "Gel Nail Polish",
    duration: "Vegan, cruelty-free, high-gloss and long-lasting formula.",
    price: "NGN 7,000",
  },
  {
    title: "Lip Glosses",
    duration: "Comfortable all-day wear with a shine-focused finish.",
    price: "NGN 4,000",
  },
];
const princingList2 = [
  {
    title: "Eyeshadow Palette",
    duration: "Highly pigmented shades with matte, shimmer, and metallics.",
    price: "NGN 12,000",
  },
  {
    title: "Lip Pencil",
    duration: "Smooth-glide, long-wearing precision lip definition.",
    price: "NGN 3,000",
  },
];

const OurPricing = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          {princingList.map((item, index) => (
            <div className="price-tbl d-flex" key={index}>
              <div className="flex-grow-1">
                <h4 className="text-primary">{item.title}</h4>
                <p>{item.duration}</p>
              </div>
              <div className="price-val align-self-center">
                <h3 className="text-secondry">{item.price}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          {princingList2.map((i, ind) => (
            <div className="price-tbl d-flex" key={ind}>
              <div className="flex-grow-1">
                <h4 className="text-primary">{i.title}</h4>
                <p>{i.duration}</p>
              </div>
              <div className="price-val align-self-center">
                <h3 className="text-secondry">{i.price}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurPricing;
