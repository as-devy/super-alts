export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/dashboard/admin/products',
      permanent: false, // Set to true if this will always redirect
    },
  };
}

export default function AdminPage() {
  return null; // Won't render because we are redirecting
}
