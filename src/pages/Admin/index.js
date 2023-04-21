import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
import Products from "./Products";
import Users from "./Users";
import { useNavigate } from 'react-router-dom';

const items = [
    {
        label: 'Products',
        key: '1',
        children: <Products />,
    },
    {
        label: 'Users',
        key: '2',
        children: <Users />,
    },
]

const Admin = () => {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.users);

    useEffect(() => {
        if (user.role !== 'admin') {
            navigate('/');
        }
    }, []);

    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}

export default Admin;