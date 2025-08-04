import { useEffect, useState, useRef } from 'react';
import { useLicenses } from "../../../utils/useLicenses";

function License({ license, i, renderForAdmin, productStatus, productLicenseStatus, tooltipRefs, }) {
    const copyBtnRef = useRef(null);
    const [productBotStatusState, setproductBotStatusState] = useState(license.status == '🟢' ? "active" : "deactive")
    
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);

            const tooltip = bootstrap.Tooltip.getInstance(copyBtnRef.current);
            tooltip.setContent({ '.tooltip-inner': 'تم النسخ!' });
            tooltip.show();

            setTimeout(() => {
                tooltip.hide();
                tooltip.setContent({ '.tooltip-inner': 'انقر للنسخ' });
            }, 1000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const {
            activateLicense,
            deactivateLicense,
            setCurrentModifyLicenseKey,
            setCurrentModifyLicenses,
        } = useLicenses('/api/licenses/licenses');

    const handleStartBot = () => {
        // setproductBotStatusState("active")
    }

    const handleStopBot = async (licenseKey) => {
        const res = await fetch('/api/stopBot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ licenseKey: licenseKey })
        });

        const data = await res.json();
    }

    return (
        <tr>
            <td className="text-center">
                <input
                    className="form-check-input row-checkbox"
                    type="checkbox"
                    onChange={(e) => {
                        const isChecked = e.target.checked;
                        const licenseKey = license.licenseKey;
                        const valid = license.valid;

                        setCurrentModifyLicenses(prev => {
                            if (isChecked) {
                                return [...prev, {licenseKey, valid}];
                            } else {
                                return prev.filter(license => license.licenseKey !== licenseKey);
                            }
                        });
                    }}
                />
            </td>
            {renderForAdmin && <td>{license.userId}</td>}
            <td>{license.productName}</td>
            {renderForAdmin && <td>{license.productCode}</td>}
            <td>
                <button
                    ref={(el) => {
                        copyBtnRef.current = el;
                        tooltipRefs.current[i] = el;
                    }}
                    onClick={() => copyToClipboard(license.licenseKey)}
                    type="button"
                    className="copy-btn blur-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="انقر للنسخ">
                    {license.licenseKey}
                </button>
            </td>
            <td>{license.ip}</td>
            <td>{license.valid ? "مُفعلة" : "مُعطلة"}</td>
            <td>{productBotStatusState == "active" ? "مُغعل🟢" : "مُعطل🔴"}</td>
            <td className="ps-3">
                {/* <button className="btn btn-dark" aria-expanded="false">
                    <i className="fa-solid fa-download"></i>
                </button> */}
                <div className="dropdown text-center">
                    <button className="btn btn-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-ellipsis"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                        {renderForAdmin &&
                            <li>
                                <a className="dropdown-item" href="#">
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#removeLicenseModal" onClick={() => setCurrentModifyLicenseKey(license.licenseKey)}>
                                        حذف الرخصة
                                    </button>
                                </a>
                            </li>
                        }
                        {license.valid ? (
                            <li><a className="dropdown-item" href="#" onClick={() => deactivateLicense(license.licenseKey)}>تعطيل الرخصة</a></li>
                        ) : (
                            <li><a className="dropdown-item" href="#" onClick={() => activateLicense(license.licenseKey)}>تفعيل الرخصة</a></li>
                        )
                        }

                        {!renderForAdmin && (
                            productBotStatusState == "active" ? (
                                <li><a className="dropdown-item" href="#" onClick={() => handleStopBot(license.licenseKey)}>إيقاف البوت</a></li>
                            ) : (
                                <li><a className="dropdown-item" href="#" onClick={() => handleStartBot(license.licenseKey)}>تشغيل البوت</a></li>
                            )
                        )
                        }

                        <li>
                            <a className="dropdown-item" href="#">
                                <button type="button" data-bs-toggle="modal" data-bs-target="#resetIpModal" onClick={() => setCurrentModifyLicenseKey(license.licenseKey)}>
                                    إعادة تعيين الأيبي
                                </button>
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                <button type="button" data-bs-toggle="modal" data-bs-target="#regenerateLicenseModal" onClick={() => { setCurrentModifyLicenseKey(license.licenseKey) }}>
                                    إعادة توليد الرخصة
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>
            </td>
        </tr>
    )
}

export default License