import { Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/slices/loaderSlice';
import { GetProducts, UpdateProductStatus } from '../../apiCalls/products';
import moment from 'moment';

const Products = () => {

    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();

    const onStatusUpdate = async (id, status) => {
        try {
            dispatch(SetLoader(true));
            const response = await UpdateProductStatus(id, { status });
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
    };

    const columns = [
        {
            title: 'Product',
            dataIndex: 'name',
        },
        {
            title: 'Seller',
            dataIndex: 'seller',
            render: (text, record) => {
                return record.seller.name
            }
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
                const { status, _id } = record;
                return (<div className="flex gap-3">

                    {status === 'pending' && <span className='underline cursor-pointer text-primary' onClick={() => onStatusUpdate(_id, 'approved')}>Approve</span>}

                    {status === 'pending' && <span className='underline cursor-pointer text-rose-500' onClick={() => onStatusUpdate(_id, 'rejected')}>Reject</span>}

                    {status === 'approved' && <span className='underline cursor-pointer text-rose-500' onClick={() => onStatusUpdate(_id, 'blocked')}>Block</span>}

                    {status === 'blocked' && <span className='underline cursor-pointer text-rose-500' onClick={() => onStatusUpdate(_id, 'approved')}>Unblock</span>}

                </div>)
            }
        },
    ];

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts(null);
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

            <Table scroll={{x: 1200}} pagination={{ pageSize: 3 }} columns={columns} dataSource={products} rowKey={() => String(Math.floor(Math.random() * 100))} />

        </div>
    )
}

export default Products;