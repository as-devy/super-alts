import { useState, useEffect } from "react";

function Testimonials() {
    const [testimonials, setTestimonials] = useState([])

    useEffect(() => {
        async function fetchTestimonials() {
            const res = await fetch('/api/testimonials/testimonials', {
                credentials: 'include'
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to fetch testimonials');
            }

            const data = await res.json();
            setTestimonials(data);
        }

        fetchTestimonials();
    }, []);

    const repeatedtestimonials = Array(10).fill(testimonials).flat();

    return (
        <section className="testimonials" id="testimonials">
            <div className="container-fluid" style={{ padding: '0' }}>
                <div className="header-text head-img">
                    <img src="/assets/testimonials-header.png" alt="products-header" className="img-fluid" />
                </div>
                <div className="marquee-wrapper">
                    <div className="marquee-content d-flex flex-wrap justify-content-center gap-3">
                        {repeatedtestimonials.map((testimonial, i) => (
                            <div className="testimonial d-flex flex-column align-items-center" key={i} style={{ minWidth: '100px' }}>
                                <img src="/assets/testimonial-box.png" alt="testimonial-wrapper" className="wrapper-img mb-2" />
                                <div className="stars-icon mb-2">
                                    {[...Array(testimonial.stars)].map((_, index) => (
                                        <img
                                            key={index}
                                            src="/assets/stars-icon.png"
                                            alt="stars-icon"
                                        />
                                    ))}
                                </div>

                                <p className="txt content">{testimonial.feedback}</p>
                                <p className="txt author">{testimonial.username}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials