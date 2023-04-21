import { Button, Upload, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/slices/loaderSlice";
import { EditProduct, UploadImage } from "../../../apiCalls/products";

const Images = ({ selectedProduct, getData, setShowProductForm }) => {

    const dispatch = useDispatch();

    const [showPreview, setShowPreview] = useState(true);
    const [images, setImages] = useState(selectedProduct?.images);
    const [file, setFile] = useState(null);
    console.log(file)

    const upload = async (image) => {
        try {
            dispatch(SetLoader(true));
            // Upload Image
            const formData = new FormData();
            formData.append('file', file);
            formData.append('productId', selectedProduct._id);
            const response = await UploadImage(formData);
            dispatch(SetLoader(false))
            if (response.success) {
                message.success(response.message);
                setImages([...images, response.data]);
                setShowPreview(false);
                setFile(null);
                getData();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }


    const deleteImage = async (image) => {
        try {
            const updatedImagesArray = images.filter(img => img !== image);
            dispatch(SetLoader(true));
            const updatedProduct = { ...selectedProduct, images: updatedImagesArray };
            const response = await EditProduct(selectedProduct._id, updatedProduct);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                setImages(updatedImagesArray);
                setFile(null);
                getData();
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    return (
        <div>

            {/* Previews */}
            <div className="flex mb-4 gap-5">
                {
                    images?.length > 0 && images.map((img) => {
                        return (
                            <div className="flex items-end gap-2 border-solid border-gray-200 rounded p-4">
                                <img src={img} alt="" className="h-20 w-20 object-cover" />
                                <i className="ri-delete-bin-line cursor-pointer" onClick={() => {
                                    deleteImage(img)
                                }}></i>
                            </div>
                        )
                    })
                }
            </div>

            {/* Upload button */}
            <Upload
                fileList={file ? [file] : []}
                listType="picture"
                showUploadList={showPreview}
                beforeUpload={() => false} onChange={(info) => {
                    setFile(info.file);
                    setShowPreview(true);
                }}>
                <Button type="dashed">Upload Image</Button>
            </Upload>


            {/* Footer buttons */}
            <div className="flex justify-end gap-5 mt-5">
                <Button type="default" onClick={() => setShowProductForm(false)
                }>
                    Cancel
                </Button>
                <Button type="primary" disabled={!file} onClick={upload}>
                    Upload
                </Button>
            </div>


        </div>
    )
}

export default Images;