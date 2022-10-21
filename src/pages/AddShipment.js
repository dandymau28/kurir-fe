import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import checkAuth from "../helper/checkAuth";
import clearAuth from "../helper/clearAuth";
import shipmentServices from "../services/shipments/shipmentServices";

const AddShipment = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        let payload = {
            awb_no: data.spb_number,
            client_name: data.client_name,
            client_address: data.client_address,
        };

        shipmentServices
            .addShipment(payload)
            .then((result) => result.data)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil input!",
                    text: "Selamat mengantar!",
                    timer: 2000,
                }).then(() => {
                    navigate("/shipment");
                });
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
                    title: "Failed to save",
                    text: message,
                });
            });
    };

    return (
        <>
            <Navbar login={checkAuth()} />
            <div className="mx-20 my-8">
                <div className="flex justify-center">
                    <span className="text-base font-semibold">
                        Mulai Pengantaran!
                    </span>
                </div>
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-44 my-10 p-10 border-solid border-1 border-gray-600 bg-opacity-60 rounded-md">
                            <div className="my-1 mb-4">
                                <div className="flex justify-between">
                                    <label>SPB Number</label>
                                    {errors.spb_number && (
                                        <span className="text-red-600 text-opacity-80 font-semibold text-xs">
                                            {errors?.spb_number?.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    {...register("spb_number", {
                                        required: "Nomor SPB harus diisi!",
                                    })}
                                    className="rounded-md w-full border-solid border-1 border-gray-400 focus:border-sky-300 focus:border-opacity-30 focus:border-b-4"
                                />
                            </div>
                            <div className="my-1 mb-4">
                                <div className="flex justify-between">
                                    <label>Client Name</label>
                                    {errors.client_name && (
                                        <span className="text-red-600 text-opacity-80 font-semibold text-xs">
                                            {errors?.client_name?.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    {...register("client_name", {
                                        required: "Nama Klien harus diisi!",
                                    })}
                                    className="rounded-md w-full border-solid border-1 border-gray-400 focus:border-sky-300 focus:border-opacity-30 focus:border-b-4"
                                />
                            </div>
                            <div className="my-1 mb-4">
                                <div className="flex justify-between">
                                    <label>Client Address</label>
                                    {errors.client_address && (
                                        <span className="text-red-600 text-opacity-80 font-semibold text-xs">
                                            {errors?.client_address?.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type="client_address"
                                    {...register("client_address", {
                                        required: "Alamat Klien harus diisi!",
                                    })}
                                    className="rounded-md w-full border-solid border-1 border-gray-400 focus:border-sky-300 focus:border-opacity-30 focus:border-b-4"
                                />
                            </div>
                            <input
                                type="submit"
                                className="p-2 bg-blue-500 hover:bg-blue-700 rounded-md text-white"
                                value="Antar"
                            />
                            <button
                                className="p-2 bg-red-500 hover:bg-red-700 rounded-md m-1 text-white"
                                onClick={() => navigate(-1)}
                            >
                                Kembali
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddShipment;
