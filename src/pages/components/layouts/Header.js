'use client';
import { useRef, useEffect } from "react";
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";

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

    return (
        <header dir="ltr">
            <div className='container d-flex justify-content-center align-items-center'>
                <div className="main_nav">
                    <div className="logo">
                        <img src="/assets/logo.png" alt="Logo" />
                    </div>
                    <nav>
                        <ul className="nav_links">
                            <li className={activeLink == "home" ? "active" : ""}><Link href="/">Home</Link></li>
                            <li><a href="#">Achievments</a></li>
                            <li><a href="#">About</a></li>
                            <li className={activeLink == "products" ? "active" : ""}><Link href="/products">Products</Link></li>
                            <li><a href="#">Testimonials</a></li>
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
                    <li className={activeLink == "home" ? "active" : ""}><Link href="/">Home</Link></li>
                    <li><a href="#">Achievments</a></li>
                    <li><a href="#">About</a></li>
                    <li className={activeLink == "products" ? "active" : ""}><Link href="/products">Products</Link></li>
                    <li><a href="#">Testimonials</a></li>
                </ul>
            </div>
        </header>
    )
}

export default Header;