import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
    const { cartItems, setIsCartOpen, isCartOpen } = useContext(CartContext);

    const navigate = useNavigate();

    const goToCheckoutHandler = () =>{
        toggleIsCartOpen()
        navigate('/checkout');
    }

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartDropdownContainer>            
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    ))
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>

        </CartDropdownContainer>

    );

};

export default CartDropdown;