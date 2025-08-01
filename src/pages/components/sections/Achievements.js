const Achievements = () => {
    return (
        <section className="achives">
            <div className="container-fluid">
                <div className="header-text head-img">
                    <img src="/assets/achives-header.png" alt="achives-header" className="img-fluid" />
                </div>
                <div className="row align-items-center justify-content-center g-3">
                    <div className="col-12 col-md-4 col-xxl-2 d-flex justify-content-center">
                        <div className="achive-box text-center">
                            <img src="/assets/achive-box.png" alt="achive-wrapper" className="wrapper-img img-fluid mb-2" />
                            <h1 className="rating">4.8</h1>
                            <p className="subtitle">تقييمات الزبائن</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-xxl-2 d-flex justify-content-center">
                        <div className="achive-box text-center">
                            <img src="/assets/achive-box.png" alt="achive-wrapper" className="wrapper-img img-fluid mb-2" />
                            <h1 className="rating">+1000</h1>
                            <p className="subtitle">عدد طلبات</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-xxl-2 d-flex justify-content-center">
                        <div className="achive-box text-center">
                            <img src="/assets/achive-box.png" alt="achive-wrapper" className="wrapper-img img-fluid mb-2" />
                            <h1 className="rating">+100</h1>
                            <p className="subtitle">عدد منتجات</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Achievements