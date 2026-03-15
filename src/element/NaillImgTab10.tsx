import { useRef, useState } from "react"
import { IMAGE } from "../constent/theme"




const nailSmall = [
    { img: IMAGE.nailPic10 },
    { img: IMAGE.nailPic10 },
    { img: IMAGE.nailPic10 },
    { img: IMAGE.nailPic10 },
    { img: IMAGE.nailPic10 },
];
const nailLarge = [IMAGE.nailLargePic10, IMAGE.nailLargePic10, IMAGE.nailLargePic10, IMAGE.nailLargePic10, IMAGE.nailLargePic10,]


const NaillImgTab10 = () => {
    const [addActive, setActive] = useState(0);
    const imgRef = useRef<HTMLImageElement | null>(null)


    const imgSelectButton = (index: number) => {
        setActive(index);
        imgRef.current?.setAttribute('style', 'opacity:0');
        setTimeout(() => {
            imgRef.current?.setAttribute('style', 'opacity:1');
        }, 100)
        imgRef.current?.setAttribute('src', nailLarge[index])
    }

    return (
        <div className="tab-content" id="myTabContentNails">
            <div className="tab-pane fade show active" id="nailTabTaget1" role="tabpanel" aria-labelledby="nailTab1">
                <div className="inner-nail-tab-wraper">
                    <div className="tab-content" id="myTabContentInnerNails1">
                        <div className="tab-pane fade show active" id="nailTabInner1">
                            <div className="nail-info">
                                <h6 className="title">Shiny Glitter<span className="text-primary">₹ 199</span></h6>
                                <img ref={imgRef} src={IMAGE.nailLargePic10} alt="" />
                            </div>
                        </div>
                    </div>
                    <ul className="nav nav-tabs inner-nail-tabs" id="myTabInnerNails1">
                        {nailSmall.map((item, ind) => (
                            <li className="nav-item" key={ind}>
                                <button
                                    onClick={() => { imgSelectButton(ind) }}
                                    className={`nav-link ${addActive === ind ? 'active' : ''}`}
                                >
                                    <img src={item.img} alt="" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NaillImgTab10