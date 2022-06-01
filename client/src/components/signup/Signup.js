import React, { Fragment, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,
    Upload
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import Title from '../Layout/Title/Title';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';


function Signup() {
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        let signUpData =
        {
            userEmail: values.user.email,
            firstName: values.user.firstname,
            lastName: values.user.lastname,
            gender: "male",
            age: values.user.age,
            dob: "2-2-2",
            maritalStatus: "single",
            nationality: values.user.nationality,
            profilePhoto: values.upload,
            password: values.password,
            confirmPassword: values.confirm - password,
            idNumber: "ff",
            imageOfID: "ff",
            accountStatus: "ff",
            userStatus: "ff"
        }
        axios.post("/signup", signUpData);
    };


    return (
        <Fragment>
            <Navbar />
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onFinish={onFinish}
            >
                <Title name="Sign" title="up"></Title>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                            required: true
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={['user', 'firstname']}
                    label="First Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={['user', 'lastname']}
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Gender" required='true'
                >
                    <Select>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name={['user', 'age']}
                    label="Age"
                    rules={[
                        {
                            type: 'number',
                            min: 0,
                            max: 1000,
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item label="Date of Birth" required='true'>
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label="Marital Status" required='true'
                >
                    <Select>
                        <Select.Option value="single">Single</Select.Option>
                        <Select.Option value="married">Married</Select.Option>
                        <Select.Option value="divorced">Divorced</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name={['user', 'nationality']}
                    label="Nationality"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>



                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirm-password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    required='true'
                    name="upload"
                    label="Profile Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
}

export default Signup