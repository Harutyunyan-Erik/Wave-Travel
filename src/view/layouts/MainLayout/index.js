import { Outlet } from 'react-router-dom';

import MainHeader from '../../components/global/MainHeader';
import FooterComponent from '../../components/global/Footer/FooterComponent';
import './index.css';

const MainLayout = () => {
    return (
      <div className="main_layout_container">
        <MainHeader />
        <main>
          <Outlet />
        </main>
        <FooterComponent />
      </div>
    )
};
  
export default MainLayout;