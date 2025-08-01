import Link from 'next/link';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function SideBar({ renderForAdmin, products, licenses, coupons }) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return;
    }

    return (
        <aside className='col-3 col-md-4 col-xxl-3'>
            <div className='tp'>
                <Link href="/"><img src="/assets/logo.png" alt="Logo" /></Link>
                <a href='#' className="logout" onClick={() => signOut()}><i className="fa-solid fa-right-from-bracket"></i> <span>تسجيل خروج</span> </a>
            </div>
            <div className='user text-center'>
                <div className='user_img'>
                    <img src={`https://cdn.discordapp.com/avatars/${session.user.id}/${session.user.avatar}.png`} alt='Avatar' />
                </div>
                <b className='name'>{session.user.username}</b>
            </div>
            {renderForAdmin &&
                <nav>
                    <ul>
                        <li><Link href={"/dashboard/admin/products"} className={products ? "active" : ""}>المنتجات <i className="fa-solid fa-sitemap"></i></Link></li>
                        <li><Link href={"/dashboard/admin/licenses"} className={licenses ? "active" : ""}>الرخص <i className="fa-solid fa-id-badge"></i></Link></li>
                        <li><Link href={"/dashboard/admin/coupons"} className={coupons ? "active" : ""}>الكوبونات <i className="fa-solid fa-ticket"></i></Link></li>
                    </ul>
                </nav>
            }
        </aside>
    )
}
