import { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import Divider from "../../components/Divider";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apiCalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/slices/loaderSlice";

const rules = [
  {
    required: true,
    message: 'Required'
  }
];

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    dispatch(SetLoader(true));
    try {
      const response = await RegisterUser(values);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        window.location.href = '/login';
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }


  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white w-[450px] p-5 rounded mx-8 md:mx-0 -mt-16 md:-mt-0">

        <h1 className="text-primary text-2xl">
          OGMP -
          <span className="text-gray-400 ml-2 uppercase">
            Register
          </span>
        </h1>

        <Divider />

        <Form layout="vertical" onFinish={onFinish}>

          <Form.Item
            label='Name'
            name='name'
            rules={rules}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={rules}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={rules}
          >
            <Input type='password' placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="mt-2" block>
            Register
          </Button>

          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account?{' '}
              <Link to='/login' className="text-primary">
                Login
              </Link>
            </span>
          </div>

        </Form>

      </div>
    </div>
  )
}

export default Register;