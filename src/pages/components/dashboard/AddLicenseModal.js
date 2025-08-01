import { useState } from "react";

export default function AddLicenseModal({ setLicenses, setError }) {
    const [licenseKey, setLicenseKey] = useState("")
    const [productCode, setProductCode] = useState("")
    const [userId, setUserId] = useState("")

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
        if (data.error){
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
                        <input onChange={(e) => setProductCode(e.target.value)} value={productCode} type="text" className="form-control bg-secondary text-white border-0" placeholder="Product-xxx" />
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
