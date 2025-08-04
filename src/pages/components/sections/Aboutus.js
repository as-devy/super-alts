const Aboutus = () => {
    return (
        <section className="about-us" id="about-us">
            <div className="container-fluid">
                <div className="row align-items-center justify-content-center flex-column-reverse flex-md-row">
                    <div className="col-12 col-md-6 text-content mb-4 mb-md-0">
                        {/* <div className="skew-text">
                            <div className="star-icon">
                                <img src="/assets/star.png" alt="star" />
                            </div>
                            <span>من نحــــــــــــــــــــــــــن؟</span>
                        </div> */}
                        <div className="head-img mb-4">
                            <img src="/assets/about-header.png" alt="about-header" className="img-fluid" />
                        </div>
                        <h1>جميع الخدمات البرمجية الاحترافية في <b className="gradient-text">مكان واحد</b></h1>
                        <p>
                            <b className="gradient-text">سوبر التس</b> موقع متخصص في بيع بوتات الديسكورد
                            تخدم سيرفرك وتسهّل عليك المهام أنظمة جاهزة، توفر
                            عليك الوقت والجهد.
                        </p>
                    </div>
                    <div className="col-12 col-md-4 d-flex justify-content-center">
                        <img src="/assets/discord-bot.png" alt="discord-Bot" className="hero-img img-fluid" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Aboutus