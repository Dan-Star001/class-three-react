import React, { useEffect, useState } from 'react'



//To get the initial state from local storage
export const getInitialState = () => {
    const storedData = localStorage.getItem('myProducts');
    if (storedData) {
        return JSON.parse(storedData);
    }
    return [];
};


const Products = () => {
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productImage, setProductImage] = useState('')
    const [allProducts, setAllProducts] = useState(getInitialState)
    const [editIndex, setEditIndex] = useState(null)

    // Synchronize my products state with local storage
    useEffect(() => {
        localStorage.setItem('myProducts', JSON.stringify(allProducts));
    }, [allProducts]);


    const addProducts = () => {
        const id = allProducts.length > 0 ? Math.max(...allProducts.map(p => p.id)) + 1 : 1;
        let newProduct = {id, productName, productPrice, productDescription, productImage}

        if (editIndex !== null) {
            // Update Existing Product
            const updated = [...allProducts];
            updated[editIndex] = newProduct;
            setAllProducts(updated);
            setEditIndex(null);
        } else {
            // Add new Product
            setAllProducts([...allProducts, newProduct])
        }

        // Clear input fields
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductImage('');


    }

    const deleteItem = (productId) => {
        setAllProducts(allProducts.filter(product => product.id !== productId))
        console.log(`The Products at Number ${productId} has been removed`);
        
    }

    // Edit product (load values into input fields)
    const editItem = (index) => {
        const product = allProducts[index-1];
        console.log(product.productName);
        setProductName(product.productName);
        setProductPrice(product.productPrice);
        setProductDescription(product.productDescription);
        setProductImage(product.productImage);
        setEditIndex(index-1);        
    };  

    return (
        <>
            <h1>Mini Mart</h1>
            <p>Welcome to the Mini Mart! Your one-stop shop for all your needs.</p>
            <input id='input1' type="text" placeholder='Product Name' onChange={(e) => {setProductName(e.target.value)}} value={productName} />
            <input id='input2' type="number" placeholder='Product Price' onChange={(e) => {setProductPrice(e.target.value)}} value={productPrice}/>
            <input id='input3' type="text" placeholder='Product Description' onChange={(e) => {setProductDescription(e.target.value)}} value={productDescription}/>
            <input id='input4' type="text" placeholder='Product Image URL'  onChange={(e) => {setProductImage(e.target.value)}} value={productImage}/>
            <button onClick={addProducts}>{editIndex !== null ? "Update Product" : "Add Product"}</button>
            

            <div>
                {allProducts.map(product => (
                    <div key={product.id}>
                        <h3>{product.productName}</h3>
                        <h3>{product.productPrice}</h3>
                        <p>{product.productDescription}</p>
                        <div style={{backgroundImage: `url(${product.productImage})`, borderRadius: "100%", width: "100px", height: "100px", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                        <button onClick={() => deleteItem(product.id)}>Delete</button>
                        <button onClick={() => editItem(product.id)}>Edit</button>
                    </div>
                ))} 
            </div>
        </>
    )
}

export default Products