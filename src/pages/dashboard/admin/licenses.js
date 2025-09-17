import { getSession } from "next-auth/react";
import Head from "next/head";
import SideBar from "../../components/dashboard/SideBar";
import RenderLicenses from '../../components/dashboard/RenderLicenses'
import AddLicenseModal from "src/pages/components/dashboard/AddLicenseModal";
import AgreeModals from "../../components/dashboard/AgreeModals";
import { ToastContainer, toast } from 'react-toastify';
import { useLicenses } from "../../../utils/useLicenses";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // 🚨 Redirect if user is not logged in
  if (!session) {
    return {
      redirect: {
        destination: "/", // send unauthenticated users home
        permanent: false,
      },
    };
  }

  // 🚨 Redirect if user is NOT an admin
  const adminIds = process.env.NEXT_PUBLIC_ADMIN_IDS
    ? process.env.NEXT_PUBLIC_ADMIN_IDS.split(",")
    : [];

  if (!adminIds.includes(session.user.id)) {
    return {
      redirect: {
        destination: "/dashboard", // send normal users to dashboard
        permanent: false,
      },
    };
  }

  // ✅ User is admin → allow access
  return {
    props: { session },
  };
}

export default function Licenses() {
    const [error, setError] = useState("");

    const {
        licenses,
        setLicenses,
        currentModifyLicenses,
        currentModifyLicenseKey,
        setCurrentModifyLicenseKey,
        activateLicense,
        deactivateLicense,
        setCurrentModifyLicenses,
        handleResetIp,
        handleRegenerateLicense,
        handleMultiToggleLicenses,
        handleMultiResetIp,
        handleMultiRegenerateLicense,
        handleSearch,
        searchQuery
    } = useLicenses('/api/admin/licenses/licenses');

    const handleRemoveLicense = async (licenseKeyArg) => {
        try {
            const res = await fetch("/api/admin/licenses/removeLicense", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    licenseKey: licenseKeyArg || currentModifyLicenseKey,
                }),
            });

            const data = await res.json();
            console.log(data)
            if (res.ok) {
                toast.success("تم حذف الرخصة");
                setLicenses((prevLicenses) =>
                    prevLicenses.filter((license) => license.licenseKey !== (licenseKeyArg || currentModifyLicenseKey))
                );

            } else {
                toast.error("فشل في إزالة الرخصة");
            }
        } catch (error) {
            toast.error("فشل في إزالة الرخصة");
        }
    };

    const handleMultiRemoveLicenses = async () => {
        try {
            for (const lic of currentModifyLicenses) {
                await handleRemoveLicense(lic.licenseKey);
            }
        } 
        finally {
            setCurrentModifyLicenses([]);
            setCurrentModifyLicenseKey(null);
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
                                        <li>
                                            <button
                                                type="button"
                                                onClick={handleMultiRemoveLicenses}
                                            >
                                                 حذف الرخص
                                            </button>
                                        </li>
                                    </ul>
                                )}
                                <div className="responsive-table responsive-table">
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
                </div>
                <AddLicenseModal setLicenses={setLicenses} toast={toast} setError={setError} />
                <AgreeModals
                    handleResetIp={handleResetIp}
                    handleRegenerateLicense={handleRegenerateLicense}
                    currentModifyLicenseKey={currentModifyLicenseKey}
                    handleRemoveLicense={handleRemoveLicense}
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
