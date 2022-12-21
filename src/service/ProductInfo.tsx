import { useEffect, useState } from "react";
import { Container, Card, Button, Col, Row, CardGroup, ThemeProvider } from "react-bootstrap";
import { useShoppingCart } from "../context/CartContext";

export interface ProductData {
    products:[{
        uuid: string;
        images: any;
        tags: any;
        name: string;
        price: string;
        description_small: string;
        SKU: string;
    }]
}

export const GetProductInfo = () => {
    const url = "https://ecom-test.itpr.eu/api/products";
    const token = "x0E0TmEpvZabHdGzRvCi62RPAKf8qLcH";
    const config = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    };

    const [product, setProduct] = useState<ProductData>()
    useEffect(() => {
        async function getProducts(): Promise<ProductData> { 
            const response = await fetch(url, config);
            const res = await response.json();
            return setProduct(res) as unknown as ProductData;
         }
        getProducts();
    }, [])

    return product
}

export const ProductInfo = (): JSX.Element => {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      } = useShoppingCart();

    return(
        <ThemeProvider>
            <Container style={{display:'flex', paddingTop: 30, paddingBottom: 30}} className="justify-content-center">
                <Row>
                    {GetProductInfo()?.products.map(data => {
                        const quantity = getItemQuantity(data.uuid);

                        return(
                            <Col style={{paddingBottom: 8}}>
                                <CardGroup>
                                    <Col className="text-center" xs={12}  md={12}>
                                        <Card className="d-flex align-items-center justify-content-center"  border="dark" style={{  paddingBottom: 5 }}>
                                            <Card.Img style={{width:"200px", }}  src={data.images} />
                                            <Col>
                                                <Card.Body>
                                                    <Card.Title>
                                                        {data.name}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        {data.description_small}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <strong className="h4">{`${data.price}€`}</strong>
                                                    </Card.Text>
                                                    <div
                                                        className="d-flex align-items-center flex-column"
                                                        style={{ gap: ".5rem" }}
                                                    >
                                                        <div
                                                            className="d-flex align-items-center justify-content-center"
                                                            style={{ gap: ".5rem" }}
                                                        >
                                                            <Button onClick={() => decreaseCartQuantity(data.uuid)}>-</Button>
                                                            <div>
                                                                <span className="fs-3">{quantity}</span> in cart
                                                            </div>
                                                            <Button onClick={() => {increaseCartQuantity(data.uuid)}}>+</Button>
                                                        </div>
                                                        <Button
                                                            onClick={() => removeFromCart(data.uuid)}
                                                            variant="danger"
                                                            size="sm"
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Col>
                                        </Card>
                                    </Col>
                                </CardGroup>
                            </Col>
                        )
                    })}
                </Row>
            </Container> 
        </ThemeProvider>
    )}
