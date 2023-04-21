import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SetLoader } from '../../redux/slices/loaderSlice';
import { Button, message } from 'antd';
import Divider from '../../components/Divider';
import { GetAllBidsByProduct, GetProductById } from '../../apiCalls/products';
import moment from 'moment';
import BidModal from './BidModal';


const ProductInfo = () => {

    const { user } = useSelector(state => state.users);

    const { id } = useParams();
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [product, setProduct] = useState(null);
    const [showBidModal, setShowBidModal] = useState(false);

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProductById(id);
            dispatch(SetLoader(false));
            if (response.success) {
                const bidsResponse = await GetAllBidsByProduct({ product: id });
                setProduct({ ...response.data, bids: bidsResponse.data });
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };


    useEffect(() => {
        getData();
    }, []);

    return (
        product && (
            <div className='flex flex-col md:grid grid-cols-2 gap-4'>

                {/* Images */}
                <div className="flex flex-col gap-4">

                    {/* main image */}
                    <img src={product.images[selectedImageIndex]} alt={product.name} className='w-full object-cover h-[350px]' />

                    {/* images */}
                    <div className="flex gap-5">
                        {
                            product?.images?.map((image, index) => {
                                return (
                                    <img
                                        className={`w-16 h-16 object-cover cursor-pointer transition-all duration-300
                                        ${selectedImageIndex === index ? 'p-1' : ''}`}
                                        src={image}
                                        alt={image}
                                        onClick={() => setSelectedImageIndex(index)}
                                    />
                                )
                            })
                        }
                    </div>

                    <Divider />

                    {/* Date */}
                    <div className='mb-6 md:mb-0 text-sm md:text-base'>
                        <h3 className='text-gray-500'>Added On</h3>
                        <span>
                            {moment(product.createdAt).format('MMM D YYYY hh:mm A')}
                        </span>
                    </div>

                </div>



                {/* Information */}
                <div className="flex flex-col">

                    {/* Product Basic Info */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-500">{product.name}</h1>
                        <span className='text-sm mt-2'>{product.description}</span>
                    </div>

                    <Divider />

                    {/* Product Details */}
                    <div className='flex flex-col'>
                        <h1 className="text-2xl font-bold text-gray-500">Product Details</h1>
                        <div className="flex justify-between mt-2">
                            <span>Price</span>
                            <span>$ {product.price}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Category</span>
                            <span className='uppercase'>{product.category}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Bill Availiable</span>
                            <span>{product.billAvailiable ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Box Availiable</span>
                            <span>{product.boxAvailiable ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Accessories Availiable</span>
                            <span>{product.accessoriesAvailiable ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Warranty Availiable</span>
                            <span>{product.warrantyAvailiable ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Purchase Year</span>
                            <span>{moment().subtract(product.age, 'years').format('YYYY')} ({product.age} years ago)</span>
                        </div>
                    </div>

                    <Divider />

                    {/* Seller Deatils */}
                    <div className='flex flex-col'>
                        <h1 className="text-2xl font-bold text-gray-500">Seller Details</h1>
                        <div className="flex justify-between mt-2">
                            <span>Name</span>
                            <span>{product.seller.name}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Email</span>
                            <span className=''>{product.seller.email}</span>
                        </div>
                    </div>

                    <Divider />

                    {/* Bids */}
                    <div className="flex flex-col">
                        <div className="flex justify-between mb-4">
                            <h1 className="text-2xl font-bold text-gray-500">
                                Bids
                            </h1>
                            <Button type='dashed' onClick={() => setShowBidModal(true)} disabled={user._id === product.seller._id || user.role === "admin"}>Place Bid</Button>

                        </div>

                        {/* Bids data */}
                        {
                            product?.showBidsOnProductPage &&
                            product?.bids?.map((bid) => {
                                return (
                                    <div className='border border-solid border-gray-400 py-2 px-3 mb-2'>
                                        <div className="flex justify-between">
                                            <span>Name</span>
                                            <span>{bid.buyer.name}</span>
                                        </div>
                                        <div className="flex justify-between mt-1">
                                            <span>Bid Amount</span>
                                            <span>$ {bid.bidAmount}</span>
                                        </div>
                                        <div className="flex justify-between mt-1">
                                            <span>Bid Placed On</span>
                                            <span>{moment(bid.createdAt).format('MMM D, YYYY hh:mm A')}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                    {showBidModal &&
                        <BidModal
                            showBidModal={showBidModal}
                            SetShowBidModal={setShowBidModal}
                            product={product}
                            reloadData={getData}
                        />}


                </div>

            </div>
        )
    )
}

export default ProductInfo;