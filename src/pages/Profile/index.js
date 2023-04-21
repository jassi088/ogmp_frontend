import { Tabs } from "antd";
import Products from "./Products";
import UserBids from "./UserBids";
import General from "./General";


const Profile = () => {

    const items = [
        {
            label: 'Products',
            key: '1',
            children: <Products />,
        },
        {
            label: 'My Bids',
            key: '2',
            children: <UserBids />,
        }, {
            label: 'General',
            key: '3',
            children: <General />,
        },
    ];

    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}

export default Profile;