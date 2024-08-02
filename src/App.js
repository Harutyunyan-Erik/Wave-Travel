import React from 'react';
import Header from './view/components/global/Header';
import Search from './view/components/global/Search';

class App extends React.Component {
  constructor() {
    super();

  }
  render() {
    return (
      <div>
        <Header />
        <Search />
      </div>
    )
  }
}

export default App