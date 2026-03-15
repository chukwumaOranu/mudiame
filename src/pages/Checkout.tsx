import { useState } from "react"
import { IMAGE } from "../constent/theme"
import CommonBanner2 from "../element/CommonBanner2"
import { Collapse, Dropdown } from "react-bootstrap"
import { ShopColumnDescription } from "./ShopColumn"





const orderProduct = [
    { img: IMAGE.product_thumbItem1, productItem: 'Prduct Item 3', price: 28 },
    { img: IMAGE.product_thumbItem2, productItem: 'Prduct Item 4', price: 36 },
    { img: IMAGE.product_thumbItem3, productItem: 'Prduct Item 5', price: 28 },
    { img: IMAGE.product_thumbItem4, productItem: 'Prduct Item 2', price: 36 },
    { img: IMAGE.product_thumbItem3, productItem: 'Prduct Item 1', price: 28 },

]
const Checkout = () => {

    const [formSelect, setFormSelect] = useState('Åland Islands');
    const [select, setSelect] = useState('Credit Card Type')
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="page-content bg-white">
                <CommonBanner2 title={'Checkout'} img={IMAGE.banner1} />
                <div className="section-full content-inner">
                    <div className="container">
                        <div>
                            <form className="shop-form row">
                                <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                    <h4>Billing & Shipping Address</h4>
                                    <div className="form-group">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" className="dropdown-basic booking-options booking-option-2" style={{ gap: '70%' }}>
                                                {formSelect}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => { setFormSelect('Åland Islands') }}>Credit Card Type</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Afghanistan') }}>Another option</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Albania') }}>A option</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Algeria') }}>Potato</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Andorra') }}>Potato</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Angola') }}>Potato</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Anguilla') }}>Potato</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Antarctica') }}>Potato</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Antigua and Barbuda') }}>Potato</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Argentina') }}>Potato</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Armenia') }}>Potato</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Aruba') }}>Potato</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setFormSelect('Australia') }}>Potato</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-lg-6">
                                            <input type="text" className="form-control" placeholder="First Name" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <input type="text" className="form-control" placeholder="Last Name" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Company Name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Address" />
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-lg-6">
                                            <input type="text" className="form-control" placeholder="Apartment, suite, unit etc." />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <input type="text" className="form-control" placeholder="Town / City" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-lg-6">
                                            <input type="text" className="form-control" placeholder="State / County" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <input type="text" className="form-control" placeholder="Postcode / Zip" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-lg-6">
                                            <input type="email" className="form-control" placeholder="Email" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <input type="text" className="form-control" placeholder="Phone" />
                                        </div>
                                    </div>
                                    <h6>
                                        <button
                                            onClick={() => setShow(!show)}
                                            aria-controls="example-collapse-text"
                                            aria-expanded={show}
                                            className="site-button-link" type="button">Create an account <i className="fa fa-arrow-circle-o-down"></i></button></h6>
                                    <Collapse in={show}>
                                        <div id="create-an-account">
                                            <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Password" />
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                    <h4 className="font-weight-600">
                                        <button
                                            onClick={() => setOpen(!open)}
                                            aria-controls="example-collapse-text"
                                            aria-expanded={open}
                                            className="site-button-link " type="button" data-toggle="collapse" data-target="#different-address">Ship to a different address <i className="fa fa-arrow-circle-o-down"></i></button></h4>


                                    <Collapse
                                        in={open}
                                    >
                                        <div id="example-collapse-text">
                                            <div id="different-address">
                                                <p>If you have shopped with us before, please enter your details in the boxes below. If you are a new customer please proceed to the Billing & Shipping section.</p>
                                                <div className="form-group">
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="" className="dropdown-basic">
                                                            {select}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item onClick={() => { setSelect('Åland Islands') }}>Credit Card Type</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { setSelect('Afghanistan') }}>Another option</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { setSelect('Albania') }}>A option</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { setSelect('Algeria') }}>Potato</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { setSelect('Andorra') }}>Potato</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { setSelect('Angola') }}>Potato</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { setSelect('Anguilla') }}>Potato</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { setSelect('Antarctica') }}>Potato</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { setSelect('Antigua and Barbuda') }}>Potato</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { setSelect('Argentina') }}>Potato</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { setSelect('Armenia') }}>Potato</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { setSelect('Aruba') }}>Potato</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => { setSelect('Australia') }}>Potato</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-lg-6">
                                                        <input type="text" className="form-control" placeholder="First Name" />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <input type="text" className="form-control" placeholder="Last Name" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Company Name" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Address" />
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-lg-6">
                                                        <input type="text" className="form-control" placeholder="Apartment, suite, unit etc." />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <input type="text" className="form-control" placeholder="Town / City" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-lg-6">
                                                        <input type="text" className="form-control" placeholder="State / County" />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <input type="text" className="form-control" placeholder="Postcode / Zip" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-lg-6">
                                                        <input type="email" className="form-control" placeholder="Email" />
                                                    </div>
                                                    <div className="form-group col-lg-6">
                                                        <input type="text" className="form-control" placeholder="Phone" />
                                                    </div>
                                                </div>
                                                <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                                            </div>

                                        </div>
                                    </Collapse>
                                    <div className="form-group">
                                        <textarea className="form-control" placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="dlab-divider bg-gray-dark text-gray-dark icon-center">
                            <i className="fa fa-circle bg-white text-gray-dark"></i>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <h4>Your Order</h4>
                                <table className="table-bordered check-tbl">
                                    <thead className="text-center">
                                        <tr>
                                            <th>IMAGE</th>
                                            <th>PRODUCT NAME</th>
                                            <th>TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderProduct.map((item, index) => (
                                            <tr key={index}>
                                                <td><img src={item.img} alt="" /></td>
                                                <td>{item.productItem}</td>
                                                <td className="product-price">${item.price}.00</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <form className="shop-form">
                                    <h4>Order Total</h4>
                                    <table className="table-bordered check-tbl">
                                        <tbody>
                                            <tr>
                                                <td>Order Subtotal</td>
                                                <td className="product-price">$125.96</td>
                                            </tr>
                                            <tr>
                                                <td>Shipping</td>
                                                <td>Free Shipping</td>
                                            </tr>
                                            <tr>
                                                <td>Coupon</td>
                                                <td className="product-price">$28.00</td>
                                            </tr>
                                            <tr>
                                                <td>Total</td>
                                                <td className="product-price-total">$506.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h5>Payment Method</h5>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Name on Card" />
                                    </div>
                                    <div className="form-group">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" className="dropdown-basic">
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
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Credit Card Number" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Card Verification Number" />
                                    </div>
                                    <div className="form-group">
                                        <button className="site-button button-lg btn-block" type="button">Place Order Now </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
                <ShopColumnDescription />
            </div >
        </>
    )
}

export default Checkout