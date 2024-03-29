import { useNavigate, useLocation } from "react-router-dom";
import avatar from "../../images/avatar.png";
import { menuItems } from "../../utils/menuItems";
import { signout } from "../../utils/icons";
import { useEffect, useState, startTransition } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { NavStyled } from "./NavigationStyle";

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState(1);
    const { signOut } = useGlobalContext();

    useEffect(() => {
        const findIdByLink = (link) => {
            const menuItem = menuItems.find((item) => item.link === link || `${item.link}/` === link);
            setActive((menuItem && menuItem.id) || null);
        };
        console.log(location);
        findIdByLink(location.pathname);
    }, [location]);

    const handleClick = (item) => {
        startTransition(() => {
            navigate(item.link);
        });
    };

    const handleSignout = async () => {
        try {
            const response = await signOut();
            if (response.status === 200) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <NavStyled>
            <div className="user-container">
                <img src={avatar} alt="avatar" />
                <div className="text">
                    <h2>Mike</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => handleClick(item)}
                        className={item.id === active ? "active" : ""}
                    >
                        {item.icon} <span>{item.title}</span>
                    </li>
                ))}
            </ul>
            <div className="button-nav">
                <li onClick={handleSignout}>
                    {signout} {"Sign Out"}
                </li>
            </div>
        </NavStyled>
    );
};


export default Navigation;
