import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from '../redux/counterSlice';

const Dashboard = () => {
    let count = useSelector(state => state.counterReducer.counter)
    // useSelector(function (state) { return state })
    // console.log(count);
    let dispatch = useDispatch()

    let navigate = useNavigate()
    useEffect(() => {
        getDashboard()
    }, [])
    let token = localStorage.token
    let url = "http://localhost:2846/user/dashboard"
    const getDashboard = ()=>{
        axios.get(url,{
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then((res)=>{
            if(!res.data.status){
                localStorage.removeItem(token)
                navigate("/signin")
            }
            else{
                console.log(res);
                
            }
        })
        .catch((err)=>{
            console.error("Error:",err.response?err.response.data:err);
        })
    }    
    return (
        <>
            <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif", backgroundColor: "#f0f0f0" }}>
                <h1>Welcome to the Dashboard</h1>
                <p>This is a protected route. Only logged-in users can see this.</p>
                <button> <Link to="/signin">Logout</Link> </button>
                <p>Additional content can go here.</p>
            </div>

            <div>
                <h1>Counter Value from Redux: {count}</h1>
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
                <button onClick={() => dispatch(reset())}>Reset</button>
            </div>
        </>
    )
}

export default Dashboard