import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"





const TableList = [
    { title: 'Size', text: 'Small, Medium & Large' },
    { title: 'Color', text: 'Pink & White' },
    { title: 'Rating', text: <span className="rating-bx"> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star-o"></i> <i className="fa fa-star-o"></i> </span> },
    { title: 'Waist', text: '26 cm' },
    { title: 'Length', text: '40 cm' },
    { title: 'Chest', text: '33 inches' },
    { title: 'Fabric', text: 'Cotton, Silk & Synthetic' },
    { title: 'Warranty', text: '3 Months' },
    { title: 'Chest', text: '33 inches' },
]

const review = [
    {
        img: IMAGE.testymonial, reting: <>
            <i className="fa fa-star m-l5" title="regular"></i>
            <i className="fa fa-star m-l5" title="regular"></i>
            <i className={`fa fa-star-o m-l5`} title="regular"></i>
            <i className="fa fa-star-o m-l5" title="regular"></i>
            <i className="fa fa-star-o m-l5" title="regular"></i>
        </>
    },
    {
        img: IMAGE.testymonial2, reting: <>
            <i className="fa fa-star m-l5" title="regular"></i>
            <i className="fa fa-star m-l5" title="regular"></i>
            <i className={`fa fa-star m-l5`} title="regular"></i>
            <i className="fa fa-star-o m-l5" title="regular"></i>
            <i className="fa fa-star-o m-l5" title="regular"></i>
        </>
    },
    {
        img: IMAGE.testymonial3, reting: <>
            <i className="fa fa-star m-l5" title="regular"></i>
            <i className="fa fa-star m-l5" title="regular"></i>
            <i className={`fa fa-star m-l5`} title="regular"></i>
            <i className="fa fa-star m-l5" title="regular"></i>
            <i className="fa fa-star-o m-l5" title="regular"></i>
        </>
    },
]
const ProductContent = () => {

    const [addActive, setActive] = useState(1);

    function TabsBtn(tab: number) {
        setActive(tab)
    }

    useEffect(() => {
        const stars = document.querySelectorAll('#stars li i');
        stars.forEach((ell, ind) => {
            ell.addEventListener("click", function () {
                for (let x = 0; x < stars.length; x++) {
                    stars[x].classList.remove('select')
                }
                for (let i = 0; i < ind + 1; i++) {
                    stars[i].classList.add('select')
                }
            });
        }, [])
    })

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="dlab-tabs product-description tabs-site-button">
                        <ul className="nav nav-tabs ">
                            <li onClick={() => { TabsBtn(1) }}><Link to={'#'} className={`${addActive === 1 ? "active show" : ""}`}><i className="fa fa-globe"></i> Description</Link></li>
                            <li onClick={() => { TabsBtn(2) }}><Link to={'#'} className={`${addActive === 2 ? "active show" : ""}`}><i className="fa fa-photo"></i> Additional Information</Link></li>
                            <li onClick={() => { TabsBtn(3) }}><Link to={'#'} className={`${addActive === 3 ? "active show" : ""}`}><i className="fa fa-cog"></i> Product Review</Link></li>
                        </ul>
                        <div className="tab-content">
                            <div id="web-design-1" className={`tab-pane ${addActive === 1 ? "active" : ''}`}>
                                <p className="m-b10">Suspendisse et justo. Praesent mattis commyolk augue Aliquam ornare hendrerit augue Cras tellus In pulvinar lectus a est Curabitur eget orci Cras laoreet. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis  commyolk augue aliquam ornare augue.</p>
                                <p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences</p>
                                <ul className="list-check primary">
                                    <li>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and </li>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </li>
                                </ul>
                            </div>
                            <div id="graphic-design-1" className={`tab-pane ${addActive === 2 ? "active" : ''}`}>
                                <table className="table table-bordered" >
                                    {TableList.map((item, index) => (
                                        <tr key={index}>
                                            <th>{item.title}</th>
                                            <th>{item.text}</th>
                                        </tr>
                                    ))}

                                </table>
                            </div>
                            <div id="developement-1" className={`tab-pane ${addActive === 3 ? "active" : ''}`}>
                                <div id="comments">
                                    <ol className="commentlist">
                                        {review.map((item, ind) => (
                                            <li className="comment" key={ind}>
                                                <div className="comment_container">
                                                    <img className="avatar avatar-60 photo" src={item.img} alt="" />
                                                    <div className="comment-text">
                                                        <div className="star-rating">
                                                            <div data-rating='3'>
                                                                {item.reting}
                                                            </div>
                                                        </div>
                                                        <p className="meta"> <strong className="author">Cobus Bester</strong> <span><i className="fa fa-clock-o"></i> March 7, 2013</span> </p>
                                                        <div className="description">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                                <div id="review_form_wrapper">
                                    <div id="review_form">
                                        <div id="respond" className="comment-respond">
                                            <h3 className="comment-reply-title" id="reply-title">Add a review</h3>
                                            <form className="comment-form" method="post" >
                                                <div className="comment-form-author">
                                                    <label>Name <span className="required">*</span></label>
                                                    <input type="text" aria-required="true" size={30} value="" name="author" id="author" />
                                                </div>
                                                <div className="comment-form-email">
                                                    <label>Email <span className="required">*</span></label>
                                                    <input type="text" aria-required="true" size={30} value="" name="email" id="email" />
                                                </div>
                                                <div className="comment-form-rating">
                                                    <label className="pull-left m-r20">Your Rating</label>
                                                    <div className='rating-widget'>
                                                        <div className='rating-stars'>
                                                            <ul id='stars' className="d-flex">
                                                                <li className='star' title='Poor' data-value='1'>
                                                                    <i className='fa fa-star fa-fw m'></i>
                                                                </li>
                                                                <li className='star' title='Fair' data-value='2'>
                                                                    <i className='fa fa-star fa-fw m'></i>
                                                                </li>
                                                                <li className='star' title='Good' data-value='3'>
                                                                    <i className='fa fa-star fa-fw m'></i>
                                                                </li>
                                                                <li className='star' title='Excellent' data-value='4'>
                                                                    <i className='fa fa-star fa-fw m'></i>
                                                                </li>
                                                                <li className='star' title='WOW!!!' data-value='5'>
                                                                    <i className='fa fa-star fa-fw m'></i>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="comment-form-comment">
                                                    <label>Your Review</label>
                                                    <textarea aria-required="true" rows={8} cols={45} name="comment" id="comment"></textarea>
                                                </div>
                                                <div className="form-submit">
                                                    <input type="button" value={'Submit'} className="site-button" id="submit" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductContent