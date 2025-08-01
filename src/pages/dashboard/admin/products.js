import Head from "next/head";
import SideBar from "../../components/dashboard/SideBar";
import { useState, useEffect } from "react";
import AddProductModal from "src/pages/components/dashboard/AddProductModal";
import AgreeModals from "../../components/dashboard/AgreeModals";

export default function products() {
    const [products, setProducts] = useState([]);
    const [currentModifyProductCode, setCurrentModifyProductCode] = useState([]);

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

    const handleRemoveProduct = async () => {
        const res = await fetch('/api/admin/products/removeProduct', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productCode: currentModifyProductCode })
        });

        const data = await res.json();
        if (data.message) {
            const filtredProducts = products.filter(product => product.productCode !== currentModifyProductCode)
            setProducts(filtredProducts)
        }
    }

    return (
        <>
            <Head>
                <title>Super Alts | Admin Dashboard</title>
            </Head>
            <div className='dashboard admin'>
                <div className='conatiner'>
                    <div className='row gap-5 justify-content-center'>
                        <SideBar renderForAdmin={true} products={true} />
                        <div className='col-12 col-md-8 col-xxl-8'>
                            <div className="top mb-3">
                                <h2>المنتجات</h2>
                                <div className="control">
                                    <button type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#AddProductModal"
                                    >إضافة منتج <i className="fa-solid fa-plus"></i></button>
                                </div>
                            </div>

                            <div className="row products gap-3">
                                {products.map((product, i) => (
                                    <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={i}>
                                        <div className="product-card card bg-dark text-white border-secondary rounded-3 overflow-hidden shadow-sm">
                                            {product.productBest ? <span className="product_best">الأفضل مبيعا</span> : ""}
                                            <div className="card-img-top bg-secondary d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
                                                {product.productImage ? (
                                                    <img
                                                        src={product.productImage}
                                                        alt={product.productName}
                                                        className="product-image"
                                                    />
                                                ) : (
                                                    <i className="fa-solid fa-box-open fa-2x text-white-50"></i>
                                                )}
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-2">
                                                    <h6 className="mb-1">اسم المنتج</h6>
                                                    <span className="d-block text-truncate">{product.productName}</span>
                                                </div>
                                                <div className="mb-2">
                                                    <h6 className="mb-1">كود المنتج</h6>
                                                    <span className="d-block text-truncate">{product.productCode}</span>
                                                </div>
                                                <div className="mb-2 d-flex justify-content-between">
                                                    <div className="text-center">
                                                        <h6 className="mb-1">سعر المنتج</h6>
                                                        <span>{product.productPrice}</span>
                                                    </div>
                                                    <div className="text-center">
                                                        <h6 className="mb-1">السعر بعد الخصم</h6>
                                                        <span>{product.productSale || "لا يوجد"}</span>
                                                    </div>
                                                </div>
                                                <div className="mb-2">
                                                    <h6 className="mb-1">وصف المنتج</h6>
                                                    <span className="d-block description">{product.productDesc || "لا يوجد"}</span>
                                                </div>
                                                <div className="mb-2">
                                                    <h6 className="mb-1">المُنشئ</h6>
                                                    <span className="d-block text-truncate" title={product.createdBy}>{product.createdBy || "لا يوجد"}</span>
                                                </div>
                                                <div className="mb-2">
                                                    <h6 className="mb-1">تاريخ الإنشاء</h6>
                                                    <span>{product.createdAt}</span>
                                                </div>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between gap-2 bg-dark border-0">
                                                {/* <button className="btn btn-secondary w-50">تعديل</button> */}
                                                <button className="btn btn-danger w-100" type="button" data-bs-toggle="modal" data-bs-target="#removeProductModal" onClick={() => setCurrentModifyProductCode(product.productCode)}><i className="fa-solid fa-trash" style={{fontSize: "14px", marginLeft: "20px"}}></i> حذف</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>


                    </div>
                </div>

                <AddProductModal setProducts={setProducts} />

                <AgreeModals handleRemoveProduct={handleRemoveProduct} />
            </div>
        </>
    )
}
