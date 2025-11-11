import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { ICity } from '../types';
import './styles/CityCard.css'

export const DefaultImage = 'http://localhost:9000/citys/default.png'

interface CityCardProps {
    city: ICity;
}

export const CityCard: React.FC<CityCardProps> = ({ city }) => {
    return (
        <div className="p-4 border rounded shadow-sm h-100 bg-light factor-card">
            <Row className="align-items-center">
                <Col xs={4} md={3}>
                    <img
                        src={`http://127.0.0.1:9000/web/${city.image}`}
                        alt={city.name}
                        className="img-fluid"
                        onError={(e) => {
                            e.currentTarget.src = DefaultImage;
                        }}
                    />
                </Col>
                <Col xs={8} md={9}>
                    <div className="d-flex flex-column justify-content-between h-100">
                        <h5 className="fw-bold mb-3">{city.name}</h5>
                        <div className="d-flex gap-2">
                            <Link to={`/citys/${city.id}`} className="text-decoration-none">
                                <Button className='all-btn' variant="danger">
                                    Подробнее
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};