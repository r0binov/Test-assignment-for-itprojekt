import { Container } from 'react-bootstrap';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { CartProvider } from './context/CartContext';
import { ProductInfo } from './service/ProductInfo';

function App() {

  return (
    <div className="App">
      <CartProvider>
        <NavBar/>
          <Container className="mb-4">
            <ProductInfo  />
          </Container>
        <Footer/>
      </CartProvider>
    </div>
  );
}

export default App;
