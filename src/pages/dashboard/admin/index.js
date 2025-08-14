import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // If not logged in, redirect to login
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // If not an admin, redirect to user dashboard
  if (process.env.NEXT_PUBLIC_ADMIN_IDS?.split(',').includes(session.user.id)) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  // ✅ Admin: redirect to admin products
  return {
    redirect: {
      destination: '/dashboard/admin/products',
      permanent: false,
    },
  };
}

export default function AdminPage() {
  return null; // won't render because of the redirect
}
