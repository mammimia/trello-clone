import { NextPage } from 'next';
import Navbar from './organization/_components/navbar';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: NextPage<Props> = ({ children }) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
