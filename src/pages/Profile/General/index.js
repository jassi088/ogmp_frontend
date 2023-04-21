import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/slices/loaderSlice";
import { GetAllBids, GetProducts } from "../../../apiCalls/products";
import { useEffect, useState } from "react";

const General = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const { loading } = useSelector(state => state.loaders);

    const [bidsCount, setBidsCount] = useState(0);
    const [productsCount, setProductsCount] = useState(0);


    const getCounts = async () => {
        try {
            dispatch(SetLoader(true));
            const response1 = await GetProducts({
                seller: user._id,
            });
            const response2 = await GetAllBids({
                userId: user._id,
            });

            dispatch(SetLoader(false));
            if (response1.success) {
                setProductsCount(response1.data.length);
            }
            if (response2.success) {
                setBidsCount(response2.data.length);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            throw new Error(error.message);
        }
    }

    useEffect(() => {
        getCounts();
    }, []);

    return (
        !loading && <div className="flex justify-center w-full mt-12">
            <div className="flex flex-col items-center text-center shadow-lg rounded-sm w-56 py-10">


                {/* Counts */}
                <div className="flex justify-evenly mb-5 w-8/12">
                    <div className="flex flex-col">
                        <span className="text-xl font-medium text-gray-500">{productsCount}</span>
                        <span className="text-[12px] font-semibold text-gray-300">Products</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-medium text-gray-500">{bidsCount}</span>
                        <span className="text-[12px] font-semibold text-gray-300">Bids</span>
                    </div>
                </div>


                {/* Basic Info */}
                <div className="flex flex-col my-2">

                    <h1 className="text-xl capitalize text-gray-600">{user.name}</h1>

                    <span className="text-md">{user.email}</span>

                </div>

                {/* Status */}
                <div className="mt-6 px-3 py-1 shadow-md shadow-slate-400 bg-primary">
                    <h1 className="text-xl capitalize text-white">{user.status}</h1>
                </div>


            </div>
        </div>
    )
};

export default General;