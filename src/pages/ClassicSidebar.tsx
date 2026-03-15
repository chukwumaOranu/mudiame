import { Link } from "react-router-dom"
import SidebarLeftContent from "../components/SidebarLeftContent"
import SidebarRightContent from "../components/SidebarRightContent"
import { IMAGE } from "../constent/theme"

const ClassicSidebar = () => {
    return (
        <>
            <div className="page-content bg-white">
                <div className="dlab-bnr-inr dlab-bnr-inr overlay-primary bg-pt" style={{ backgroundImage: `url(${IMAGE.banner1})` }}>
                    <div className="container">
                        <div className="dlab-bnr-inr-entry">
                            <h1 className="text-white">Blog Classic Sidebar</h1>
                            <div className="breadcrumb-row">
                                <ul className="list-inline">
                                    <li><Link to="/">Home</Link></li>
                                    <li>Blog Classic Sidebar</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-area">
                    <div className="container">
                        <div className="row">
                            <SidebarLeftContent />
                            <SidebarRightContent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClassicSidebar