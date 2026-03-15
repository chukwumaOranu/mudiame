import { useState } from "react"
import { Link } from "react-router-dom"






const tablist = [
    {
        name: 'Silver Light bride',
        name2: 'ultimate queen bride',
        name3: 'Golden kiss bride',
        navList: [
            { title: 'bridal makeup ', price: ' $25', title2: 'hd bride makeup' },
            { title: 'hair style ', price: '$35', title2: 'hair styling ' },
            { title: 'saree draping ', price: '$152', title2: 'faux lash ' },
            { title: 'bridal makeup ', price: ' $25', title2: 'brow design ' },
            { title: 'hair style ', price: '$35', title2: 'bridal dressing' },
            { title: 'saree draping ', price: '$152', title2: 'hair styling ' },
        ]
    },
    {
        name: 'Golden kiss bride',
        name2: 'platinum perfect bride',
        name3: 'Silver Light bride',
        navList: [
            { title: 'hd bride makeup ', price: '$125', title2: 'bridal makeup ' },
            { title: 'hair styling ', price: '$300', title2: 'hair style' },
            { title: 'faux lash ', price: '$1000', title2: 'saree draping' },
            { title: 'brow design ', price: '$200', title2: 'bridal makeup' },
            { title: 'bridal dressing ', price: '$235', title2: 'hair style' },
            { title: 'hair styling', price: '$358', title2: 'saree draping' },
        ]
    },
]

const Home5Pricind = () => {


    const [tabs, setTabs] = useState(1);
    const navigateButton = (id: number) => {
        setTabs(id)
    }
    return (
        <>
            <ul className="nav nav-tabs">
                <li
                    onClick={() => { navigateButton(1) }}
                    className="nav-item"
                ><Link className={`nav-link ${tabs === 1 ? 'active' : ''}`} to="#">Bridal makeup</Link>
                </li>
                <li
                    onClick={() => { navigateButton(2) }}
                    className="nav-item"
                ><Link className={`nav-link ${tabs === 2 ? 'active' : ''}`} to="#">Birthday makeup</Link>
                </li>
                <li
                    onClick={() => { navigateButton(3) }}
                    className="nav-item"
                ><Link className={`nav-link ${tabs === 3 ? 'active' : ''}`} to="#">Party Mackup</Link>
                </li>
            </ul>

            <div className="tab-content bridal-price-bx">
                <div id="home" className={`tab-pane ${tabs === 1 ? 'active' : ""}`}><br />
                    <div className="row">
                        {tablist.map((item, ind) => (
                            <div className="col-lg-6 col-md-6" key={ind}>
                                <h3 className="dlab-title">{item.name}</h3>
                                <ul>
                                    {item.navList.map((item, ind) => (
                                        <li key={ind}>
                                            <span className="service-name">{item.title}</span>
                                            <span className="service-blank"></span>
                                            <span className="service-price">{item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        ))}
                    </div>
                </div>
                <div id="home" className={`tab-pane ${tabs === 2 ? 'active' : ""}`}><br />
                    <div className="row">
                        {tablist.map((item, ind) => (
                            <div className="col-lg-6 col-md-6" key={ind}>
                                <h3 className="dlab-title">{item.name2}</h3>
                                <ul>
                                    {item.navList.map((item, ind) => (
                                        <li key={ind}>
                                            <span className="service-name">{item.title2}</span>
                                            <span className="service-blank"></span>
                                            <span className="service-price">{item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        ))}

                    </div>
                </div>
                <div id="home" className={`tab-pane ${tabs === 3 ? 'active' : ""}`}><br />
                    <div className="row">
                        {tablist.map((item, ind) => (
                            <div className="col-lg-6 col-md-6" key={ind}>
                                <h3 className="dlab-title">{item.name3}</h3>
                                <ul>
                                    {item.navList.map((item, ind) => (
                                        <li key={ind}>
                                            <span className="service-name">{item.title2}</span>
                                            <span className="service-blank"></span>
                                            <span className="service-price">{item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home5Pricind