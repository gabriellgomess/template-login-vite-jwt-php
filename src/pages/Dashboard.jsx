import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {MyContext} from '../contexts/MyContext';


const Dashboard = () => {
    const {rootState,logoutUser} = useContext(MyContext);
    const {isAuth, theUser } = rootState;

    return (
        <div>
            <button onClick={logoutUser}>Logout</button>
            <h1>Dashboard</h1>
       
        </div>
    );
}

export default Dashboard;