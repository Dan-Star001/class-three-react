import React from 'react';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';


const Profile = () => {
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
        <StyledWrapper>
            <>
                <div style={{display: "flex", justifyContent: "space-around", marginTop: "50px"}}>
                    <div className="form-container">
                        <p className="title">Sign Up</p>
                        <form className="form">
                            <div className="input-group">
                                <label htmlFor="firstName">Firstname</label>
                                <input type="text" name="firstName" id="firstName"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="lastName">Lastname</label>
                                <input type="text" name="lastName" id="lastName"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="Profile">Profile Image</label>
                                <input type="file" name="profileImage" id="profileImage"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" name="email" id="email"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="PhoneNo">Phone Number</label>
                                <input type="text" name="phoneNo" id="phoneNo"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password"/>
                                <div className="forgot">
                                <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                                </div>
                            </div>
                            <button className="sign">Sign Up</button>
                        </form>
                        <div className="social-message">
                            <div className="line" />
                            <p className="message">Login with social accounts</p>
                            <div className="line" />
                        </div>
                        <div className="social-icons">
                            <button aria-label="Log in with Google" className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
                                </svg>
                            </button>
                            <button aria-label="Log in with Twitter" className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z" />
                                </svg>
                            </button>
                            <button aria-label="Log in with GitHub" className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
                                </svg>
                            </button>
                        </div>
                        <p className="signup">Don't have an account?
                        <a rel="noopener noreferrer" href="#">Sign up</a>
                        </p>
                    </div>

                    <div style={{width: "60%", display:"flex", flexWrap: "wrap", gap: "40px"}}> 
                        <div className="card">
                            <div className="card__avatar">
                                <img src={null} style={{backgroundImage: "url('data:image/jpeg;base64,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')", borderRadius: "100%", width: "100px", height: "100px", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} alt="" />
                            </div>
                            <div className="card__title">Cameron Williamson</div>
                            <div className="card__subtitle">
                                <p style={{fontSize: "18px", margin: "0 0 10px"}}>daniel@gmail.com</p>
                                <p style={{textAlign: "center", margin: "0 0 20px"}}>090567838372</p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card__avatar">
                                <img src={null} style={{backgroundImage: "url('data:image/jpeg;base64,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')", borderRadius: "100%", width: "100px", height: "100px", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} alt="" />
                            </div>
                            <div className="card__title">Cameron Williamson</div>
                            <div className="card__subtitle">
                                <p style={{fontSize: "18px", margin: "0 0 10px"}}>daniel@gmail.com</p>
                                <p style={{textAlign: "center", margin: "0 0 20px"}}>090567838372</p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card__avatar">
                                <img src={null} style={{backgroundImage: "url('data:image/jpeg;base64,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')", borderRadius: "100%", width: "100px", height: "100px", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} alt="" />
                            </div>
                            <div className="card__title">Cameron Williamson</div>
                            <div className="card__subtitle">
                                <p style={{fontSize: "18px", margin: "0 0 10px"}}>daniel@gmail.com</p>
                                <p style={{textAlign: "center", margin: "0 0 20px"}}>090567838372</p>
                            </div>
                        </div>

                                                <div className="card">
                            <div className="card__avatar">
                                <img src={null} style={{backgroundImage: "url('data:image/jpeg;base64,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')", borderRadius: "100%", width: "100px", height: "100px", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} alt="" />
                            </div>
                            <div className="card__title">Cameron Williamson</div>
                            <div className="card__subtitle">
                                <p style={{fontSize: "18px", margin: "0 0 10px"}}>daniel@gmail.com</p>
                                <p style={{textAlign: "center", margin: "0 0 20px"}}>090567838372</p>
                            </div>
                        </div>
                    </div>


                </div>
            </>
        </StyledWrapper>



    );
}


const StyledWrapper = styled.div`
    .form-container {
        width: 400px;
        // margin-left: 300px;
        border-radius: 0.75rem;
        background-color: rgba(17, 24, 39, 1);
        padding: 2rem;
        color: rgba(243, 244, 246, 1);
        // margin-top: 50px;
    }

    .title {
        text-align: center;
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700;
    }

    .form {
        margin-top: 1.5rem;
    }

    .input-group {
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
    }

    .input-group label {
        display: block;
        color: rgba(156, 163, 175, 1);
        margin-bottom: 4px;
    }

    .input-group input {
        width: 90%;
        display: block;
        border-radius: 0.375rem;
        border: 1px solid rgba(55, 65, 81, 1);
        outline: 0;
        background-color: rgba(17, 24, 39, 1);
        padding: 0.75rem 1rem;
        color: rgba(243, 244, 246, 1);
    }

    .input-group input:focus {
        border-color: rgba(167, 139, 250);
    }

    .forgot {
        display: flex;
        justify-content: flex-end;
        font-size: 0.75rem;
        line-height: 1rem;
        color: rgba(156, 163, 175,1);
        margin: 8px 0 14px 0;
    }

    .forgot a,.signup a {
        color: rgba(243, 244, 246, 1);
        text-decoration: none;
        font-size: 14px;
    }

    .forgot a:hover, .signup a:hover {
        text-decoration: underline rgba(167, 139, 250, 1);
    }

    .sign {
        display: block;
        width: 100%;
        background-color: rgba(167, 139, 250, 1);
        padding: 0.75rem;
        text-align: center;
        color: rgba(17, 24, 39, 1);
        border: none;
        border-radius: 0.375rem;
        font-weight: 600;
    }

    .social-message {
        display: flex;
        align-items: center;
        padding-top: 1rem;
    }

    .line {
        height: 1px;
        flex: 1 1 0%;
        background-color: rgba(55, 65, 81, 1);
    }

    .social-message .message {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: rgba(156, 163, 175, 1);
    }

    .social-icons {
        display: flex;
        justify-content: center;
    }

    .social-icons .icon {
        border-radius: 0.125rem;
        padding: 0.75rem;
        border: none;
        background-color: transparent;
        margin-left: 8px;
    }

    .social-icons .icon svg {
        height: 1.25rem;
        width: 1.25rem;
        fill: #fff;
    }

    .signup {
        text-align: center;
        font-size: 0.75rem;
        line-height: 1rem;
        color: rgba(156, 163, 175, 1);
    }


        
    .card {
    --main-color: #000;
    --submain-color: #78858F;
    --bg-color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    // position: relative;
    width: 40%;
    height: 30vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    background: var(--bg-color);
    }

    .card__img {
        height: 192px;
        width: 100%;
    }

    .card__img svg {
        height: 100%;
        border-radius: 20px 20px 0 0;
    }

    .card__avatar {
        width: 114px;
        height: 114px;
        background: var(--bg-color);
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }


    .card__title {
        // margin-top: 60px;
        font-weight: 500;
        font-size: 18px;
        color: var(--main-color);
    }

    .card__subtitle {
        margin-top: 20px;
        font-weight: 400;
        font-size: 15px;
        color: var(--submain-color);
    }
    `;


    

export default Profile





