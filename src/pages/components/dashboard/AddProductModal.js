import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AddProductModal({ setProducts }) {
    const { data: session, status } = useSession();
    const [productName, setProductName] = useState("");
    const [productCode, setProductCode] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productRole, setProductRole] = useState("");
    const [productLink, setProductLink] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productSale, setProductSale] = useState("");
    const [productBest, setProductBest] = useState(false);
    const [createdBy, setCreatedBy] = useState("");
    const [userId, setUserId] = useState(session?.user?.id)

    if (status === "loading") {
        return;
    }

    const addProduct = async () => {
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        const newProduct = {
            productCode: `${productCode}-${random}`,
            userId,
            productName,
            productPrice,
            productRole,
            productLink,
            productImage,
            productDesc,
            productSale,
            productBest,
            createdBy
        };

        const res = await fetch('/api/admin/products/addProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        });

        const data = await res.json();
        if (data.message) {
            setProducts(prevProducts => [...prevProducts, newProduct])
        }
    }

    return (
        <div className="modal fade" id="AddProductModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white border-secondary">
                    <div className="modal-header border-secondary justify-content-between">
                        <h5 className="modal-title">إضافة منتج</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input onChange={(e) => setProductName(e.target.value)} value={productName} type="text" className="form-control bg-secondary text-white border-0" placeholder="productName" />

                        <input onChange={(e) => setProductCode(e.target.value)} value={productCode} type="text" className="form-control bg-secondary text-white border-0" placeholder="productCode" />

                        <input onChange={(e) => setProductPrice(e.target.value)} value={productPrice} type="text" className="form-control bg-secondary text-white border-0" placeholder="productPrice" />

                        <input onChange={(e) => setProductRole(e.target.value)} value={productRole} type="text" className="form-control bg-secondary text-white border-0" placeholder="productRole" />

                        <input onChange={(e) => setProductLink(e.target.value)} value={productLink} type="text" className="form-control bg-secondary text-white border-0" placeholder="productLink" />

                        <input onChange={(e) => setProductImage(e.target.value)} value={productImage} type="text" className="form-control bg-secondary text-white border-0" placeholder="productImage" />

                        <textarea onChange={(e) => setProductDesc(e.target.value)} value={productDesc} rows="4" className="form-control bg-secondary text-white border-0" placeholder="productDesc" />

                        <input onChange={(e) => setProductSale(e.target.value)} value={productSale} type="text" className="form-control bg-secondary text-white border-0" placeholder="productSale" />

                        <input onChange={(e) => setCreatedBy(e.target.value)} value={createdBy} type="text" className="form-control bg-secondary text-white border-0" placeholder="createdBy" />

                        <div className="form-check d-flex flex-row-reverse justify-content-end align-items-center gap-3 w-auto">
                            <input onChange={(e) => setProductBest(e.target.checked)} checked={productBest} type="checkbox" className="form-check-input" id="productBest" />
                            <label className="form-check-label text-white" htmlFor="productBest">الأفضل مبيعًا</label>
                        </div>
                    </div>
                    <div className="modal-footer justify-content-center border-secondary gap-4">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={addProduct}>إضافة</button>
                        <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">إغلاق</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
