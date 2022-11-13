import React, { Component } from "react";
import Sidebar from "./sidebar/sidebar";
import DropdownMenu from "./logout/DropdownMenu";

export default class testpage extends Component {
    render() {
        return (
            <>
            <div className="flex">
                <Sidebar/>
                <div className="mr-2">
                    <DropdownMenu/>
                </div>
                <div className="border d-flex align-items-center justify-content-center">Welcome Client</div>
                </div>
            </>
            
        );
        }
};