import Link from 'next/link';

import Layout from '@/components/Layout';

export default function Profile() {
  return (
    <Layout>
      <h2>User Profile</h2>
      <div className="heading">Last Signed In:</div>
      <code className="highlight">N/A</code>
      <Link href="/">
        <a className="button">Go Home</a>
      </Link>
    </Layout>
  );
}