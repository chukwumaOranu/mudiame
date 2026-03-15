import { Link } from "react-router-dom"


interface Propsfile {
    image: string
    title: string
}
const CommonBanner = (props: Propsfile) => {
    const IMG = props.image
    return (
        <>
            <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: `url(${IMG})` }}>
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

export default CommonBanner