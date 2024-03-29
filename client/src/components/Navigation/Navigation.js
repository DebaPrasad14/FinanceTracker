import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import avatar from "../../images/avatar.png";
import { menuItems } from "../../utils/menuItems";
import { signout } from "../../utils/icons";
import { useEffect, useState, startTransition } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState(1);
    const { signOut } = useGlobalContext();

    useEffect(() => {
        findIdByLink(location.pathname);
    }, [location]);

    const findIdByLink = (link) => {
        const menuItem = menuItems.find((item) => item.link === link);
        setActive((menuItem && menuItem.id) || null);
    };

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

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-container {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #ffffff;
            padding: 0.2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2 {
            color: rgba(34, 34, 96, 1);
        }
        p {
            color: rgba(34, 34, 96, 0.6);
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: 0.6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.4s ease-in-out;
            color: rgba(34, 34, 96, 0.6);
            padding-left: 1rem;
            position: relative;
            i {
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all 0.4s ease-in-out;
            }
        }
    }
    .button-nav {
        li {
            cursor: pointer;
        }
    }
    .active {
        color: rgba(34, 34, 96, 1) !important;
        i {
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Navigation;
