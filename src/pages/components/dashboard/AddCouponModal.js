import { useState } from "react";
import { formatTimestamp } from './utils';

export default function AddCouponModal({ setCoupons, setError }) {
    const [coupon, setCoupon] = useState("")
    const [discountTypeValue, setDiscountTypeValue] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [usesAllowed, setUsesAllowed] = useState("")
    const [expiresInDays, setExpiresInDays] = useState("")
    const [createdBy, setCreatedBy] = useState("")

    const addCoupon = async () => {
        const newCoupon = {
            coupon,
            discountTypeValue,
            minPrice,
            usesAllowed,
            expiresInDays,
            createdBy,
        }

        const res = await fetch('/api/admin/coupons/addCoupon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCoupon)
        });

        const data = await res.json();
        console.log(data)
        if (data.error){
            setError(data.error)
            return;
        }
        newCoupon.usesCount = 0;
        newCoupon.createdAt = formatTimestamp(new Date());
        setCoupons(prevLicenses => [...prevLicenses, newCoupon])
        setCoupon("");
        setDiscountTypeValue("");
        setMinPrice("");
        setUsesAllowed("");
        setExpiresInDays("");
        setCreatedBy("");
    }

    return (
        <div className="modal fade" id="AddCouponModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white border-secondary">
                    <div className="modal-header border-secondary justify-content-between">
                        <h5 className="modal-title">إضافة كوبون</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input onChange={(e) => setCoupon(e.target.value)} value={coupon} type="text" className="form-control bg-secondary text-white border-0" placeholder="الكوبون" />
                        <input onChange={(e) => setDiscountTypeValue(e.target.value)} value={discountTypeValue} type="number" step="any" min="0" className="form-control bg-secondary text-white border-0" placeholder="قيمة الخصم" />
                        <input onChange={(e) => setMinPrice(e.target.value)} value={minPrice} type="number" step="any" min="0" className="form-control bg-secondary text-white border-0" placeholder="الحد الأدنى للسعر" />
                        <input onChange={(e) => setUsesAllowed(e.target.value)} value={usesAllowed} type="number" min="0" className="form-control bg-secondary text-white border-0" placeholder="الأستخدامات المسموح بها" />
                        <input onChange={(e) => setExpiresInDays(e.target.value)} value={expiresInDays} type="number" min="0" className="form-control bg-secondary text-white border-0" placeholder="تاريخ الأنتهاء" />
                        <input onChange={(e) => setCreatedBy(e.target.value)} value={createdBy} type="text" className="form-control bg-secondary text-white border-0" placeholder="يوزر - ايدي المُنشئ" />
                    </div>
                    <div className="modal-footer justify-content-center border-secondary gap-4">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={addCoupon}>إضافة</button>
                        <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">إغلاق</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
