// import Search from './Search';
// import SearchPage from './SearchPage/SearchPage';
import TravelForm from './TravelForm';
import Request from './Request/Request';
import Offers from './Offers';
import Slider from './Slider';

const MainPage = () => {
    return (
      <div>
        {/* <Search /> */}
        {/* <SearchPage /> */}
        <Request />
        <Slider />
        <Offers />
        <TravelForm />
      </div>
    )
  }

  export default MainPage;