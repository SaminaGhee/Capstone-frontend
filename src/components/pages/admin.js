import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/admin.scss';
// import Login from '../auth/login';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [editingId, setEditingId] = useState(null);
    
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('https://capstone-ecom-back-0acc37750539.herokuapp.com/products')
        .then(response => {
            setProducts(response.data);
        }) 
        .catch (error => {
            console.error('Create error:', error);
        });
    }

    const addProduct = () => {
        const priceAsNumber = parseFloat(price);

                if (isNaN(priceAsNumber)) {
            console.log('Price must be a number');
            return;
        }

        axios.post('https://capstone-ecom-back-0acc37750539.herokuapp.com/products', { name, description, imageUrl, price: priceAsNumber })
        .then(response => {
            setProducts([...products, response.data]);
            setName('');
            setDescription('');
            setImageUrl('');
            setPrice('');
            fetchProducts();
        })
        .catch(error => {
            console.error('Error adding pillow:', error);
        });
    };

    const updateProduct = (id) => {
        axios.put(`https://capstone-ecom-back-0acc37750539.herokuapp.com/products/${id}`, { name, description, imageUrl, price })
        .then(response => {
            setProducts(products.map(product => (product.id === id ? response.data : product)));
            setName('');
            setDescription('');
            setImageUrl('');
            setPrice('');
            setEditingId(null);
            fetchProducts();
        })
        .catch(error => {
            console.error('Error updating pillow:', error);
        });
    };

    const deleteProduct = (id) => {
        axios.delete(`https://capstone-ecom-back-0acc37750539.herokuapp.com/products/${id}`)
        .then(() => {
            setProducts(products.filter(product => product.id !== id));
            fetchProducts();
        })
        .catch(error => {
            console.error('Error deleting pillow:', error);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            updateProduct(editingId);
        } else {
            addProduct();
        }
    };
    
    const handleEdit = (id) => {
        const productToEdit = products.find(product => product.id === id);
        if (productToEdit) {
            setName(productToEdit.name);
            setDescription(productToEdit.description);
            setImageUrl(productToEdit.imageUrl);
            setPrice(productToEdit.price);
            setEditingId(id);
        }
    };
    
    const handleCancelEdit = () => {
        setName('');
        setDescription('');
        setImageUrl('');
        setPrice('');
        setEditingId(null);
    };

    return (
        <div className='admin-container'>
            <h2 className='admin-header'>Welcome Admin!</h2>
            <form onSubmit={handleSubmit} className='admin-form'>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Image</label>
                <input type='text' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <label>Price</label>
                <input type='Text' value={price} onChange={(e) => setPrice(e.target.value)} />
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" className='admin-submit-btn'>{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button type="button" onClick={handleCancelEdit} className='admin-cancel-btn'>Cancel</button>}
            </form>
            <ul className='admin-product-list'>
                {products.map(product => (
                    <li key={product.id}>
                        <strong>{product.name}</strong>: {product.description}
                        <button onClick={() => handleEdit(product.id)} className='admin-edit-btn'>Edit</button>
                        <button onClick={() => deleteProduct(product.id)} className='admin-delete-btn'>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
    
}
export default Admin;