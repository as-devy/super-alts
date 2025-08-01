function Footer() {
    return (
        <footer>
            <h1 className="header">كن <b className="gradient-text">الأفضل</b></h1>
            <section className="footer">
                <img src="/assets/footer-item.png" alt="footer-item" className="footer-img" />
                <div className="row">
                    <div className="col-12 col-xxl-4 col-md-4 ">
                        <div className="logo">
                            <img src="/assets/logo.png" />
                        </div>
                        <div className="content pdr-sm-0">
                            <p>اجعل تجربتك البرمجية افضل مع سوبر التس.</p>
                            <div className="social-links">
                                <a href="#">super_alts <i className="fa-brands fa-instagram"></i></a>
                                <a href="#">discord.gg/rar <i className="fa-brands fa-discord"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xxl-4 col-md-4 d-flex align-items-center links">
                        <div className="col-6 col-xxl-4 col-md-4 col-sm-6">
                            <ul>
                                <li><a href="#">اكتشف الأن</a></li>
                                <li><a href="#">الأسعار</a></li>
                                <li><a href="#">طرق الدفع</a></li>
                                <li><a href="#">التحديثات</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-xxl-4 col-md-4 col-sm-6">
                            <ul>
                                <li><a href="#">اكتشف الأن</a></li>
                                <li><a href="#">الأسعار</a></li>
                                <li><a href="#">طرق الدفع</a></li>
                                <li><a href="#">التحديثات</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center justify-content-between pdr-sm-0">
                    <div className="col-12 col-xxl-8 col-md-8 mb-4 mb-xxl-0 mb-md-0"><p>© جميع الحقوق محفوظة لدى سوبر التس</p></div>
                    <div className="col-12 col-xxl-4 col-md-4 d-flex justify-content-center gap-3 polices-links">
                        <div className="col-6 col-md-6">
                            <a href="#">سياسة الخصوصية</a>
                        </div>
                        <div className="col-6 col-md-6">
                            <a href="#">الشروط</a>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer