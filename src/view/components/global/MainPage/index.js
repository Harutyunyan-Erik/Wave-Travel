import Search from './Search';
import SearchPage from './SearchPage/SearchPage';
import Offers from './Offers';
import Slider from './Slider';

const MainPage = () => {
    return (
      <div>
        {/* <Search /> */}
        <SearchPage />
        <Slider />
        <Offers />
      </div>
    )
  }

  export default MainPage;