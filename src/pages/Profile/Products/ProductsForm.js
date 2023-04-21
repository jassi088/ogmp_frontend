import { Col, Form, Input, Modal, Row, Tabs, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../../redux/slices/loaderSlice';
import { AddProduct, EditProduct } from "../../../apiCalls/products";
import Images from "./Images";

const rules = [
    {
        required: true,
        message: "Required",
    },
];

const checkBoxes = [
    {
        label: 'Bill Availiable',
        name: "billAvailiable",
        key: '1',
    },
    {
        label: 'Warranty Availiable',
        name: "warrantyAvailiable",
        key: '2',
    },
    {
        label: 'Accessories Availiable',
        name: "accessoriesAvailiable",
        key: '3',
    },
    {
        label: 'Box Availiable',
        name: "boxAvailiable",
        key: '4',
    },
];

const ProductsForm = ({ showProductForm,
    setShowProductForm, selectedProduct, getData }) => {

    const [selectedTab, setSelectedTab] = useState("1");
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const formRef = useRef(null);

    const onFinish = async (values) => {
        // const map = new Map(Object.entries(values));
        // map.forEach((value, key) => {
        //     if (value === undefined) {
        //         map.set(key, Boolean(false));
        //     }
        // });
        // const newValues = Object.fromEntries(map);
        // console.log(newValues);
        // newValues.seller = user?._id;
        try {
            dispatch(SetLoader(true));
            let response = null;
            if (selectedProduct) {
                response = await EditProduct(selectedProduct._id, values);
            } else {
                values.seller = user._id;
                response = await AddProduct(values);
            }
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
                setShowProductForm(false);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    const GeneralForm =
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
            <Form.Item label="Name" name='name' rules={rules}>
                <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name='description' rules={rules}>
                <Input type="text" />
            </Form.Item>

            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item label="Price" name='price' rules={rules}>
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Category" name='category' rules={rules}>
                        <select >
                            <option value="">Select</option>
                            <option value='electronics'>Electronics</option>
                            <option value='fashion'>Fashion</option>
                            <option value='home'>Home</option>
                            <option value='sports'>Sports</option>
                            <option value='books'>Books</option>
                        </select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Age" name='age' rules={rules}>
                        <Input type="number" />
                    </Form.Item>
                </Col>
            </Row>

            {/* CheckBoxes */}
            <div className="flex gap-4 sm:gap-10 items-center">
                {
                    checkBoxes.map((item) => {
                        return (
                            <Form.Item label={item.label} name={item.name} key={item.key} valuePropName="checked" >
                                <Input
                                    type="checkbox"
                                    value={item.name}
                                    onChange={(e) => {
                                        formRef.current.setFieldsValue({
                                            [item.name]: e.target.checked,
                                        });
                                    }}
                                    checked={formRef.current?.getFieldValue(item.name)}
                                />
                            </Form.Item>
                        )
                    })
                }
            </div>

            <Form.Item className="flex" label='Show Bids on Product Page' name='showBidsOnProductPage' valuePropName="checked" >
                <Input
                    type="checkbox"
                    onChange={(e) => {
                        formRef.current.setFieldsValue({
                            showBidsOnProductPage: e.target.checked,
                        });
                    }}
                    checked={formRef.current?.getFieldValue('showBidsOnProductPage')}
                />
            </Form.Item>

        </Form>;


    const items = [
        {
            label: 'General',
            key: '1',
            children: GeneralForm
        },
        {
            label: 'Images',
            key: '2',
            children: <Images
                selectedProduct={selectedProduct}
                setShowProductForm={setShowProductForm}
                getData={getData} />,
            disabled: !selectedProduct
        },
    ];

    useEffect(() => {
        if (selectedProduct) {
            formRef.current.setFieldsValue(selectedProduct);
        }
    }, [selectedProduct])

    useEffect(() => {
        setShowProductForm(true);
    }, []);

    return (
        <Modal
            title=''
            open={showProductForm}
            onCancel={() => setShowProductForm(false)}
            centered
            width={800}
            okText="Save"
            onOk={() => formRef.current.submit()}
            {...(selectedTab === '2' && { footer: false })}
        >

            <h2 className="text-center text-primary uppercase">
                {selectedProduct ? "Edit Product" : "Add Product"}
            </h2>

            <Tabs defaultActiveKey="1" activeKey={selectedTab} onChange={(key) => setSelectedTab(key)} items={items} />


        </Modal>
    )
}

export default ProductsForm;