const Hero = () => {
    return (
        <main className="hero">
            <div className="container-fluid">
                <div className="row align-items-center justify-content-center flex-column-reverse flex-md-row">
                    <div className="col-12 col-md-6 text-content mb-4 mb-md-0">
                        <div className="head-img">
                            <img src="/assets/hero-header.png" alt="hero-header" className="img-fluid" />
                        </div>
                        <div className="txt mb-3">
                            <h1>افضل البوتــــــــــــــــات</h1>
                            <h1>في <b className="gradient-text">سوبر الــــــــــــــــــــت</b></h1>
                            <h1>بافضل سعــــــــــــــــــــر</h1>
                        </div>
                        <p>جميع بوتات الديسكورد بافضل جودة في مكان واحد</p>
                    </div>
                    <div className="col-12 col-md-4 d-flex justify-content-center">
                        <img src="/assets/hero-tv.png" alt="hero-TV" className="hero-img img-fluid" />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Hero