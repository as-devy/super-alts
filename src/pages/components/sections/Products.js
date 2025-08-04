import Link from "next/link";
import { useState, useEffect } from "react";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch('/api/admin/products/products', {
                credentials: 'include'
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to fetch products');
            }

            const data = await res.json();
            setProducts(data);
        }

        fetchProducts();
    }, []);

    const repeatedProducts = Array(10).fill(products).flat();

    return (
        <section className="products" id="products">
            <div className="container-fluid" style={{ padding: '0' }}>
                <div className="header-text head-img">
                    <img src="/assets/products-header.png" alt="products-header" className="img-fluid" />
                </div>
                <div className="marquee-wrapper">
                    <div className="marquee-content d-flex flex-wrap justify-content-center gap-3">
                        {repeatedProducts.map((src, i) => (
                            products.map((product, i) => (
                                <div className="product d-flex flex-column align-items-center" key={i}>
                                    <div className="product-img">
                                        <img src={product.productImage} alt={product.productName} className="img-fluid mb-2" />
                                    </div>
                                    <h3>{ product.productName }</h3>
                                    <img src="/assets/logo.png" className="logo" alt="logo" />
                                    <Link href="/products" className="order-btn btn btn-primary btn-sm">أطلب الأن</Link>
                                </div>
                            ))
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products