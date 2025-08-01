export default function AgreeModals({ handleResetIp, handleRegenerateLicense, currentModifyLicenseKey, handleRemoveLicense, handleRemoveProduct }) {
    return (
        <>
            <div className="modal fade" id="resetIpModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white border-secondary">
                        <div className="modal-header border-secondary justify-content-between">
                            <h5 className="modal-title">هل انت متأكد من إعادة تعيين الأيبي</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/* <div className="modal-body">
                                <input type="text" className="form-control bg-secondary text-white border-0" placeholder="أدخل الأيبي الجديد" />
                            </div> */}
                        <div className="modal-footer justify-content-center border-secondary gap-4">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => handleResetIp(currentModifyLicenseKey)}>إعادة تعيين</button>
                            <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">إغلاق</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="regenerateLicenseModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white border-secondary">
                        <div className="modal-header border-secondary justify-content-between">
                            <h5 className="modal-title">هل انت متأكد من إعادة توليد الرخصة</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer justify-content-center border-secondary gap-4">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => handleRegenerateLicense(currentModifyLicenseKey)}>إعادة توليد</button>
                            <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">إغلاق</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="removeLicenseModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white border-secondary">
                        <div className="modal-header border-secondary justify-content-between">
                            <h5 className="modal-title">هل انت متأكد من حذف الرخصة</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer justify-content-center border-secondary gap-4">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={handleRemoveLicense}>حذف</button>
                            <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">إغلاق</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="removeProductModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white border-secondary">
                        <div className="modal-header border-secondary justify-content-between">
                            <h5 className="modal-title">هل انت متأكد من حذف المنتج</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer justify-content-center border-secondary gap-4">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={handleRemoveProduct}>حذف</button>
                            <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">إغلاق</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}