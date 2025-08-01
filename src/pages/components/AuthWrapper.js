// components/AuthWrapper.tsx
import { useSession } from "next-auth/react";
import React from "react";

const AuthWrapper = ({ children }) => {
    const { status } = useSession();

    if (status === "loading") {
        return (
            <div className="preloader d-flex align-items-center justify-content-center">
                <div className="loader">
                    <img className="icon" src="/assets/loader.svg" />
                    <img className="logo" src="/assets/favicons/favicon-256.png" />
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthWrapper;
