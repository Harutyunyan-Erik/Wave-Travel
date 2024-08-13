import { Outlet } from 'react-router-dom';

import MainHeader from '../../components/global/MainHeader';
import Offers from '../../components/global/MainPage/Offers';
import './index.css';

const MainLayout = () => {
    return (
      <div className="main_layout_container">
        <MainHeader />
        <main>
          <Outlet />
        </main>
        {/* <Offers /> */}
      </div>
    )
};
  
export default MainLayout;