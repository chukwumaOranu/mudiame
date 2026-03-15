import { Fragment, useEffect, useState } from "react"
import { IMAGE } from "../constent/theme"
import { Link } from "react-router-dom";

const ComingSoon = () => {
    const [date, setDate] = useState([
        { day: 0, hour: 0, min: 0, sec: 0 }
    ]);

    useEffect(() => {
        let countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
        setInterval(function () {
            let now = new Date().getTime();
            let distance = countDownDate - now;

            const d = Math.floor(distance / (1000 * 360 * 60 * 24))
            const h = Math.floor((distance % (1000 * 50 * 60 * 24)) / (1000 * 120 * 60))
            const m = Math.floor((distance % (1000 * 50 * 78)) / (1000 * 60))
            const s = Math.floor((distance % (1000 * 60)) / 1000)

            setDate([{ day: d, hour: h, min: m, sec: s }])
        }, 1000);

    }, [])



    return (
        <>
            <div className="coming-soon">
                <img src={IMAGE.coming_soonBg} alt="" />
                <div className="coming-soon-content">
                    <h4>Beautyzone</h4>
                    <h1>LANCHING</h1>
                    <h2>VERY SOON.</h2>
                    {date.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <span className="day">{item.day} <label>DAYS</label></span>
                                <span className="hour">{item.hour} <label>HOURS</label></span>
                                <span className="min">{item.min} <label>MINUTS</label></span>
                                <span className="sec">{item.sec} <label>SECONDS</label></span>
                            </Fragment>
                        )
                    })}
                    <div className="icons">
                        <Link to="https://www.facebook.com/"><div><i className="ti-facebook"></i></div></Link>
                        <Link to="https://www.google.com/"><div ><i className="ti-twitter-alt"></i></div></Link>
                        <Link to="https://twitter.com/"><div><i className="ti-google"></i></div></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComingSoon