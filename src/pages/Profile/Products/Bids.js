import { Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/slices/loaderSlice";
import { GetAllBidsByProduct } from "../../../apiCalls/products";
import moment from "moment";
import Divider from "../../../components/Divider";
import uniqid from 'uniqid';


const Bids = ({ showBidsModal, setShowBidsModal, selectedProduct }) => {
    const dispatch = useDispatch();
    const [bids, setBids] = useState([]);
    // console.log(bids)

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetAllBidsByProduct({
                product: selectedProduct._id,
            });
            // console.log(response)
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
            title: 'Bid Placed on',
            dataIndex: 'createdAt',
            render: (text, record) => {
                return moment(text).format('DD-MM-YYYY hh:mm a');
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => {
                return record.buyer.name;
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
        {
            title: 'Contact Details',
            dataIndex: 'contactDetails',
            render: (text, record) => {
                return (
                    <div>
                        <p>Phone: {record.mobile}</p>
                        <p>Email: {record.buyer.email}</p>
                    </div>
                )
            }
        }
    ];

    useEffect(() => {
        if (selectedProduct) {
            getData();
        }
    }, [selectedProduct]);

    return (

        <Modal title='' open={showBidsModal} onCancel={() => setShowBidsModal(false)} centered width={1100} footer={null}>
            <h3 className="text-primary text-xl">{selectedProduct.name} - Bids</h3>

            <Divider />

            <div className="mt-4">
                <Table scroll={{x: 900}} columns={columns} dataSource={bids} pagination={{ pageSize: 3 }} rowKey={() => uniqid()} />
            </div>

        </Modal>

    )
}

export default Bids;