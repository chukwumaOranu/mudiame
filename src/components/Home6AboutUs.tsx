const Home6AboutUs = () => {
    return (
        <>


            <div className="col-lg-6 dz-inner-2">
                <div className="dzbooking-form style-1">
                    <div className="form-body">
                        <div className="form-head">
                            <h2>Book Now</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                        <form className="dlab-form dzForm" method="POST" action="script/contact_smtp.php">
                            <div className="dzFormMsg"></div>
                            <input type="hidden" className="form-control" name="dzToDo" value="Contact" />
                            <input type="hidden" className="form-control" name="reCaptchaEnable" value="0" />
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="input-group m-b20">
                                        <input name="dzName" type="text" className="form-control" placeholder="Name" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-group m-b20">
                                        <input name="dzPhoneNumber" type="text" className="form-control" placeholder="Mobile No." />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-group m-b20">
                                        <select className="form-control">
                                            <option>Services</option>
                                            <option>Crown and Bridge</option>
                                            <option>Teeth Whitening</option>
                                            <option>Veneers</option>
                                            <option>Invisalign</option>
                                            <option>Orthodontics</option>
                                            <option>Dentures</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-group m-b20">
                                        <input name="dzOther[date]" type="date" className="form-control cover-dt" placeholder="Date" />
                                        <div className="input-icon">
                                            <i className="fa fa-calendar"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-group m-b20">
                                        <input name="dzOther[time]" type="time" className="form-control cover-dt" placeholder="Time" />
                                        <div className="input-icon">
                                            <i className="fa fa-clock-o"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="input-group m-b20">
                                        <input name="dzEmail" type="email" className="form-control" required placeholder="Enter Email" />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="input-group m-b20">
                                        <textarea name="dzMessage" rows={4} className="form-control" required placeholder="Type Message"></textarea>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <button
                                        onSubmit={(e) => { e.preventDefault() }}
                                        name="submit" type="submit" value="Submit"
                                        className="btn site-button site-button-primary btn-block"
                                    >Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Home6AboutUs