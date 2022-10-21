import React from "react";
import Navbar from "../components/Navbar";
import checkAuth from "../helper/checkAuth";

const Dashboard = () => {

    return (
        <div className="">
            <Navbar login={checkAuth()} />
            <div className="bg-slate-500 text-white">
                <div className="text-left px-7 pb-2 pt-4 text-xl font-semibold">
                    Dashboard
                </div>
                <div className="text-left px-7 pt-2 pb-4 text-base text-gray-200">
                    Welcome to a journey that you can't imagine before
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
