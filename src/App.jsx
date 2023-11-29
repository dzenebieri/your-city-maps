import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';

import { AuthProvider } from './contexts/FakeAuthContext';
import { CitiesProvider } from './contexts/CitiesContext';
import AppRouter from './pages/AppRouter';

import Form from './components/Form';
import City from './components/City';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import PageReLoader from './components/PageReLoader';

import Homepage from './pages/Homepage';
import About from './pages/About';
import Dev from './pages/Dev';
import Login from './pages/Login';
import AppStyle from './pages/AppStyle';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<PageReLoader />}>
            <Routes>
              <Route path='your-city-maps' index element={<Homepage />} />
              <Route path='your-city-maps/about' element={<About />} />
              <Route path='your-city-maps/dev' element={<Dev />} />
              <Route path='your-city-maps/login' element={<Login />} />
              <Route
                path='your-city-maps/maps'
                element={
                  <AppRouter>
                    <AppStyle />
                  </AppRouter>
                }
              >
                <Route index element={<Navigate replace to='cities' />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='countries' element={<CountryList />} />
                <Route path='form/location' element={<Form />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
