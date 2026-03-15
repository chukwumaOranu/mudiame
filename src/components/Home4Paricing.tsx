import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"




const priceList = [
    {
        list: [
            { img: IMAGE.gallery_thumbPic1, title: 'Pregnancy Massage', price: '$15.00' },
            { img: IMAGE.gallery_thumbPic2, title: 'Reflexology Massage', price: '$22.00' },
            { img: IMAGE.gallery_thumbPic3, title: 'Pregnancy Massage', price: '$35.00' },
        ]
    }, {
        list: [
            { img: IMAGE.gallery_thumbPic5, title: 'Pregnancy Massage', price: '$15.00' },
            { img: IMAGE.gallery_thumbPic6, title: 'Reflexology Massage', price: '$22.00' },
            { img: IMAGE.gallery_thumbPic7, title: 'Pregnancy Massage', price: '$35.00' },
        ]
    }
]

const Home4Paricing = () => {
    return (
        <>
            <div className="row">
                {priceList.map((item, ind) => (
                    <div className="col-lg-6 col-md-12 col-sm-12" key={ind}>
                        <ul className="spa-price-tbl">
                            {item.list.map((data, index) => (
                                <li key={index}>
                                    <div className="spa-price-thumb">
                                        <img src={data.img} alt="" />
                                    </div>
                                    <div className="spa-price-content">
                                        <h4><Link to="/booking">{data.title}</Link>
                                            <span className="spa-price ml-auto text-primary">{data.price}</span></h4>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home4Paricing