import { formatTimestamp } from '../../../utils/utils';

export default function Coupon({ coupon, setCurrentModifyCoupon }) {

    return (
        <tr>
            {/* <td className="text-center">{coupon.id}</td> */}
            <td>{coupon.coupon}</td>
            <td>{coupon.discountTypeValue}</td>
            <td>{coupon.minPrice}</td>
            <td>{coupon.usesAllowed}</td>
            <td>{coupon.usesCount}</td>
            <td>{formatTimestamp(coupon.expiresAt)}</td>
            <td>{coupon.createdBy}</td>
            <td>{coupon.createdAt}</td>
            <td className="text-center">
                <div className="d-inline text-center">
                    <button className="btn btn-dark" data-bs-display="static" type="button" aria-expanded="false" data-bs-toggle="modal" data-bs-target="#removeCouponModal" onClick={() => setCurrentModifyCoupon(coupon.coupon)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
}
