import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function useLicenses(fetchUrl) {
  const [licenses, setLicenses] = useState([]);
  const [currentModifyLicenseKey, setCurrentModifyLicenseKey] = useState(null);
  const [currentModifyLicenses, setCurrentModifyLicenses] = useState([]);
  const [allLicenses, setAllLicenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchLicenses() {
      const res = await fetch(fetchUrl, { credentials: 'include' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to fetch licenses');
      }
      const data = await res.json();
      setLicenses(data);
      setAllLicenses(data); // Set allLicenses only on initial fetch
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
      setAllLicenses(prevLicenses => prevLicenses.map(lic => lic.licenseKey === licenseKey ? { ...lic, valid: 1 } : lic));
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
      setAllLicenses(prevLicenses => prevLicenses.map(lic => lic.licenseKey === licenseKey ? { ...lic, valid: 0 } : lic));
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
      const updateLicense = (prevLicenses) =>
        prevLicenses.map(license =>
          license.licenseKey === licenseKey
            ? { ...license, licenseKey: data.newLicenseKey }
            : license
        );
      
      setLicenses(updateLicense);
      setAllLicenses(updateLicense);
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

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.trim() === '') {
      setLicenses(allLicenses);
    } else {
      const filtered = allLicenses.filter(
        license =>
          license.userId.toLowerCase().includes(query) ||
          license.licenseKey.toLowerCase().includes(query) ||
          license.productName.toLowerCase().includes(query)
      );
      setLicenses(filtered);
      console.log(filtered);
    }
  };

  // Custom setLicenses that also updates allLicenses
  const updateLicenses = (newLicenses) => {
    if (typeof newLicenses === 'function') {
      setLicenses(prev => {
        const updated = newLicenses(prev);
        setAllLicenses(updated);
        return updated;
      });
    } else {
      setLicenses(newLicenses);
      setAllLicenses(newLicenses);
    }
  };

  return {
    licenses,
    setLicenses: updateLicenses,
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
    handleSearch,
    searchQuery
  };
} 