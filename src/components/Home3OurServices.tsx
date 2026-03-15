import { useState } from "react"
import { IMAGE } from "../constent/theme"
import { Link } from "react-router-dom"


const ourServices = [
    { img: IMAGE.ourservicesPic1, title: 'Great', text: 'Waxing' },
    { img: IMAGE.ourservicesPic2, title: 'Basic', text: 'Haircuts' },
    { img: IMAGE.ourservicesPic3, title: 'Gold', text: 'Highlights' },
]

const Home3OurServices = () => {


    const [addActive, setActive] = useState(1)
    return (
        <>

            <div className="row m-lr0">

                {ourServices.map((item, ind) => (
                    <div className="col-lg-4 col-md-4 col-sm-6 m-b30" key={ind}>
                        <div
                            onMouseEnter={() => { setActive(ind) }}
                            className={`icon-bx-wraper hair-service-bx text-center ${addActive === ind ? 'active' : ""}`}>
                            <div className="service-images m-b20">
                                <img src={item.img} alt="" />
                            </div>
                            <div className="icon-content">
                                <h6 className="dlab-tilte-sm">{item.title}</h6>
                                <h5 className="dlab-tilte">{item.text}</h5>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                <Link to="/booking" className="site-button white">Book Now</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home3OurServices