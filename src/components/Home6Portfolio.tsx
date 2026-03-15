import { useState } from "react"
import { IMAGE } from "../constent/theme"
import NaillImgTab1 from "../element/NaillImgTab1"
import NaillImgTab4 from "../element/NaillImgTab4"
import NaillImgTab3 from "../element/NaillImgTab3"
import NaillImgTab2 from "../element/NaillImgTab2"
import NaillImgTab5 from "../element/NaillImgTab5"
import NaillImgTab6 from "../element/NaillImgTab6"
import NaillImgTab10 from "../element/NaillImgTab10"
import NaillImgTab9 from "../element/NaillImgTab9"
import NaillImgTab8 from "../element/NaillImgTab8"
import NaillImgTab7 from "../element/NaillImgTab7"






const nailImg = [
    { name: 'Decals', img: IMAGE.nailPic1 },
    { name: 'Gems Glitter', img: IMAGE.nailPic2 },
    { name: 'Plain Color', img: IMAGE.nailPic3 },
    { name: 'Text Color', img: IMAGE.nailPic4 },
    { name: 'Gradients', img: IMAGE.nailPic5 },
    { name: 'Gradients', img: IMAGE.nailPic6 },
    { name: 'Deco Glitter', img: IMAGE.nailPic7 },
    { name: 'Gems Art', img: IMAGE.nailPic8 },
    { name: 'Plain Mix', img: IMAGE.nailPic9 },
    { name: 'Shiny Glitter', img: IMAGE.nailPic10 },
]

const Home6Portfolio = () => {

    const [nailImgActive, setNailImgActive] = useState(0)

    function nailImgButton(id: number) {
        setNailImgActive(id)
    }
    return (
        <>
            <div className="row nail-tab-wrapper">
                <div className="col-lg-5 col-md-8 col-sm-9">
                    {nailImgActive === 0 && <NaillImgTab1 />}
                    {nailImgActive === 1 && <NaillImgTab2 />}
                    {nailImgActive === 2 && <NaillImgTab3 />}
                    {nailImgActive === 3 && <NaillImgTab4 />}
                    {nailImgActive === 4 && <NaillImgTab5 />}
                    {nailImgActive === 5 && <NaillImgTab6 />}
                    {nailImgActive === 6 && <NaillImgTab7 />}
                    {nailImgActive === 7 && <NaillImgTab8 />}
                    {nailImgActive === 8 && <NaillImgTab9 />}
                    {nailImgActive === 9 && <NaillImgTab10 />}
                </div>
                <div className="col-lg-7">
                    <ul className="nav nav-tabs nail-tabs" id="myTabNails">
                        {nailImg.map((item, ind) => (
                            <li className="nav-item" key={ind}>
                                <button
                                    onClick={() => { nailImgButton(ind) }}
                                    className={`nav-link ${nailImgActive === ind ? 'active' : ''}`} id="nailTab1" type="button"
                                >
                                    <img src={item.img} alt="" />
                                    <span className="title">{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Home6Portfolio