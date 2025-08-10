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
  if (session.user.id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
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
