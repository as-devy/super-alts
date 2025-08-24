import { useEffect, useState } from "react";

export default function AddLicenseModal({ setLicenses, setError, toast }) {
    const [licenseKey, setLicenseKey] = useState("")
    const [selectedProduct, setSelectedProduct] = useState("المنتج")
    const [products, setProducts] = useState([]);
    const [productCode, setProductCode] = useState("")
    const [userId, setUserId] = useState("")

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
        const licenseKey = 'superalts-xxxxxxxxxx-xxxxxxxxxx-xxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });

        setLicenseKey(licenseKey)
    }, [])

    const addLicense = async () => {
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

        const data = await res.json();
        if (data.error) {
            setError(data.error)
            return;
        }
        newLicense.productName = data.productName;
        newLicense.ip = "";
        newLicense.valid = 0;
        newLicense.status = "🔴";
        setLicenses(prevLicenses => [...prevLicenses, newLicense])
        setLicenseKey("")
        setProductCode("")
        setUserId("")
        toast.success("تمت إضافة الرخصة")
    }

    return (
        <div className="modal fade" id="AddLicenseModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white border-secondary">
                    <div className="modal-header border-secondary justify-content-between">
                        <h5 className="modal-title">إضافة رخصة</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input onChange={(e) => setLicenseKey(e.target.value)} value={licenseKey} type="text" className="form-control bg-secondary text-white border-0" placeholder="superalts-xxxx-xxxx-xxxx" />
                        {/* <input onChange={(e) => setProductCode(e.target.value)} value={productCode} type="text" className="form-control bg-secondary text-white border-0" placeholder="Product-xxx" /> */}
                        <div className="dropdown">
                            <button
                                className="btn bg-secondary btn-dark dropdown-toggle w-100 d-flex justify-content-between align-items-center"
                                type="button"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {selectedProduct}
                            </button>
                            <ul
                                className="dropdown-menu dropdown-menu-dark w-100"
                                aria-labelledby="dropdownMenuButton"
                            >
                                {
                                    products.map((product, i)=>(
                                        <li key={i} onClick={() => {setSelectedProduct(product.productName); setProductCode(product.productCode)}}><a className="dropdown-item" href="#">{ product.productName }</a></li>
                                    ))
                                }
                            </ul>
                        </div>
                        <input onChange={(e) => setUserId(e.target.value)} value={userId} type="text" className="form-control bg-secondary text-white border-0" placeholder="أيدي العميل" />
                    </div>
                    <div className="modal-footer justify-content-center border-secondary gap-4">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={addLicense}>إضافة</button>
                        <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">إغلاق</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
