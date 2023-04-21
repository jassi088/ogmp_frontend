import { Button, Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import ProductsForm from './ProductsForm';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../../redux/slices/loaderSlice';
import { DeleteProduct, GetProducts } from '../../../apiCalls/products';
import moment from 'moment';
import Bids from './Bids';

const Products = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.users);

    const [showBidsModal, setShowBidsModal] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(false);
    const [products, setProducts] = useState([]);

    const deleteProduct = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeleteProduct(id);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
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
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Added On',
            dataIndex: 'createdAt',
            render: (text, record) => {
                return moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                return <div className="flex gap-8">

                    <i className="ri-edit-box-line cursor-pointer" onClick={() => {
                        setSelectedProduct(record);
                        setShowProductForm(true);
                    }}></i>

                    <i className="ri-delete-bin-line cursor-pointer" onClick={() => {
                        deleteProduct(record._id);
                    }}></i>

                    <span className="underline cursor-pointer" onClick={() => {
                        setShowBidsModal(true);
                        setSelectedProduct(record);
                    }}>
                        Show Bids
                    </span>

                </div>
            }
        },
    ];


    // Get Products
    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts({
                seller: user._id
            });
            dispatch(SetLoader(false));
            if (response.success) {
                setProducts(response.data);
            } else {
                message.info(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }



    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className='flex justify-end mb-4'>
                <Button type='default' onClick={() => {
                    setSelectedProduct(null);
                    setShowProductForm(true)
                }}>
                    Add Product
                </Button>
            </div>

            <Table scroll={{x: 1090}} pagination={{ pageSize: 3 }} columns={columns} dataSource={products} rowKey={() => String(Math.floor(Math.random() * 100))} />

            {showProductForm &&
                <ProductsForm
                    showProductForm={showProductForm}
                    setShowProductForm={setShowProductForm}
                    selectedProduct={selectedProduct}
                    getData={getData}
                />
            }

            {showBidsModal && (
                <Bids
                    showBidsModal={showBidsModal}
                    setShowBidsModal={setShowBidsModal}
                    selectedProduct={selectedProduct}
                />
            )}

        </div>
    )
}

export default Products;