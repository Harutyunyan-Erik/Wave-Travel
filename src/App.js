// import React, { useState, useEffect } from 'react';
// import MainLayout from './view/layouts/MainLayout';
// import LoadingWrapper from './view/components/shared/LoadingWrapper';
// import { AuthContextProvider } from './context/AuthContext';
// import MainPage from './view/components/global/MainPage';
// import AmadeusApp from './services/Amadeus';
// import { Login, Register } from './view/pages/auth';
// import  HotelSearch  from './view/components/global/HotelSearch';
// import { HotelSearchProvider } from './view/components/global/HotelSearch/HotelSearchProvider';
// import { db, auth, doc, getDoc, onAuthStateChanged } from './services/Firebase/firebase';
// import {  
//   Route, 
//   RouterProvider,
//   createHashRouter,
//   createRoutesFromElements,
// } from 'react-router-dom';

// const route = createHashRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<MainLayout />}>
//         <Route index element={<MainPage />} /> 
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//         <Route path="hotel-search" element={<HotelSearch />} />
//     </Route>
//   )
// );

// const App = () => {
//     const [isAuth, setIsAuth] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [userProfileInfo, setUserProfileInfo] = useState({
//         city: "",
//         country: "",
//     });

//     useEffect(() => {
//       setLoading(true);
      
//       onAuthStateChanged(auth, (user) => { 
//         setLoading(false);
  
//         if (user) {
//           setIsAuth(true);
//           const { uid } = user;
//           const ref = doc(db, 'registerUsers', uid);
  
//             getDoc(ref).then((userData) => {
//               if (userData.exists()) {
//                 setUserProfileInfo(userData.data()) 
//               }
//             });
//         }
//       });
//     }, []);

//     return (
//       <LoadingWrapper loading={loading} fullScreen>
//         <AuthContextProvider value={{ isAuth, userProfileInfo, setIsAuth }}>
//           <HotelSearchProvider>
//             {/* <RouterProvider router={route}/> */}
//             <AmadeusApp />
//           </HotelSearchProvider>
//         </AuthContextProvider>
//       </LoadingWrapper>
//     );
// }

// export default App;




import React, { useState, useEffect } from 'react';
import MainLayout from './view/layouts/MainLayout';
import LoadingWrapper from './view/components/shared/LoadingWrapper';
import { AuthContextProvider } from './context/AuthContext';
import MainPage from './view/components/global/MainPage';
import { Login, Register } from './view/pages/auth';
import HotelSearch from './view/components/global/HotelSearch';
import { HotelSearchProvider } from './view/components/global/HotelSearch/HotelSearchProvider';
import { db, auth, doc, getDoc, onAuthStateChanged } from './services/Firebase/firebase';
import { Route, createHashRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import AmadeusApp from './services/Amadeus';

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
  const [loading, setLoading] = useState(true);
  const [userProfileInfo, setUserProfileInfo] = useState({
    city: "",
    country: "",
  });
  const [amadeusData, setAmadeusData] = useState(null);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setIsAuth(true);
        const { uid } = user;
        const ref = doc(db, 'registerUsers', uid);

        getDoc(ref).then((userData) => {
          if (userData.exists()) {
            setUserProfileInfo(userData.data());
          }
        });
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    async function fetchAmadeusData() {
      try {
        const results = await AmadeusApp();
        setAmadeusData(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setFetchingData(false);
      }
    }

    fetchAmadeusData();
  }, []);

  if (loading || fetchingData) return <LoadingWrapper loading={true} fullScreen />;
  if (error) return <div>Error: {error}</div>;

  return (
    <AuthContextProvider value={{ isAuth, userProfileInfo, setIsAuth }}>
      <HotelSearchProvider>
        <RouterProvider router={route} />
      </HotelSearchProvider>
    </AuthContextProvider>
  );
};

export default App;
