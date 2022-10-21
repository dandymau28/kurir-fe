import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import checkAuth from "../helper/checkAuth";
import clearAuth from "../helper/clearAuth";
import shipmentServices from "../services/shipments/shipmentServices";
import moment from "moment";
import Navbar from "../components/Navbar";

const Shipment = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [isUpdate, setUpdate] = useState(false);

    const column = [
        {
            headerName: "SPB Number",
            field: "awb_number",
            flex: 1,
        },
        {
            headerName: "Name",
            field: "name",
            flex: 1,
        },
        {
            headerName: "Client Name",
            field: "client_name",
            flex: 1,
        },
        {
            headerName: "Start Delivery At",
            field: "created_at",
            flex: 1,
            valueGetter: (params) => {
                return moment(params.row.created_at).format(
                    "D MMM YYYY HH:mm:ss"
                );
            },
        },
        {
            headerName: "Last Update At",
            field: "updated_at",
            flex: 1,
            valueGetter: (params) => {
                return moment(params.row.updated_at).format(
                    "D MMM YYYY HH:mm:ss"
                );
            },
        },
        {
            headerName: "Status",
            field: "status",
            flex: 1,
            renderCell: (params) => {
                let color

                let status = params.row.status
                let splittedStatus = status.split("_")
                let newStatus = splittedStatus.join(" ");

                switch(params.row.status) {
                    case "on_process": 
                        color = "bg-yellow-400";
                        break;
                    case "delivered":
                        color = "bg-green-400";
                        break;
                    default: 
                        color = "bg-red-500";
                        break;
                }

                let style = `rounded-md p-1 font-base ${color}`

                return (<span className={style}>{newStatus.toUpperCase()}</span>)
            }
        },
        {
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
                const submitDelivery = (shipment_id) => {
                    shipmentServices.updateDelivery(shipment_id)
                    .then((result) => result.data)
                    .then((response) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil update',
                            text: 'Terima kasih telah mengantar!',
                            timer: 3000                
                        })
                        .then((result) => {
                            setUpdate(!isUpdate);
                        })
                    })
                }
            
                let statusShipment = params.row.status

                return statusShipment !== "delivered" ?  (
                    <button className="p-2 bg-blue-400 rounded-md hover:bg-blue-800" onClick={() => submitDelivery(params.row.id)}>Selesai Antar!</button>
                ) : ( <span className="p-2 bg-green-400 rounded-md">Sudah Diantar!</span>)
            }
        }
    ];
    useEffect(() => {
        shipmentServices
            .getAll()
            .then((result) => result.data)
            .then((response) => {
                setRows(response.data);
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
            });
    }, [setRows, navigate, isUpdate]);

    const clickAddShipment = () => {
        navigate("/shipment/add");
    };

    const isCourier = () => {
        let role = localStorage.getItem("role");

        return role === "kurir";
    };

    return (
        <>
            <Navbar login={checkAuth()} />
            {isCourier() && (
                <div className="flex justify-end">
                    <button
                        className="p-2 mt-4 desktop:mr-72 bg-green-400 rounded-lg hover:bg-green-600 tablet:mr-36 laptop:mr-48"
                        onClick={clickAddShipment}
                    >
                        Add Shipment
                    </button>
                </div>
            )}
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

export default Shipment;
