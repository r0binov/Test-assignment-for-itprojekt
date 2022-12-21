import { Navbar, Container, Nav, Button, } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { IconContext } from "react-icons/lib";
import { useShoppingCart } from "../context/CartContext";

export function NavBar() {
  const { openCart, cartQuantity } = useShoppingCart()
  return (
    <IconContext.Provider value={{size: "2em", color: "white"}}>
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href="/">
                    Kleidipood
                </Navbar.Brand>
                {cartQuantity > 0 && (
                    <Button
                        onClick={openCart}
                        style={{ width: "3rem", height: "3rem", position: "relative" }}
                        variant="outline-primary"
                        className="rounded-circle"
                    >
                        <div className="d-flex justify-content-center align-items-center">
                            <AiOutlineShoppingCart />
                        </div>
                        <div
                            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                            style={{
                                color: "white",
                                width: "1.5rem",
                                height: "1.5rem",
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                transform: "translate(25%, 25%)",
                            }}
                        >
                            {cartQuantity}
                        </div>
                    </Button>
                )}
            </Container>
        </Navbar>
    </IconContext.Provider>
  )
}
