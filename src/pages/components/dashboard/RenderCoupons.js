import Coupon from "./Coupon";

export default function RenderCoupons({ coupons, setCurrentModifyCoupon }) {
    return (
        coupons ? (
            coupons.map((coupon, i) => (
                <Coupon 
                    coupon={coupon} 
                    key={i} 
                    setCurrentModifyCoupon={setCurrentModifyCoupon}
                />
            ))
        ) : (
            <tr>
                <td colSpan="6" className="text-center">جاري تحميل الكوبونات...</td>
            </tr>
        )
    )
}
