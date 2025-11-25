import { BrowserRouter, HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AppNavbar } from './components/Navbar';
import { HomePage } from './pages/RoutHomePage';
import { CitysListPage } from './pages/CitysListPage';
import { CityDetailPage } from './pages/CityDetailPage';
import { dest_root } from './config/tauri_config';

// Импортируем из Tauri API
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';

const MainLayout = () => (
    <>
        <AppNavbar />
        <main className="main-content">
            <Outlet />
        </main>
    </>
);

function App() {
    // Более надежная проверка через Tauri API
    const isTauri = typeof getCurrentWebviewWindow !== 'undefined';

    if (isTauri) {
        // Для Tauri используем HashRouter без basename
        return (
            <HashRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/cites" element={<CitysListPage />} />
                        <Route path="/city/:id" element={<CityDetailPage />} />
                    </Route>
                </Routes>
            </HashRouter>
        );
    }

    return (
       <BrowserRouter basename={dest_root}> 
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cites" element={<CitysListPage />} />
                    <Route path="/city/:id" element={<CityDetailPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;