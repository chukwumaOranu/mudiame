import { useState } from "react"
import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme";
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';




const gallery = [
    { img: IMAGE.galleryPic1, categery: 3 },
    { img: IMAGE.galleryPic3, categery: 2 },
    { img: IMAGE.galleryPic6, categery: 2 },
    { img: IMAGE.galleryPic4, categery: 4 },
    { img: IMAGE.galleryPic5, categery: 4 },
    { img: IMAGE.galleryPic2, categery: 6 },
]
const Home4Portfolio = () => {
    const [addActive, setActive] = useState(1);
    const [images, setImages] = useState(gallery)

    function galleryButton(id: number) {
        setActive(id);
        const updateItem = gallery.filter((ell) => {
            return ell.categery === id
        });
        setImages(updateItem)
    }
    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="site-filters style1 clearfix center">
                        <ul className="filters" data-toggle="buttons">
                            <li
                                onClick={() => { galleryButton(1); setImages(gallery) }}
                                className={`btn ${addActive === 1 ? 'active' : ''}`}
                            ><Link to="#"><span>All</span></Link></li>
                            <li
                                onClick={() => { galleryButton(2) }}
                                className={`btn ${addActive === 2 ? 'active' : ''}`}
                            ><Link to="#"><span>Massage</span></Link></li>
                            <li
                                onClick={() => { galleryButton(3) }}
                                className={`btn ${addActive === 3 ? 'active' : ''}`}
                            ><Link to="#"><span>Aroma</span></Link></li>
                            <li
                                onClick={() => { galleryButton(4) }}
                                className={`btn ${addActive === 4 ? 'active' : ''}`}
                            ><Link to="#"><span>Salt & Aroma</span></Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="clearfix">
                <ul id="masonry" className="masonry_container">
                    <LightGallery
                        // onInit={onInit}
                        speed={500}
                        plugins={[lgThumbnail, lgZoom]}
                    >
                        {images.map((item, ind) => (
                            <Link to={item.img} key={ind}>
                                <li className={`aroma card-container`}>
                                    <div className="dlab-box">
                                        <div className="dlab-media">
                                            <img className="m-t20" src={item.img} alt="" />
                                            <div className="overlay-bx">
                                                <div className="spa-port-bx m-t10" >
                                                    <div>
                                                        <h4>Salt Scrub Massage</h4>
                                                        <p>Lorem Ipsum is simply dummy text of the printing</p>
                                                        <span className="icon-bx-xs check-km" title="Light Gallery Grid 1">
                                                            <i className="ti-fullscreen"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </LightGallery>
                </ul>
            </div>
        </>
    )
}

export default Home4Portfolio