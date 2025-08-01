import { useEffect, useState, useRef } from 'react';
import License from './License';

function RenderLicenses({ licenses, renderForAdmin, activateLicense, deactivateLicense, setCurrentModifyLicenses, setCurrentModifyLicenseKey }) {
    const tooltipRefs = useRef([]);

    useEffect(() => {
        if (licenses.length === 0) return;

        tooltipRefs.current.forEach((el) => {
            if (el && window.bootstrap) {
                new window.bootstrap.Tooltip(el);
            }
        });
    }, [licenses]);

    return (
        licenses ? (
            licenses.map((license, i) => (
                <License
                    key={i}
                    i={i}
                    license={license}
                    renderForAdmin={renderForAdmin}
                    tooltipRefs={tooltipRefs}
                    setCurrentModifyLicenses={setCurrentModifyLicenses}
                    setCurrentModifyLicenseKey={setCurrentModifyLicenseKey}
                    activateLicense={activateLicense}
                    deactivateLicense={deactivateLicense}
                />
            ))
        ) : (
            <tr>
                <td colSpan="6" className="text-center">جاري تحميل الرخص...</td>
            </tr>
        )
    )
}

export default RenderLicenses