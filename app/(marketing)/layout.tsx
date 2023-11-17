import { NextPage } from 'next';

interface Props {
  children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <div className="h-full bg-slate-100">
      <main className="bg-slate-100 pb-20 pt-40">{children}</main>
    </div>
  );
};

export default Layout;
