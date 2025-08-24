import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function Cart({ cart, setCart }) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [feePrice, setFeePrice] = useState(0);
    const [coupon, setCoupon] = useState(null);
    const [couponCode, setCouponCode] = useState(null);
    const [couponApplied, setCouponApplied] = useState(false)
    const [error, setError] = useState(null)

    const handleRemoveFormCart = (productCode) => {
        setCart(prev => prev.filter(item => item.productCode !== productCode));
    };

    useEffect(() => {
        if (cart.length === 0) {
            setTotalPrice(0);
            return;
        }

        // ✅ calculate subtotal correctly
        const baseTotal = cart.reduce((sum, product) => {
            const price =
                product.productSale && Number(product.productSale) < Number(product.productPrice)
                    ? Number(product.productSale)
                    : Number(product.productPrice);

            return sum + price;
        }, 0);

        // ✅ apply your formula
        const total = (baseTotal + 1) / 0.971;

        // ✅ update state
        setTotalPrice(Number(total.toFixed(2)));

        // ✅ calculate fee
        const fee = total - baseTotal;

        setFeePrice(Number(fee.toFixed(2)));
    }, [cart]);

    const handleSubmitCouponCode = (e) => {
        e.preventDefault()
        const fetchCoupon = async () => {
            try {
                const res = await fetch(`/api/getCoupon/${couponCode}`);
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }

                const data = await res.json();
                setCoupon(data);
                console.log("Fetched coupon:", data);

                // check directly with data
                if (data.minPrice && totalPrice < data.minPrice) {
                    setError(`يتطلب أستخدام القسيمة قيمة مشتريات بحد ادنى ${data.minPrice}$`);
                    return;
                } else {
                    setError(null);

                    let finalPrice = totalPrice;

                    if (data.discountTypeValue.includes("%")) {
                        // percentage discount
                        const percent = parseFloat(data.discountTypeValue.replace("%", ""));
                        finalPrice = totalPrice - (totalPrice * percent) / 100;
                    } else if (data.discountTypeValue.includes("$")) {
                        // fixed discount
                        const amount = parseFloat(data.discountTypeValue.replace("$", ""));
                        finalPrice = totalPrice - amount;
                    }

                    setTotalPrice(finalPrice.toFixed(2));
                    setCouponApplied(true)
                }
            } catch (err) {
                console.log("Coupon error:", err.message);
                setError("رمز قسيمة غير صالح أو منتهي الصلاحية.");
                setCoupon(null);
            }
        };


        if (couponCode !== "") {
            fetchCoupon();

        }
    }


    const handleZiinaPay = async () => {
        try {
            // 1. Fetch USD → AED exchange rate
            const rateRes = await fetch("https://open.er-api.com/v6/latest/USD");
            const rateData = await rateRes.json();
            const usdToAed = rateData?.rates?.AED;

            if (!usdToAed) {
                alert("Failed to fetch exchange rate");
                return;
            }

            // 2. Convert your total price from USD → AED
            const usdTotal = totalPrice;               // e.g. 50 (USD)
            const aedTotal = usdTotal * usdToAed;      // converted to AED
            const amountInFils = Math.round(aedTotal * 100); // Ziina expects fils

            // 3. Create the payment intent in AED
            const res = await fetch('/api/payment/ziina/create-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amountInFils,
                    currency_code: 'AED',
                    description: 'Order payment'
                })
            });

            const data = await res.json();

            // 4. Redirect user if success
            if (data.redirect_url) {
                const width = 600;
                const height = 800;
                window.open(
                    data.redirect_url,
                    '_blank',
                    `width=${width},height=${height},left=${(window.innerWidth - width) / 2 + window.screenX},top=${(window.innerHeight - height) / 2 + window.screenY}`
                );
            } else {
                alert('Failed to initiate Ziina payment');
            }
        } catch (err) {
            console.error(err);
            alert("Error while processing payment");
        }
    };


    return (
        <div className="cart-slider offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="cartDrawer">
            <div className="offcanvas-header d-flex justify-content-between">
                <h5 className="offcanvas-title">سلة التسوق</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
            </div>
            <div className="offcanvas-body d-flex flex-column justify-content-between">
                <div className="content">
                    {
                        cart.map((product, i) => (
                            <div key={i} className="product d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex gap-3">
                                    {product.productImage ? (
                                        <div className="product-img">
                                            <img src={product.productImage} alt="product-img" />
                                        </div>
                                    ) : <div className="icon"><i className="fa-solid fa-box-open fa-2x text-white-50"></i></div>
                                    }
                                    <div className="text d-flex flex-column justify-content-around">
                                        <strong>{product.productName}</strong>
                                        <p>السعر: <span className="price">{product.productPrice}$</span></p>
                                    </div>
                                </div>
                                <button className="delete-item btn btn-danger" onClick={() => handleRemoveFormCart(product.productCode)}><i className="fa-solid fa-trash"></i></button>
                            </div>
                        ))
                    }
                </div>
                <div className="total">
                    <h6 className='d-flex align-items-center gap-1 mb-2'>مجموع الضرايب: <span className="price" style={{ fontSize: "20px" }}>${feePrice}</span></h6>
                    <h6 className='d-flex align-items-center gap-1'>المجموع: <span className="price" style={{ fontSize: "20px" }}>${totalPrice}</span></h6>
                    <div className={`payment_btns ${cart.length < 1 && 'disbaled'}`}>
                        <form className={`d-flex justify-content-between align-items-center mt-3 mb-2 ${couponApplied && 'disbaled'}`} onSubmit={handleSubmitCouponCode}>
                            {/* <label style={{ fontSize: "18px" }}>كوبون: </label> */}
                            <input
                                type='text'
                                className='text-white'
                                placeholder='أدخل كوبون'
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                style={{ outline: 'none', border: "1px solid rgb(127 127 127)", background: "rgb(55 55 55)", width: "80%", padding: "4px 8px", borderRadius: ".3rem" }} />

                            <button className='btn btn-primary' disabled={couponApplied}>تطبيق</button>
                        </form>
                        {error && <span style={{ color: "red" }}>{error}</span>}
                        <button className="ziina-button btn btn-primary w-100 mt-3 mb-3 p-2 border-0 d-flex align-items-center gap-1 justify-content-center" onClick={handleZiinaPay}>
                            <svg fill="none" height="20" viewBox="0 0 64 64" width="20" xmlns="http://www.w3.org/2000/svg" className="me-2 h-3 w-3"><path d="M31.9664 5.46275L18.7086 0.00589076L13.2568 13.276L26.5146 18.7328L31.9664 5.46275Z" fill="currentColor"></path><path d="M50.7208 13.2769L45.2203 26.5683L58.359 32.0027L64 18.7825L50.7208 13.2769Z" fill="currentColor"></path><path d="M13.2568 13.276L0 18.7331L5.4518 32.0031L18.7096 26.5463L13.2568 13.276Z" fill="currentColor"></path><path d="M45.2911 0L32.0119 5.50562L37.5124 18.7971L50.7916 13.2915L45.2911 0Z" fill="currentColor"></path><path d="M58.359 32.0027L45.2252 37.4595L50.677 50.7296L63.9347 45.2727L58.359 32.0027Z" fill="currentColor"></path><path d="M31.9683 58.419L45.2261 63.9999L50.6779 50.7298L37.4202 45.273L31.9683 58.419Z" fill="currentColor"></path><path d="M13.2578 50.7296L18.7096 37.4595L5.4518 32.0031L0 45.2727L13.2578 50.7296Z" fill="currentColor"></path><path d="M26.5481 45.1484L13.2689 50.654L18.7694 63.9455L32.0486 58.4399L26.5481 45.1484Z" fill="currentColor"></path></svg>
                            الدفع بواسطة زينة
                        </button>

                        <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
                            <PayPalButtons
                                style={{ layout: 'vertical' }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: { value: totalPrice.toString() }
                                        }]
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        // Show the modal immediately
                                        const modal = new bootstrap.Modal(document.getElementById('paymentStatusModal'));
                                        const messageEl = document.getElementById('paymentMessage');
                                        modal.show();
                                        messageEl.textContent = 'جارٍ التحقق من حالة الدفع...';

                                        // Send orderID to backend for verification
                                        fetch('/api/payment/paypal/verify', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ orderID: data.orderID })
                                        })
                                            .then(res => res.json())
                                            .then(result => {
                                                if (result.success) {
                                                    messageEl.textContent = '✅ تم الدفع بنجاح!';
                                                    setCart([]); // Clear the cart
                                                    const addNewLicence = async (licenseKey, productCode, userId) => {
                                                        const newLicense = {
                                                            licenseKey,
                                                            productCode,
                                                            userId,
                                                        }

                                                        const res = await fetch('/api/admin/licenses/addLicense', {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify(newLicense)
                                                        });
                                                    }

                                                    cart.foreach(cartProduct => {
                                                        const licenseKey = 'superalts-xxxxxxxxxx-xxxxxxxxxx-xxxxxxxxxx'.replace(/[xy]/g, function (c) {
                                                            const r = (Math.random() * 16) | 0;
                                                            const v = c === 'x' ? r : (r & 0x3) | 0x8;
                                                            return v.toString(16);
                                                        });
                                                        addNewLicence(licenseKey, cartProduct.productCode, session.user.id)
                                                    })
                                                } else {
                                                    messageEl.textContent = '❌ فشل التحقق من الدفع.';
                                                }
                                            })
                                            .catch(() => {
                                                messageEl.textContent = '⚠️ حدث خطأ أثناء التحقق من الدفع.';
                                            });
                                    });
                                }}
                            />
                        </PayPalScriptProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}