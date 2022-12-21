import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/CartContext"
import { GetProductInfo, ProductInfo } from "../service/ProductInfo"
import { CartItem } from "./CartItem"

interface ShoppingCartProps {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart()
  const item = GetProductInfo()?.products.find(i => i.uuid === cartItems.find(d => d.uuid)?.uuid)
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem id={item.uuid} key={item.uuid} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total {" "} 
            {
              cartItems.reduce((total, cartItem) => {
                return total + Number(item?.price || 0) * cartItem.quantity
              }, 0) + "€" 
            }
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
