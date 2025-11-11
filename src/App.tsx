import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AppNavbar } from './components/Navbar';
import { HomePage } from './pages/RoutHomePage';
import { CitysListPage } from './pages/CitysListPage';
import { CityDetailPage } from './pages/CityDetailPage';

const MainLayout = () => (
    <>
        <AppNavbar />
        <main>
            <Outlet />
        </main>
    </>
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<MainLayout />}>
                    <Route path="/citys" element={<CitysListPage />} />
                    <Route path="/citys/:id" element={<CityDetailPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;