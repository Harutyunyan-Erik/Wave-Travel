import React, { useState, useEffect } from 'react';
import MainLayout from './view/layouts/MainLayout';
import LoadingWrapper from './view/components/shared/LoadingWrapper';
import { AuthContextProvider } from './context/AuthContext';
import MainPage from './view/components/global/MainPage';
import { Login, Register } from './view/pages/auth';
import  HotelSearch  from './view/components/global/HotelSearch';
import { HotelSearchProvider } from './view/components/global/HotelSearch/HotelSearchProvider';
import { db, auth, doc, getDoc, onAuthStateChanged } from './services/firebase';
import {  
  Route, 
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const route = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} /> 
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="hotel-search" element={<HotelSearch />} />
    </Route>
  )
);

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userProfileInfo, setUserProfileInfo] = useState({
        city: "",
        country: "",
    });

    useEffect(() => {
      setLoading(true);
      
      onAuthStateChanged(auth, (user) => { 
        setLoading(false);
  
        if (user) {
          setIsAuth(true);
          const { uid } = user;
          const ref = doc(db, 'registerUsers', uid);
  
            getDoc(ref).then((userData) => {
              if (userData.exists()) {
                setUserProfileInfo(userData.data()) 
              }
            });
        }
      });
    }, []);

    return (
      <LoadingWrapper loading={loading} fullScreen>
        <AuthContextProvider value={{ isAuth, userProfileInfo, setIsAuth }}>
          <HotelSearchProvider>
            <RouterProvider router={route}/>
          </HotelSearchProvider>
        </AuthContextProvider>
      </LoadingWrapper>
    );
}

export default App;
