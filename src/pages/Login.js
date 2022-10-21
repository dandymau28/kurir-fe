import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import checkAuth from "../helper/checkAuth";
import loginServices from "../services/auth/loginServices";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        let payload = {
            username: data.username,
            password: data.password,
        };

        loginServices
            .login(payload)
            .then((result) => {
                let { data: response } = result;
                let { data } = response;

                Swal.fire({
                    icon: "success",
                    titleText: "Success!",
                    text: `Welcome ${data.username}!`,
                }).then(() => {
                    localStorage.setItem("username", data.username);
                    localStorage.setItem("access_token", data.token);
                    localStorage.setItem("token_expire", data.token_expire);
                    localStorage.setItem("is_authenticated", true);
                    localStorage.setItem("role", data.role)
                    navigate("/dashboard");
                });
            })
            .catch((err) => {
                let message = err?.response?.data?.message || err.message

                Swal.fire({
                    icon: "error",
                    titleText: "Failed!",
                    text: message,
                });
            });
    };

    return (
        <>
            <Navbar login={checkAuth()} />
            <div className="px-2 py-3">
                <span className="sr-only">Login</span>
            </div>
            <div className="mx-2 my-1">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-1">
                        <label>
                            username
                            <input
                                type="text"
                                {...register("username", {
                                    required: "Username diperlukan",
                                    minLength: {
                                        value: 3,
                                        message: "Username terlalu pendek",
                                    },
                                })}
                                className="rounded-md border-white mx-2 px-2 text-white bg-gray-400 focus:bg-gray-600 focus:border-white"
                            />
                        </label>
                        {errors.username && errors?.username?.message}
                    </div>
                    <div className="my-1">
                        <label>
                            password
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password diperlukan",
                                    minLength: {
                                        value: 6,
                                        message: "Password minimal 6",
                                    },
                                })}
                                className="rounded-md border-white mx-2 px-2 text-white bg-gray-400 focus:bg-gray-600 focus:border-white"
                            />
                        </label>
                        {errors.password && errors?.password?.message}
                    </div>
                    <input
                        type="submit"
                        className="py-1 px-2 bg-blue-500 hover:bg-blue-700 hover:text-white rounded-md"
                    />
                </form>
            </div>
        </>
    );
};

export default Login;
