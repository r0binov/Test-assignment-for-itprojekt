export const Footer = () : JSX.Element => {
    return(
        <div>
            <footer
                className="text-center text-lg-start text-white"
                style={{backgroundColor: "#212529", paddingTop: 5}}
            >
                <section>
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">Kleidipood</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{width: 60, backgroundColor: "#7c4dff", height: 2}}
                                />
                                <p>
                                    We sell the same dress, but with different names :D
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold">Contact</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{width: 60, backgroundColor: "#7c4dff", height: 2}}
                                    />
                                <p><i className="fas fa-home mr-3"></i> Robin Päll</p>
                                <p><i className="fas fa-envelope mr-3"></i> robinpall91@gmail.com</p>
                                <p><i className="fas fa-phone mr-3"></i>+372 5105723</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div
                    className="text-center p-3"
                    style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                >
                    © 2022 Copyright:
                    <a className="text-white">Robin Päll</a>
                </div>
            </footer>
        </div>
    )
}