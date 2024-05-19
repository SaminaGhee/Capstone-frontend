import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const Cart = ({cartItems, setCart}) => {
  console.log("Cart Items: ", cartItems)
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch('https://capstone-ecom-back-0acc37750539.herokuapp.com/products', { method: 'GET' })  
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error fetching product data:', error);
        setLoading(false);
      });
  }, []);

  const getPrice = (items) => {
      let total = 0;

      items.forEach(item => {
        total += parseFloat(item.price);
      })
      console.log(total)
      return total.toFixed(2)
  }

  const updateTotalPrice = (price) => {
    setTotalPrice(parseFloat(price).toFixed(2));
  }

  const removeFromCart = (productId) => {
    const removedProduct = cartItems.find(item => item.id === productId);
    if (removedProduct) {
      const updatedCart = cartItems.filter(item => item.id !== productId);
      setCart(updatedCart);
      updateTotalPrice(parseFloat(totalPrice) - parseFloat(removedProduct.price));
    }
  }

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
  }

  return user ? (
    <div className="shop-container">
      <div>
        <h2>Shopping Cart</h2>
        <div>
          {cartItems.map((product, index) => (
            <div key={index}>
              <p>{product.name} - ${product.price}</p>
              <div className="remove-item">
                <a
                  className="remove-icon"
                  onClick={() => removeFromCart(product.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </a>
              </div>
            </div>
          ))}
        </div>
        <p>Total Price: ${getPrice(cartItems)}</p>
        <button onClick={clearCart}>Pay</button>
      </div>

    </div>
  ) : null;
}
export default Cart;  