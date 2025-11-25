import { AppNavbar } from '../components/Navbar';
import backImage from '../../public/background/back.jpg';
import './styles/RoutHomePage.css';



export const HomePage = () => {
    return (
        <div className="homepage-wrapper">
            <AppNavbar />

            <div 
                className="home-page-container"
                style={{
                    backgroundImage: `url(${backImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="home-page-content">
                    <h1>Добро пожаловать в ROAD Calculator!</h1>
                    <p className="lead fs-4">Этот сервис предназначен для расчета дорожной сети.</p>
                </div>
            </div>
        </div>
    );
};