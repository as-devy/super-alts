import { useSession } from "next-auth/react";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RenderLicenses from '../components/dashboard/RenderLicenses'
import AgreeModals from "../components/dashboard/AgreeModals";
import SideBar from "../components/dashboard/SideBar";
import { useLicenses } from "../../utils/useLicenses";

function Dashboard() {
    const { data: session, status } = useSession();
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
        handleMultiRegenerateLicense
    } = useLicenses('/api/licenses/licenses');

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Head>
                <title>Super Alts | Dashboard</title>
            </Head>
            <div className='dashboard'>
                <div className='conatiner'>
                    <div className='row gap-5 justify-content-center'>
                        <SideBar />
                        <div className='content col-7'>
                            <div className="top">
                                <h2>الرخص</h2>
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
    )
}

export default Dashboard