import { Table, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/slices/loaderSlice";
import { GetAllBids } from "../../../apiCalls/products";
import moment from "moment";
import uniqid from 'uniqid';


const UserBids = () => {
    const dispatch = useDispatch();
    const [bids, setBids] = useState([]);
    const { user } = useSelector(state => state.users);

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            // Buyer bids basically my bids
            const response = await GetAllBids({
                userId: user._id
            });
            dispatch(SetLoader(false));
            if (response.success) {
                setBids(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            render: (text, record) => {
                return record.product.name;
            }
        },
        {
            title: 'Bid Placed on',
            dataIndex: 'createdAt',
            render: (text, record) => {
                return moment(text).format('DD-MM-YYYY hh:mm a');
            }
        },
        {
            title: 'Seller',
            dataIndex: 'seller',
            render: (text, record) => {
                return record.seller.name;
            }
        },
        {
            title: 'Offered Price',
            dataIndex: 'offererdPrice',
            render: (text, record) => {
                return record.product.price;
            }
        },
        {
            title: 'Bid Amount',
            dataIndex: 'bidAmount',
        },
        {
            title: 'Message',
            dataIndex: 'message',
        },
    ]

    useEffect(() => {
        getData();
    }, [])

    return (

        <div className="mt-4">
            <Table scroll={{x: 1090}} columns={columns} dataSource={bids} pagination={{ pageSize: 3 }} rowKey={() => uniqid()} />
        </div>

    )
}

export default UserBids;