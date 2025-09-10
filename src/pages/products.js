import Head from "next/head";
import { useState, useRef, useEffect, use } from "react";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/layouts/Header";
import Cart from "./components/sections/Cart";

export default function Products({ cart, setCart, session }) {
    const [products, setProducts] = useState([]);
    const [userLicenses, setUserLicensess] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const router = useRouter();
    const { payment_intent_id } = router.query;

    const viewProductRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("/api/admin/products/products", {
                credentials: "include",
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to fetch products");
            }

            const data = await res.json();
            setProducts(data);
        }

        fetchProducts();
    }, []);

    useEffect(() => {
        async function fetchUserLicenses() {
            // Only fetch licenses if user is authenticated
            if (session) {
                try {
                    const res = await fetch("/api/licenses/licenses", { credentials: 'include' });
                    if (!res.ok) {
                        const err = await res.json();
                        throw new Error(err.error || 'Failed to fetch licenses');
                    }
                    const data = await res.json();
                    setUserLicensess(data);
                } catch (error) {
                    console.error('Failed to fetch user licenses:', error);
                    // Set empty array if fetch fails
                    setUserLicensess([]);
                }
            } else {
                // Clear licenses if user is not authenticated
                setUserLicensess([]);
            }
        }
        fetchUserLicenses();
    }, [session]); // Add session as dependency

    useEffect(() => {
        if (!payment_intent_id) return;

        const modal = new bootstrap.Modal(document.getElementById('paymentStatusModal'));
        const messageEl = document.getElementById('paymentMessage');
        const timeoutId = setTimeout(async () => {
            try {
                modal.show();
                messageEl.textContent = 'جارٍ التحقق من حالة الدفع...';

                const res = await fetch(`/api/payment/ziina/status?id=${payment_intent_id}`);
                const data = await res.json();

                if (data.status === 'paid') {
                    messageEl.textContent = '✅ تم الدفع بنجاح!';

                    // Helper function to generate license key
                    const generateLicenseKey = () =>
                        'superalts-xxxxxxxxxx-xxxxxxxxxx-xxxxxxxxxx'.replace(/[xy]/g, function (c) {
                            const r = (Math.random() * 16) | 0;
                            const v = c === 'x' ? r : (r & 0x3) | 0x8;
                            return v.toString(16);
                        });

                    // Add licenses in parallel
                    await Promise.all(
                        cart.map(cartProduct => {
                            const newLicense = {
                                licenseKey: generateLicenseKey(),
                                productCode: cartProduct.productCode,
                                userId: session.user.id,
                            };

                            return fetch('/api/admin/licenses/addLicense', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(newLicense),
                            });
                        })
                    );

                    // Clear cart, reload page or redirect
                    window.location.reload();
                } else {
                    messageEl.textContent = '❌ فشل الدفع أو لم يكتمل.';
                }
            } catch (err) {
                console.error(err);
                messageEl.textContent = '⚠️ حدث خطأ أثناء التحقق من الدفع.';
            }
        }, 1000);

        // Cleanup timeout if component unmounts early
        return () => clearTimeout(timeoutId);
    }, [payment_intent_id]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                viewProductRef.current &&
                containerRef.current &&
                !containerRef.current.contains(e.target) &&
                viewProductRef.current.contains(e.target)
            ) {
                viewProductRef.current.classList.remove("active")
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleAddToCart = (product) => {
        if (!session) {
            toast.error("يجب تسجيل الدخول أولاً لإضافة المنتجات إلى السلة");
            return;
        }
        setCart([...cart, product]);
        toast.success(`تم إضافة "${product.productName}" إلى السلة بنجاح!`);
    }

    // Helper function to render add to cart button based on user state
    const renderAddToCartButton = (product) => {
        // If user is authenticated, check their licenses and cart
        if (session) {
            // const isOwned = userLicenses.some(license => license.productCode === product.productCode);
            const inCart = cart.some(item => item.productCode === product.productCode);

            // if (isOwned) {
            //     return (
            //         <button className="btn btn-success btn-sm d-flex align-items-center gap-1" style={{ opacity: "0.8" }} disabled>
            //             <i className="fa-solid fa-check"></i>
            //             تم الشراء
            //         </button>
            //     );
            // }

            if (inCart) {
                return (
                    <button className="btn btn-success btn-sm d-flex align-items-center gap-1" style={{ cursor: 'no-drop', opacity: "0.5" }} disabled>
                        <i className="fa-solid fa-cart-shopping"></i>
                        فى السلة
                    </button>
                );
            }
        }

        // Default: Show add to cart button (for unauthenticated users or available products)
        return (
            <button className="btn btn-success btn-sm d-flex align-items-center gap-1" onClick={() => handleAddToCart(product)}>
                <i className="fa-solid fa-cart-shopping"></i>
                إضافة للسلة
            </button>
        );
    };

    return (
        <main className="products-page">
            <Head>
                <title>Super Alts | Products</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header activeLink={"products"} />
            <Cart cart={cart} setCart={setCart} session={session} />
            <div className="container-fluid my-4" style={{ margin: "0 auto !important" }}>
                <div className="row gap-4 justify-content-center">
                    {products.map((product, i) => (
                        <div
                            className="product-card col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2"
                            key={i}
                        >
                            {product.productBest ? <span className="product_best">الأفضل مبيعا</span> : ""}
                            <div className="img">
                                {product.productImage && (
                                    <img
                                        src={product.productImage}
                                        alt={product.productName}
                                    />
                                )}
                            </div>
                            <div className="content p-2">
                                <div className="text">
                                    <h5>{product.productName}</h5>
                                    <p>{product.productDesc || "لا يوجد وصف"}</p>
                                </div>
                                <div className="info d-flex justify-content-between align-items-center">
                                    <span className="price">{product.productPrice}$</span>
                                    <div className="btns d-flex gap-2">
                                        {renderAddToCartButton(product)}

                                        <button
                                            className="btn btn-info btn-sm info-btn"
                                            onClick={() => { setSelectedProduct(product); viewProductRef.current.classList.add("active") }}
                                        >
                                            <i className="fa-solid fa-info"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="view_product" ref={viewProductRef}>
                <div className="container" ref={containerRef}>
                    <div className="close" onClick={() => viewProductRef.current.classList.remove("active")}> <i className="fa-solid fa-x"></i></div>
                    <div className="img">
                        {selectedProduct.productImage && (
                            <img src={selectedProduct.productImage} alt={selectedProduct.productName} />
                        )}
                    </div>
                    <div className="content">
                        <div className="row_text" style={{ borderBottom: "1px solid #777777", paddingBottom: "20px" }}>
                            <h2>{selectedProduct.productName}</h2>
                            <h2 className="price">${selectedProduct.productPrice}</h2>
                        </div>
                        <div className="row_text gap-4" style={{ height: "50%" }}>
                            <h4 style={{ color: "#e7e7e7" }}>وصف المنتج</h4>
                            <p> - {selectedProduct.productDesc || "لا يوجد وصف"}</p>
                        </div>
                        <div className="row_text" style={{ borderTop: "1px solid #777777", paddingTop: "20px" }}>
                            {renderAddToCartButton(selectedProduct)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Status Modal */}
            <div
                className="modal fade"
                id="paymentStatusModal"
                tabIndex="-1"
                aria-labelledby="paymentStatusLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header border-secondary d-flex justify-content-between align-items-center">
                            <h5 className="modal-title" id="paymentStatusLabel">حالة الدفع</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            <div id="paymentMessage">جارٍ التحقق من حالة الدفع...</div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                theme="colored"
            />

        </main>
    );
}
