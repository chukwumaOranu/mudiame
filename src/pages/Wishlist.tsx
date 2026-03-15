import { useState } from "react";
import { IMAGE } from "../constent/theme"
import CommonBanner2 from "../element/CommonBanner2"
import { Link } from "react-router-dom";
import { ShopColumnDescription } from "./ShopColumn";



const cartItem = [
    { id: 1, image: IMAGE.produc_item1, number: 1 },
    { id: 2, image: IMAGE.produc_item2, number: 1 },
    { id: 3, image: IMAGE.produc_item3, number: 1 },
    { id: 4, image: IMAGE.produc_item4, number: 1 },
    { id: 5, image: IMAGE.produc_item5, number: 1 },
    { id: 6, image: IMAGE.produc_item6, number: 1 },
]



const Wishlist = () => {
    const [shopData, setShopData] = useState(cartItem);

    function handleDeleteClick(itemId: number) {
        const newItem = [...shopData];
        const index = shopData.findIndex((data) => data.id === itemId);
        newItem.splice(index, 1);
        setShopData(newItem)
    }

    function handleNumPlus(itemId: number) {
        const item = shopData.map((data) => {
            if (itemId === data.id) {
                return { ...data, number: data.number + 1 }
            }
            return data
        })
        setShopData(item)
    }

    function handleNumMinus(itemId: number) {
        const item = shopData.map((data) => {
            if (data.id === itemId) {
                return { ...data, number: data.number > 1 ? data.number - 1 : data.number }
            }
            return data
        })
        setShopData(item)
    }



    return (
        <>
            <div className="page-content bg-white">
                <CommonBanner2 title={'Wishlist'} img={IMAGE.banner3} />
                <div className="section-full content-inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 m-b30">
                                <div className="table-responsive">
                                    <table className="table check-tbl">
                                        <thead className="text-left">
                                            <tr>
                                                <th>Product</th>
                                                <th>Product name</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>Add to cart </th>
                                                <th>Close</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {shopData.map((data, index) => (
                                                <tr className="alert" key={index}>
                                                    <td className="product-item-img">
                                                        <img src={data.image} alt="" />
                                                    </td>
                                                    <td className="product-item-name">Prduct Item 3</td>
                                                    <td className="product-item-price">$28.00</td>
                                                    <td className="product-item-quantity">
                                                        <div className="quantity btn-quantity max-w80">
                                                            <div className="input-group bootstrap-touchspin">
                                                                <input className="form-control"
                                                                    type="text"
                                                                    name="demo_vertical2"
                                                                    value={data.number}
                                                                    style={{ pointerEvents: "none" }}
                                                                />
                                                                <span className="input-group-btn-vertical">
                                                                    <button
                                                                        onClick={() => { handleNumPlus(data.id) }}
                                                                        className="btn btn-default bootstrap-touchspin-up"
                                                                    >
                                                                        <i className="ti-plus"></i>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => { handleNumMinus(data.id) }}
                                                                        className="btn btn-default bootstrap-touchspin-down" type="button">
                                                                        <i className="ti-minus"></i>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="product-item-totle">
                                                        <Link to="/shop-cart" className="site-button">Add To Cart</Link></td>
                                                    <td
                                                        onClick={() => { handleDeleteClick(data.id) }}
                                                        className="product-item-close"><Link to="#" className="fa fa-times"></Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ShopColumnDescription />
            </div>
        </>
    )
}

export default Wishlist