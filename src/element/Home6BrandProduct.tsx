import { Link } from "react-router-dom"
import { SVGICON } from "../constent/SvgIcon"
import { IMAGE } from "../constent/theme"



const productBrand = [
    { name: 'Nail Paint', img: IMAGE.productNailPaint, price: '499.00' },
    { name: 'Nail Decor', img: IMAGE.productNails, price: '299.00' },
    { name: 'Lipstick', img: IMAGE.productLipstick, price: '399.00' },
    { name: 'Nail Color', img: IMAGE.productColor, price: '999.00' },
]
const Home6BrandProduct = () => {


    return (
        <>

            <div className="row">
                {productBrand.map((item, ind) => (
                    <div className="col-lg-3 col-md-6 col-sm-6 m-b30" key={ind}>
                        <div className="product-bx-wraper bg-white text-center style-1">
                            <div className="dz-product-info p-lr30 p-b20 p-t10">
                                <div className="dz-media">
                                    <img src={item.img} className="media-1" alt="" />
                                </div>
                                <div className="about-product">
                                    <h6 className="product-name">{item.name}</h6>
                                    <div className="dz-star-rating d-flex align-items-center justify-content-center">
                                        {SVGICON.StarFill1}
                                        {SVGICON.StarFill2}
                                        {SVGICON.StarFill3}
                                        {SVGICON.StarFill4}
                                        {SVGICON.Star}
                                    </div>
                                </div>
                                <div className="sale-offer">-15%</div>
                            </div>
                            <div className="dz-footer">
                                <span className="price btn-lg btn-block">₹{item.price}</span>
                                <Link to="/shop-product-details" className="btn-lg site-button btn-block buy-btn">Add To Cart</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home6BrandProduct