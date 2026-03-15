import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"



interface fileProp {
    setOpen: (value: boolean) => void;
}


const ModalVideo = ({ setOpen }: fileProp) => {
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="video-bx">
                        <img src={IMAGE.aboutVideo} alt="" />
                        <div className="video-play-icon">
                            <Link to="#"
                                onClick={() => { setOpen(true) }}
                                className="popup-youtube video">
                                <i className="ti-control-play"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalVideo