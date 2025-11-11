import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCityById } from '../api/citysApi';
import type { ICity } from '../types';
import { DefaultImage } from '../components/CityCard';
import {CustomBreadcrumbs} from '../components/Breadcrumbs'
import './styles/CityDetailPage.css';

export const CityDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [city, setCity] = useState<ICity | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getCityById(id)
                .then(data => setCity(data))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const displayImage = city?.image || DefaultImage;

    if (loading) {
        return (
            <div className="city-detail-page">
                <Spinner animation="border" variant="danger" style={{ width: '3rem', height: '3rem' }} />
            </div>
        );
    }

    if (!city) {
        return (
            <Container className="mt-5 pt-5 text-center">
                <h2>Город не найден</h2>
                <Link to="/citys">
                    <Button variant="outline-danger" className="mt-3">Вернуться к списку</Button>
                </Link>
            </Container>
        );
    }

    const breadcrumbs = [
        { label: 'Города', path: '/citys' },
        { label: city.name, active: true },
    ];

    return (
        <div className="city-detail-page">
           <div className="city-background" />
            <div className="city-content-card">
                 <div className="mb-4">
                    <CustomBreadcrumbs crumbs={breadcrumbs} />
                </div>
                <Row className="align-items-center g-5">
                    <Col lg={5}>
                        <div className="city-image-wrapper">
                            <img src={`http://127.0.0.1:9000/web/${displayImage}`} alt={city.name} className="city-main-image" />
                        </div>
                    </Col>
                    <Col lg={7}>
                        <h1 className="display-5 factor-title">{city.name}</h1>
                        <div className="city-text">
                            <p>{city.description}</p>
                        </div>                
                        <Button className='all-btn mt-4 px-4 py-2' variant="danger" size="lg">
                            Добавить в расчет
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};