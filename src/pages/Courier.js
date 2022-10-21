import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import checkAuth from "../helper/checkAuth";
import clearAuth from "../helper/clearAuth";
import userServices from "../services/users/userServices";

const Courier = () => {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const column = [
        {
            headerName: "Username",
            field: "username",
            flex: 1,
        },
        {
            headerName: "Name",
            field: "name",
            flex: 1,
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();

                    const { api } = params;
                    const thisRow = {}

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c) =>
                                (thisRow[c.field] = params.getValue(
                                    params.id,
                                    c.field
                                ))
                        );
                        
                    return navigate(`/courier/${params.row.id}/edit`)
                    // console.log("this row data", params.row)
                };
                
                return <button className="p-2 bg-blue-500 rounded-lg hover:bg-blue-700" onClick={onClick}>Click Me</button>
            },
        },
    ];

    const clickAddCourier = () => {
        return navigate("/courier/add")
    }

    useEffect(() => {
        userServices
            .getAllCourier()
            .then((result) => {
                let { data: response } = result;
                let { data } = response;
                return data;
            })
            .then((data) => {
                setRows(data);
            })
            .catch((err) => {
                let message = err?.response?.data?.message || err.message;
                let statusCode = err?.response?.status || 0;

                if (statusCode === 401) {
                    let isAuthenticated = checkAuth();
                    console.log(isAuthenticated);

                    if (!isAuthenticated) {
                        clearAuth();
                        navigate("/login");
                    }
                }

                Swal.fire({
                    icon: "error",
                    title: "Failed to retrieve data",
                    text: message,
                });
            })
    }, [setRows, navigate]);

    return (
        <>
            <Navbar login={checkAuth()} />
            <div className="flex justify-end">
                <button className="p-2 mt-4 desktop:mr-72 bg-green-400 rounded-lg hover:bg-green-600 tablet:mr-36 laptop:mr-48" onClick={clickAddCourier}>
                    Add Courier
                </button>
            </div>
            <div
                style={{
                    margin: 25,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div style={{ height: 500, width: "85%" }}>
                    <DataGrid rows={rows} columns={column} />
                </div>
            </div>
        </>
    );
};

export default Courier;
