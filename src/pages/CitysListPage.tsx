import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Form, Badge, Image, Button } from 'react-bootstrap'; // 1. Добавляем Button
import { CityCard } from '../components/CityCard';
import { getCitys } from '../api/citysApi';
import type { ICity } from '../types';
import './styles/CitysListPage.css'; 

export const CitysListPage = () => {
    const [citys, setCitys] = useState<ICity[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [cartCount, setCartCount] = useState(1);

    const fetchCitys = (filterTitle: string) => {
        setLoading(true);
        getCitys(filterTitle)
        .then(data => {
            if (Array.isArray(data.items)) {
                setCitys(data.items);
            } else {
                console.error("Получены неверные данные:", data);
                setCitys([]);
            }
        })
        .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCitys('');
    }, []);

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault(); 
        fetchCitys(searchTerm);
    };

    return (
        <Container fluid className="pt-5 mt-4"> 
            <h1 className="text-center fs-3 fw-bold">Города</h1>
            <hr className="citys-header-line" />

            <Form onSubmit={handleSearchSubmit}>
                <Row className="justify-content-center mb-4">
                    <Col xs={12} md={10} lg={8}>
                        <div className="search-and-cart-wrapper">
                            <Form.Control
                                type="search"
                                placeholder="Введите название города для поиска..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="danger" type="submit" disabled={loading}>
                                {loading ? 'Поиск...' : 'Искать'}
                            </Button>
                            <div className="cart-wrapper">
                                <Image src="http://localhost:9000/web/cart.png" alt="Корзина" width={32} />
                                {/* {cartCount > 0 && (
                                    <Badge pill bg="danger" className="cart-indicator">
                                        {cartCount}
                                    </Badge>
                                )} */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Form>

            {loading ? (
                <div className="text-center"><Spinner animation="border" variant="danger" /></div>
            ) : (
                <Row className="justify-content-center">
                    <Col xs={12} lg={10}>
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {citys.map(city => (
                                <Col key={city.id}>
                                    <CityCard city={city} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            )}
        </Container>
    );
};