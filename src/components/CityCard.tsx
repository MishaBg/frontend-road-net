import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dest_root } from '../config/tauri_config';
import type { CityCardProps } from '../types';
import './styles/CityCard.css'

export const DefaultImage = `${dest_root}/mock_images/default.jpeg`;


export const CityCard: React.FC<CityCardProps> = ({ city }) => {

    const imageSrc = city.image || DefaultImage;

    return (
        <div className="p-4 border rounded shadow-sm h-100 bg-light city-card">
            <Row className="align-items-center">
                <Col xs={4} md={3}>
                    <img src={imageSrc} alt={city.name} className="img-fluid"/>
                </Col>
                <Col xs={8} md={9}>
                    <div className="d-flex flex-column justify-content-between h-100">
                        <h5 className="fw-bold mb-3">{city.name}</h5>
                        <div className="d-flex gap-2">
                            <Link to={`/city/${city.id}`} className="text-decoration-none">
                                <Button className='all-btn' variant="danger">
                                    Подробнее
                                </Button>
                            </Link>
                            <Button className='all-btn' variant="danger">
                                Добавить
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};