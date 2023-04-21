import { Form, Input, Modal, message } from "antd";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/slices/loaderSlice";
import { PlaceNewBid } from "../../apiCalls/products";
import { AddNotification } from "../../apiCalls/notifications";

const rules = [
    {
        required: true,
    }
]

const BidModal = ({ showBidModal, SetShowBidModal, product, reloadData }) => {
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);

    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            const response = await PlaceNewBid({
                ...values,
                product: product._id,
                seller: product.seller._id,
                buyer: user._id,
            });
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                // send Notification
                await AddNotification({
                    title: 'A New bid has been placed',
                    message: `A new bid has been placed on your product ${product?.name} by ${user?.name} for ${values?.bidAmount}`,
                    user: product?.seller?._id,
                    onClick: `/profile`,
                    read: false,
                })
                reloadData();
                SetShowBidModal(false);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    return (
        <Modal open={showBidModal} onCancel={() => SetShowBidModal(false)} centered onOk={() => formRef?.current?.submit()}>
            <div className="flex flex-col gap-5 mb-5">
                <h1 className="text-2xl font-semibold text-gray-500 text-center">New Bid</h1>


                <Form layout="vertical" ref={formRef} onFinish={onFinish}>
                    <Form.Item rules={rules} label="Bid Amount" name="bidAmount">
                        <Input />
                    </Form.Item>
                    <Form.Item rules={rules} label="Message" name="message">
                        <Input />
                    </Form.Item>
                    <Form.Item rules={rules} label="Mobile" name="mobile">
                        <Input type="number" />
                    </Form.Item>
                </Form>

            </div>
        </Modal>
    )
}

export default BidModal;