import { IMAGE } from "../constent/theme"
import CommonBanner from "../element/CommonBanner"
import LightBox1 from "../element/LightBox1"
import LightBox2 from "../element/LightBox2"




const LightGallery = () => {
    return (
        <>
            <div className="page-content bg-white">
                <CommonBanner title={'Light Box Gallery'} image={IMAGE.banner1} />
                <div className="content-block">
                    <LightBox1 />
                    <hr className="mt-0 mb-0" />
                    <LightBox2 />
                    <hr className="mt-0 mb-0" />
                </div>
            </div>
        </>
    )
}


export default LightGallery
