import { Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetLoader } from "../redux/slices/loaderSlice";
import { DeleteNotification } from "../apiCalls/notifications";
import moment from "moment";

const Notifications = ({
    notifications,
    reloadNotifications,
    showNotifications,
    setShowNotifications
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const deleteNotification = async (id) => {
        dispatch(SetLoader(true));
        try {
            const response = await DeleteNotification(id);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                reloadNotifications();
            } else {
                dispatch(SetLoader(false));
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    return (
        <Modal title='Notifications' open={showNotifications} onCancel={() => setShowNotifications(false)} centered footer={null} width={800}>
            <div className="flex flex-col gap-3 mt-4">
                {notifications?.length <= 0 && <h1 className="text-xl font-normal mb-4 text-center">No notification</h1>}
                {
                    notifications?.map((item, index) => {
                        return (
                            <div className="flex flex-col gap-2 border border-solid border-gray-300 py-2 px-4 cursor-pointer" key={index} onClick={() => {
                                navigate(item.onClick)
                                setShowNotifications(false);
                            }}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h1 className="text-xl">
                                            {item.title}
                                        </h1>
                                        <span>
                                            {
                                                item.message
                                            }
                                        </span>
                                        <h1 className="text-xs font-medium text-gray-600 bg-slate-200 w-max px-2 py-1 my-1 rounded">
                                            {
                                                moment(item.createdAt).fromNow()
                                            }
                                        </h1>
                                    </div>

                                    <div>
                                        <i className="ri-delete-bin-line text-xl" onClick={() => deleteNotification(item._id)}></i>
                                    </div>

                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </Modal>
    )
}

export default Notifications;