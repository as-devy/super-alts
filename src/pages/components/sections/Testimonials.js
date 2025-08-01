function Testimonials() {
    const testimonials = [
        {
            content: `افضل متجر تعاملت معاه من ان بديت اشتري من 
الانترنيت سريع جدا في تسليم ودعم فني ممتاز
انصح كل واحد يشتري من متجر`,
            author: "- محمد بن زايد"
        },
        {
            content: `افضل متجر تعاملت معاه من ان بديت اشتري من 
الانترنيت سريع جدا في تسليم ودعم فني ممتاز
انصح كل واحد يشتري من متجر`,
            author: "- محمد بن زايد"
        },
        {
            content: `افضل متجر تعاملت معاه من ان بديت اشتري من 
الانترنيت سريع جدا في تسليم ودعم فني ممتاز
انصح كل واحد يشتري من متجر`,
            author: "- محمد بن زايد"
        },
        {
            content: `افضل متجر تعاملت معاه من ان بديت اشتري من 
الانترنيت سريع جدا في تسليم ودعم فني ممتاز
انصح كل واحد يشتري من متجر`,
            author: "- محمد بن زايد"
        },
        {
            content: `افضل متجر تعاملت معاه من ان بديت اشتري من 
الانترنيت سريع جدا في تسليم ودعم فني ممتاز
انصح كل واحد يشتري من متجر`,
            author: "- محمد بن زايد"
        },
    ];

    const repeatedtestimonials = Array(10).fill(testimonials).flat();

    return (
        <section className="testimonials">
            <div className="container-fluid" style={{ padding: '0' }}>
                <div className="header-text head-img">
                    <img src="/assets/testimonials-header.png" alt="products-header" className="img-fluid" />
                </div>
                <div className="marquee-wrapper">
                    <div className="marquee-content d-flex flex-wrap justify-content-center gap-3">
                        {repeatedtestimonials.map((testimonial, i) => (
                            <div className="testimonial d-flex flex-column align-items-center" key={i} style={{ minWidth: '100px' }}>
                                <img src="/assets/testimonial-box.png" alt="testimonial-wrapper" className="wrapper-img mb-2" />
                                <img src="/assets/stars-icon.png" alt="stars-icons" className="stars-icon mb-2" />
                                <p className="txt content">{testimonial.content}</p>
                                <p className="txt author">{testimonial.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials