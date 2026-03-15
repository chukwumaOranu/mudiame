import { Link } from "react-router-dom"

interface propsFile {
    img: string
    title: string
}
const CommonBanner2 = (props: propsFile) => {
    return (
        <>
            <div className="dlab-bnr-inr dlab-bnr-inr overlay-primary bg-pt"
                style={{ backgroundImage: `url(${props.img})` }}>
                <div className="container">
                    <div className="dlab-bnr-inr-entry">
                        <h1 className="text-white">{props.title}</h1>
                        <div className="breadcrumb-row">
                            <ul className="list-inline">
                                <li><Link to="/">Home</Link></li>
                                <li>{props.title}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommonBanner2