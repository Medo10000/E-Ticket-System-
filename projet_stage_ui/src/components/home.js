import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar/example";

export default class testpage extends Component {
    render() {
        return (
            <div>   
                <Navbar/> 
                <div className="flex flex-row">
                    <div className="d-flex align-items-center justify-content-center font-semibold text-6xl text-gray-800 mt-48 ml-12">
                        <p>Découvrez le nouveau système <br/> de gestion des tickets<br/> pour vos clients</p>
                        <Link to="/login" className="border bg-red-500 text-white font-semibold text-4xl font-sans lg:inline-block px-8 py-2 rounded-full mt-20">Commencez</Link>
                    </div>                   
                    <div><img src={require('../components/assets/illustration.jpg')} /></div>
                </div>
                
                
            </div>
        );
        }
};