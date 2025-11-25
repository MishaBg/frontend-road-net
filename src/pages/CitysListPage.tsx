import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner, Form, Badge, Image, Button } from 'react-bootstrap'; // 1. Добавляем Button
import { CityCard } from '../components/CityCard';
import { getCitys, getCartBadge} from '../api/citysApi';
import { setSearchTerm, selectSearchTerm } from '../store/slices/filterSlice';
import { dest_root } from '../config/tauri_config';
import type { AppDispatch } from '../store';
import type { ICity, ICartBadge} from '../types';
import './styles/CitysListPage.css';

const cartImage = `${dest_root}/mock_images/cart.png`;

export const CitysListPage = () => {
    const [citys, setCitys] = useState<ICity[]>([]);
    const [loading, setLoading] = useState(true);
    const [cartBadge, setCartBadge] = useState<ICartBadge>({ city_id: null, count: 0 });
    const isCartActive = cartBadge.count > 0 && cartBadge.city_id !== null;
    const dispatch = useDispatch<AppDispatch>();
    const searchTerm = useSelector(selectSearchTerm);

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
        fetchCitys(searchTerm);

        getCartBadge().then(cartData => {
            setCartBadge(cartData);
        });
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
                                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                            />
                            <Button variant="danger" type="submit" disabled={loading}>
                                {loading ? 'Поиск...' : 'Искать'}
                            </Button>
                            <div className="cart-wrapper">
                                <Image src="http://172.20.10.3:9000/web/cart.png" alt="Корзина" width={32} />
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