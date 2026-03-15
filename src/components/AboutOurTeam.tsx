import { IMAGE } from "../constent/theme"

const ourTeam = [
    { img: IMAGE.our_teamePic1, name: 'Ann Smith' },
    { img: IMAGE.our_teamePic2, name: 'Mary Lucas' },
    { img: IMAGE.our_teamePic3, name: 'Jennifer' },
    { img: IMAGE.our_teamePic4, name: 'Candice Marshall' },
]

const AboutOurTeam = () => {
    return (
        <>

            <div className="row">
                {ourTeam.map((item, index) => (
                    <div className="col-lg-3 col-md-6 col-sm-6 m-b30" key={index}>
                        <div className="service-box text-center">
                            <div className="service-images m-b15">
                                <img src={item.img} alt="" />
                            </div>
                            <div className="service-content">
                                <h6 className="text-uppercase text-primary">Ann Smith</h6>
                                <p className="m-b0">It is a long established fact that a reader will be distracted by the readable content of a page.</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}



export default AboutOurTeam