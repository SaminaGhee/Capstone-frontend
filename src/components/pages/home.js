import React, { useState, useEffect } from 'react';
import Carousel from './carousel';
import { useParams } from 'react-router-dom';

const Home = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);


    const { setCart } = props;

    useEffect(() => { 
        console.log(typeof setCart);
        getItems();
    }, []);

    const getItems = () => {
        fetch('http://127.0.0.1:5000/products', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.log('Error fetching product data:', error);
            });
    }

    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
        setTotalPrice(prevTotalPrice => prevTotalPrice + parseFloat(product.price))
        };
    
        
    return (
        <div>
            <div className='carousel-container'>
                <Carousel images={products} />
            </div >
            <h2>Products</h2>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="product-container">
                        {products.map((product, index) => (
                            <div key={index} className='product'>
                                <img src={product.image} alt={product.name} />
                                <p>{product.name} - ${product.price}</p>
                                <button onClick={() => addToCart(product)}>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Home;