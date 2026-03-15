import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"
import CommonBanner2 from "../element/CommonBanner2"
import { useState } from "react"
import { ShopColumnDescription } from "./ShopColumn"
import { Dropdown } from "react-bootstrap"



const cartItem = [
    { id: 1, image: IMAGE.produc_item1, number: 1 },
    { id: 2, image: IMAGE.produc_item2, number: 1 },
    { id: 3, image: IMAGE.produc_item3, number: 1 },
    { id: 4, image: IMAGE.produc_item4, number: 1 },
    { id: 5, image: IMAGE.produc_item5, number: 1 },
    { id: 6, image: IMAGE.produc_item6, number: 1 },
]

const Cart = () => {
    const [shopData, setShopData] = useState(cartItem);
    const [formSelect, setFormSelect] = useState('Credit Card Type')

    const handleDeleteClick = (shopId: number) => {
        const newItem = [...shopData];
        const index = shopData.findIndex((data) => data.id === shopId);
        newItem.splice(index, 1);
        setShopData(newItem);

    }

    const handleNumPlus = (e: number) => {
        const temp = shopData.map((data) => {
            if (e === data.id) {
                return { ...data, number: data.number + 1 }
            }
            return data;
        });
        setShopData(temp);
    }
    const handleNumMinus = (e: number) => {
        const temp = shopData.map((data) => {
            if (e === data.id) {
                return { ...data, number: data.number > 1 ? data.number - 1 : data.number };
            }
            return data;
        });
        setShopData(temp);
    }

    return (
        <>
            <div className="page-content bg-white">
                <CommonBanner2 title={'Shop Cart'} img={IMAGE.banner1} />
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
                                                <th>Total</th>
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
                                                    <td className="product-item-totle">$28.00</td>
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
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <form className="shop-form">
                                    <h5>Calculate Shipping</h5>
                                    <div className="form-group">
                                        <Dropdown className="dropDown-menu">
                                            <Dropdown.Toggle variant="" className="dropdown-basic booking-options booking-option-2" style={{ gap: '70%' }}>
                                                {formSelect}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => { setFormSelect('Credit Card Type') }}>Credit Card Type</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Another option') }}>Another option</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('A option') }}>A option</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Potato') }}>Potato</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <input type="text" className="form-control" placeholder="Credit Card Number" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <input type="text" className="form-control" placeholder="Card Verification Number" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Coupon Code" />
                                    </div>
                                    <div className="form-group">
                                        <button className="site-button" type="button">Apply Coupon</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <h5>Cart Subtotal</h5>
                                <table className="table-bordered check-tbl">
                                    <tbody>
                                        <tr>
                                            <td>Order Subtotal</td>
                                            <td>$125.96</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping</td>
                                            <td>Free Shipping</td>
                                        </tr>
                                        <tr>
                                            <td>Coupon</td>
                                            <td>$28.00</td>
                                        </tr>
                                        <tr>
                                            <td>Total</td>
                                            <td>$506.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="form-group">
                                    <button className="site-button" type="button">Proceed to Checkout</button>
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

export default Cart