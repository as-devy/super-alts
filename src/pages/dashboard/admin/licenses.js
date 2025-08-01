import Head from "next/head";
import SideBar from "../../components/dashboard/SideBar";
import RenderLicenses from '../../components/dashboard/RenderLicenses'
import AddLicenseModal from "src/pages/components/dashboard/AddLicenseModal";
import AgreeModals from "../../components/dashboard/AgreeModals";
import { ToastContainer } from 'react-toastify';
import { useLicenses } from "../../../utils/useLicenses";
import { useState } from "react";

export default function licenses() {
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState("")
    // Use the shared hook for all license logic
    const {
        licenses,
        setLicenses,
        setCurrentModifyLicenseKey,
        currentModifyLicenses,
        activateLicense,
        deactivateLicense,
        setCurrentModifyLicenses,
        handleResetIp,
        handleRegenerateLicense,
        handleMultiToggleLicenses,
        handleMultiResetIp,
        handleMultiRegenerateLicense
    } = useLicenses('/api/admin/licenses/licenses');

    const [allLicenses, setAllLicenses] = useState([]);
    // Sync allLicenses for search
    useState(() => {
        setAllLicenses(licenses);
    }, [licenses]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query.trim() === '') {
            setLicenses(allLicenses);
        } else {
            const filtered = allLicenses.filter(
                license =>
                    license.userId.toLowerCase().includes(query) ||
                    license.licenseKey.toLowerCase().includes(query)
            );
            setLicenses(filtered);
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
                        <SideBar renderForAdmin={true} licenses={true} />
                        <div className="col-12 col-xxl-8">
                            {error &&
                                <div className="alert alert-danger alert-dismissible fade show mb-3" role="alert">
                                    <strong>{error}</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            }
                            <div className='content'>
                                <div className="top">
                                    <h2>الرخص</h2>
                                    <div className="control">
                                        <button type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#AddLicenseModal"
                                        >إضافة رخصة <i className="fa-solid fa-plus"></i></button>
                                        <div className="search">
                                            <input
                                                type="text"
                                                placeholder="أبحث عن رخصة"
                                                value={searchQuery}
                                                onChange={handleSearch}
                                            />
                                        </div>
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
                                <table className="table table-bordered table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">أيدي العميل</th>
                                            <th scope="col">المنتج</th>
                                            <th scope="col">كود المنتج</th>
                                            <th scope="col">الرخصة</th>
                                            <th scope="col">الأيبي</th>
                                            <th scope="col">حالة الرخصة</th>
                                            <th scope="col">حالة البوت</th>
                                            <th scope="col" style={{ width: '100px' }}>إجرائات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RenderLicenses
                                            renderForAdmin={true}
                                            licenses={licenses}
                                            setCurrentModifyLicenseKey={setCurrentModifyLicenseKey}
                                            setCurrentModifyLicenses={setCurrentModifyLicenses}
                                            activateLicense={activateLicense}
                                            deactivateLicense={deactivateLicense}
                                        />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <AddLicenseModal setLicenses={setLicenses} setError={setError} />
                <AgreeModals
                    handleResetIp={handleResetIp}
                    handleRegenerateLicense={handleRegenerateLicense}
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
