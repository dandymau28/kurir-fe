import { NavLink } from "react-router-dom";

var logoutAction = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expires");
    localStorage.removeItem("isAuthenticated");
    window.location.reload();
};

const navigationsNonLogin = [{ name: "Login", link: "/login" }];

let role = localStorage.getItem("role");

const navigationsLogin = role !== "kurir" ? [
    { name: "Home", link: "/dashboard" },
    { name: "Courier", link: "/courier" },
    { name: "Shipment", link: "/shipment" },
    { name: "Logout", link:"/logout", action: logoutAction },
] : [
    { name: "Home", link: "/dashboard" },
    { name: "Shipment", link: "/shipment" },
    { name: "Logout", link:"/logout", action: logoutAction },
]

const Navbar = props => {
    const isLoggedIn = props.login;

    let renderNav = (item) =>
        item.action ? (
            <NavLink
                to={item.link}
                key={item.name}
                onClick={item.action}
                className={(navData) => navData.isActive ? "px-2 py-1 text-gray-700 bg-gray-200 rounded-md" : "px-2 py-1 text-gray-200 hover:bg-gray-400 rounded-md"}
            >
                {item.name}
            </NavLink>
        ) : (
            <NavLink
                to={item.link}
                key={item.name}
                className={(navData) => navData.isActive ? "px-2 py-1 text-gray-700 bg-gray-200 rounded-md" : "px-2 py-1 text-gray-200 hover:bg-gray-400 rounded-md"}
            >
                {item.name}
            </NavLink>
        );

    return isLoggedIn ? (
        <>
            <nav className="bg-gray-800">
                <div className="relative px-2 py-2">
                    <div className="flex space-x-4">
                        <div className="text-lg text-white pr-10">
                            Track Kurir
                        </div>
                        {navigationsLogin.map(renderNav)}
                    </div>
                </div>
            </nav>
        </>
    ) : (
        <>
            <nav className="bg-gray-800">
                <div className="relative px-2 py-2">
                    <div className="flex space-x-4">
                        <div className="text-lg text-white pr-10">
                            Track Kurir
                        </div>
                        {navigationsNonLogin.map(renderNav)}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
