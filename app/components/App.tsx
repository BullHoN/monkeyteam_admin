import { getServerSession } from 'next-auth/next';
import SideMenu from './sidebar';
import UnAuthrorized from './UnAuthorized';

export default async function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <>
      <div>
        <SideMenu />
        {session?.user ? children : <UnAuthrorized />}
      </div>
    </>
  );
}
