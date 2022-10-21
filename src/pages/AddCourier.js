import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import checkAuth from "../helper/checkAuth";
import loginServices from "../services/auth/loginServices";

const AddCourier = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        let payload = {
            username: data.username,
            name: data.name,
            password: data.password,
            role: "kurir",
        };

        loginServices
            .register(payload)
            .then((result) => result.data)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil menambahkan kurir",
                    timer: 2000,
                }).then(() => {
                    navigate("/courier");
                });
            })
            .catch((error) => {
                let message = error?.response?.data?.error[0] || error?.response?.data?.message || error.message;
                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: message,
                    timer: 2000,
                });
            });
    };

    return (
      <>
        <Navbar login={checkAuth()} />
        <div className="mx-20 my-8">
            <div className="flex justify-center">
                <span className="text-base font-semibold">
                    Tambah Data Kurir
                </span>
            </div>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mx-44 my-10 p-10 border-solid border-1 border-gray-600 bg-opacity-60 rounded-md">
                        <div className="my-1 mb-4">
                            <div className="flex justify-between">
                                <label>Username</label>
                                {errors.username && (
                                    <span className="text-red-600 text-opacity-80 font-semibold text-xs">
                                        {errors?.username?.message}
                                    </span>
                                )}
                            </div>
                            <input
                                type="text"
                                {...register("username", {
                                    required: "Username harus diisi!",
                                })}
                                className="rounded-md w-full border-solid border-1 border-gray-400 focus:border-sky-300 focus:border-opacity-30 focus:border-b-4"
                            />
                        </div>
                        <div className="my-1 mb-4">
                            <div className="flex justify-between">
                                <label>Name</label>
                                {errors.name && (
                                    <span className="text-red-600 text-opacity-80 font-semibold text-xs">
                                        {errors?.name?.message}
                                    </span>
                                )}
                            </div>
                            <input
                                type="text"
                                {...register("name", {
                                    required: "Name harus diisi!",
                                })}
                                className="rounded-md w-full border-solid border-1 border-gray-400 focus:border-sky-300 focus:border-opacity-30 focus:border-b-4"
                            />
                        </div>
                        <div className="my-1 mb-4">
                            <div className="flex justify-between">
                                <label>Password</label>
                                {errors.password && (
                                    <span className="text-red-600 text-opacity-80 font-semibold text-xs">
                                        {errors?.password?.message}
                                    </span>
                                )}
                            </div>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password harus diisi!",
                                })}
                                className="rounded-md w-full border-solid border-1 border-gray-400 focus:border-sky-300 focus:border-opacity-30 focus:border-b-4"
                            />
                        </div>
                        <input
                            type="submit"
                            className="p-2 bg-blue-500 hover:bg-blue-700 rounded-md"
                            value="Tambah"
                        />
                    </div>
                </form>
            </div>
        </div>
      </>
    );
};

export default AddCourier;
