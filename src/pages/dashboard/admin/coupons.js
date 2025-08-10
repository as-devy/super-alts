import { getSession } from "next-auth/react";
import Head from "next/head";
import SideBar from "../../components/dashboard/SideBar";
import { useState, useEffect } from "react";
import RenderCoupons from "src/pages/components/dashboard/RenderCoupons";
import AddCouponModal from "src/pages/components/dashboard/AddCouponModal";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    // Not logged in → redirect to login
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    // Not admin → redirect to user dashboard
    if (session.user.id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        };
    }

    return { props: {} }; // Page is safe to render
}

export default function Coupons() {
    const [allCoupons, setAllCoupons] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [currentModifyCoupon, setCurrentModifyCoupon] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCoupons() {
            try {
                const res = await fetch('/api/admin/coupons/coupons', {
                    credentials: 'include',
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Failed to fetch coupons');
                }

                const data = await res.json();
                setAllCoupons(data);
                setCoupons(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchCoupons();
    }, []);

    const handleRemoveCoupon = async () => {
        const res = await fetch('/api/admin/coupons/removeCoupons', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coupon: currentModifyCoupon }),
        });

        const data = await res.json();
        if (data.message) {
            const filteredCoupons = coupons.filter(
                (coupon) => coupon.coupon !== currentModifyCoupon
            );
            setCoupons(filteredCoupons);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === '') {
            setCoupons(allCoupons);
        } else {
            const filtered = allCoupons.filter(
                (coupon) =>
                    coupon.createdBy.toLowerCase().includes(query) ||
                    coupon.coupon.toLowerCase().includes(query)
            );
            setCoupons(filtered);
        }
    };

    return (
        <>
            <Head>
                <title>Super Alts | Admin Dashboard</title>
            </Head>
            <div className='dashboard admin'>
                <div className='conatiner'>
                    <div className='row gap-5 justify-content-center'>
                        <SideBar renderForAdmin={true} coupons={true} />
                        <div className="col-12 col-xxl-8">
                            {error && (
                                <div className="alert alert-danger alert-dismissible fade show mb-3" role="alert">
                                    <strong>{error}</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            )}
                            <div className='content'>
                                <div className="top">
                                    <h2>الكوبونات</h2>
                                    <div className="control">
                                        <button
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#AddCouponModal"
                                        >
                                            إضافة كوبون <i className="fa-solid fa-plus"></i>
                                        </button>
                                        <div className="search">
                                            <input
                                                type="text"
                                                placeholder="أبحث عن كوبون"
                                                value={searchQuery}
                                                onChange={handleSearch}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="responsive-table">
                                    <table className="table table-bordered table-striped align-middle table-hover">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col">الكوبون</th>
                                                <th scope="col">قيمة الخصم</th>
                                                <th scope="col">الحد الأدنى للسعر</th>
                                                <th scope="col">الأستخدامات المسموح بها</th>
                                                <th scope="col">عدد الأستخدامات</th>
                                                <th scope="col">تاريخ الأنتهاء</th>
                                                <th scope="col">تم إنشاؤه بواسطة</th>
                                                <th scope="col">تم إنشاؤها في</th>
                                                <th scope="col" style={{ width: '70px' }}>إجراءات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <RenderCoupons
                                                coupons={coupons}
                                                setCurrentModifyCoupon={setCurrentModifyCoupon}
                                            />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AddCouponModal setCoupons={setCoupons} setError={setError} />

                <div className="modal fade" id="removeCouponModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark text-white border-secondary">
                            <div className="modal-header border-secondary justify-content-between">
                                <h5 className="modal-title">هل انت متأكد من حذف الكوبون</h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-footer justify-content-center border-secondary gap-4">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    data-bs-dismiss="modal"
                                    onClick={handleRemoveCoupon}
                                >
                                    حذف
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-light"
                                    data-bs-dismiss="modal"
                                >
                                    إغلاق
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
