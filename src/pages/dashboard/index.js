import { useSession } from "next-auth/react";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RenderLicenses from '../components/dashboard/RenderLicenses';
import AgreeModals from "../components/dashboard/AgreeModals";
import SideBar from "../components/dashboard/SideBar";
import { useLicenses } from "../../utils/useLicenses";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirect unauthenticated users to home and admin users to admin dashboard
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace('/');
        } else if (status === "authenticated" && process.env.NEXT_PUBLIC_ADMIN_IDS?.split(',').includes(session.user.id)) {
            router.replace('/dashboard/admin');
        }
    }, [status, session, router]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    // Redirect unauthenticated users to home
    if (status === "unauthenticated") {
        return null; // Don't render anything while redirecting
    }

    // Prevent rendering if admin user is being redirected
    if (status === "authenticated" && process.env.NEXT_PUBLIC_ADMIN_IDS?.split(',').includes(session?.user?.id)) {
        return null;
    }

    // Use the shared hook for all license logic
    const {
        licenses,
        currentModifyLicenses,
        setCurrentModifyLicenses,
        currentModifyLicenseKey,
        setCurrentModifyLicenseKey,
        activateLicense,
        deactivateLicense,
        handleResetIp,
        handleRegenerateLicense,
        handleMultiToggleLicenses,
        handleMultiResetIp,
        handleMultiRegenerateLicense,
        handleSearch,
        searchQuery
    } = useLicenses('/api/licenses/licenses');
    
    return (
        <>
            <Head>
                <title>Super Alts | Dashboard</title>
            </Head>
            <div className='dashboard'>
                <div className='conatiner'>
                    <div className='row gap-5 justify-content-center'>
                        <SideBar />
                        <div className='content col-12 col-xxl-7'>
                            <div className="top">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2>الرخص</h2>
                                    <div className="search">
                                        <input
                                            type="text"
                                            placeholder="أبحث عن رخصة"
                                            value={searchQuery}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                </div>
                                {currentModifyLicenses.length > 0 && (
                                    <ul className="multi_options">
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={handleMultiToggleLicenses}
                                            >
                                                تفعيل / تعطيل الرخص
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                onClick={handleMultiResetIp}
                                            >
                                                إعادة تعيين الأيبي
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                onClick={handleMultiRegenerateLicense}
                                            >
                                                إعادة توليد الرخص
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                            <div className="responsive-table">
                                <table className="table table-bordered table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">المنتج</th>
                                            <th scope="col">الرخصة</th>
                                            <th scope="col">الأيبي</th>
                                            <th scope="col">حالة الرخصة</th>
                                            <th scope="col">حالة البوت</th>
                                            <th scope="col" style={{ width: '100px' }}>إجرائات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RenderLicenses
                                            licenses={licenses}
                                            setCurrentModifyLicenses={setCurrentModifyLicenses}
                                            setCurrentModifyLicenseKey={setCurrentModifyLicenseKey}
                                            activateLicense={activateLicense}
                                            deactivateLicense={deactivateLicense}
                                        />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <AgreeModals
                    handleResetIp={handleResetIp}
                    handleRegenerateLicense={handleRegenerateLicense}
                    currentModifyLicenseKey={currentModifyLicenseKey}
                />

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
            </div>
        </>
    );
}

export default Dashboard;
