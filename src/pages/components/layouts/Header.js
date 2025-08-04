'use client';
import { useRef, useEffect, useState } from "react";
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";

const sections = ["home", "achives", "about-us", "products", "testimonials"];

const Header = ({ activeLink }) => {
    const { data: session } = useSession();
    const mbMenu = useRef(null);
    const menuBtn = useRef(null);
    const closeMenu = () => {
        mbMenu.current.classList.remove('active');
    }
    const toggleMenu = () => {
        mbMenu.current.classList.toggle('active');
    }

    const [activeSection, setActiveSection] = useState(activeLink || "home");

    useEffect(() => {
        function handleDocumentClick(e) {
            if (!mbMenu.current) return;
            // If menu is not open, do nothing
            if (!mbMenu.current.classList.contains('active')) return;
            // If click is inside mb-menu or menu button, do nothing
            if (mbMenu.current.contains(e.target) || (menuBtn.current && menuBtn.current.contains(e.target))) return;
            closeMenu();
        }
        document.addEventListener('mousedown', handleDocumentClick);
        return () => document.removeEventListener('mousedown', handleDocumentClick);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            let current = "home";
            for (const id of sections) {
                const section = document.getElementById(id);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        console.log(id)
                        current = id;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header dir="ltr">
            <div className='container d-flex justify-content-center align-items-center'>
                <div className="main_nav">
                    <div className="logo">
                        <img src="/assets/logo.png" alt="Logo" />
                    </div>
                    <nav>
                        <ul className="nav_links">
                            <li className={activeSection === "home" ? "active" : ""}>
                                <Link href="/">Home</Link>
                            </li>
                            <li className={activeSection === "achives" ? "active" : ""}>
                                <a href="#achives">Achievements</a>
                            </li>
                            <li className={activeSection === "about-us" ? "active" : ""}>
                                <a href="#about-us">About</a>
                            </li>
                            <li className={activeSection === "products" ? "active" : ""}>
                                <Link href="/products">Products</Link>
                            </li>
                            <li className={activeSection === "testimonials" ? "active" : ""}>
                                <a href="#testimonials">Testimonials</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="d-flex align-items-center gap-3">
                        {!session ? (
                            <button className="discord_auth" onClick={() => signIn("discord")}>
                                <i className="fa-brands fa-discord"></i> تسجيل
                            </button>
                        ) : (
                            <div className="d-flex align-items-center gap-3">
                                <Link href="/dashboard" className="dsh-link">
                                    Dashboard
                                </Link>
                                <button
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#cartDrawer"
                                    href="/dashboard"
                                    className="shoping-cart-btn"
                                >
                                    <img src="/assets/shoping-cart-btn.png" alt="Cart" />
                                </button>
                            </div>
                        )
                        }
                        <div className="mb_menu_btn" onClick={toggleMenu} ref={menuBtn}>
                            <i className="fa-solid fa-bars"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-menu" id="mb_menu" ref={mbMenu}>
                <span className="close" id="close_menu" onClick={closeMenu}><i className="fa-solid fa-xmark"></i></span>
                <div className="logo">
                    <img src="/assets/logo.png" alt="" />
                </div>
                <ul>
                    <li className={activeSection === "home" ? "active" : ""}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={activeSection === "achives" ? "active" : ""}>
                        <a href="#achives">Achievements</a>
                    </li>
                    <li className={activeSection === "about-us" ? "active" : ""}>
                        <a href="#about-us">About</a>
                    </li>
                    <li className={activeSection === "products" ? "active" : ""}>
                        <Link href="/products">Products</Link>
                    </li>
                    <li className={activeSection === "testimonials" ? "active" : ""}>
                        <a href="#testimonials">Testimonials</a>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;