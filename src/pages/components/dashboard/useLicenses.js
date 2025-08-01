import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function useLicenses(fetchUrl) {
  const [licenses, setLicenses] = useState([]);
  const [currentModifyLicenseKey, setCurrentModifyLicenseKey] = useState(null);
  const [currentModifyLicenses, setCurrentModifyLicenses] = useState([]);

  useEffect(() => {
    async function fetchLicenses() {
      const res = await fetch(fetchUrl, { credentials: 'include' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to fetch licenses');
      }
      const data = await res.json();
      setLicenses(data);
    }
    fetchLicenses();
  }, [fetchUrl]);

  const activateLicense = async (licenseKey) => {
    const res = await fetch('/api/licenses/activateLicense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseKey })
    });
    const data = await res.json();
    if (data.message?.includes('License activated')) {
      toast.success("تم تفعيل الرخصة");
      setLicenses(prevLicenses => prevLicenses.map(lic => lic.licenseKey === licenseKey ? { ...lic, valid: 1 } : lic));
    }
  };

  const deactivateLicense = async (licenseKey) => {
    const res = await fetch('/api/licenses/deactivateLicense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseKey })
    });
    const data = await res.json();
    if (data.message?.includes('License deactivated')) {
      toast.success("تم تعطيل الرخصة");
      setLicenses(prevLicenses => prevLicenses.map(lic => lic.licenseKey === licenseKey ? { ...lic, valid: 0 } : lic));
    }
  };

  const handleResetIp = async (licenseKey) => {
    const res = await fetch('/api/resetIp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseKey })
    });
    const data = await res.json();
    if (data.message?.includes("IP reset")) {
      toast.success("تمت إعادة تعيين الأيبي بنجاح");
    }
  };

  const handleRegenerateLicense = async (licenseKey) => {
    const res = await fetch('/api/licenses/regenerateLicense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseKey: licenseKey })
    });
    const data = await res.json();
    if (data.message?.includes("License regenerated")) {
      setLicenses(prevLicenses =>
        prevLicenses.map(license =>
          license.licenseKey === licenseKey
            ? { ...license, licenseKey: data.newLicenseKey }
            : license
        )
      );
      toast.success("تمت إعادة توليد الرخصة بنجاح");
    }
  };

  // Bulk actions
  const handleMultiToggleLicenses = async () => {
    for (const lic of currentModifyLicenses) {
      const licenseObj = licenses.find(l => l.licenseKey === lic.licenseKey);
      const isActive = licenseObj ? licenseObj.valid : lic.productLicenseStatusState || lic.valid;
      if (isActive) {
        await deactivateLicense(lic.licenseKey);
      } else {
        await activateLicense(lic.licenseKey);
      }
    }
  };

  const handleMultiResetIp = async () => {
    for (const lic of currentModifyLicenses) {
      await handleResetIp(lic.licenseKey);
    }
  };

  const handleMultiRegenerateLicense = async () => {
    for (const lic of currentModifyLicenses) {
      await handleRegenerateLicense(lic.licenseKey);
    }
  };

  return {
    licenses,
    setLicenses,
    currentModifyLicenseKey,
    setCurrentModifyLicenseKey,
    currentModifyLicenses,
    setCurrentModifyLicenses,
    activateLicense,
    deactivateLicense,
    handleResetIp,
    handleRegenerateLicense,
    handleMultiToggleLicenses,
    handleMultiResetIp,
    handleMultiRegenerateLicense,
  };
} 