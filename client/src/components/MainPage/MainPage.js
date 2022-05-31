import React, { Fragment, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
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
const { Header, Content, Footer } = Layout;


function Dashboard() {
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
    };

    return (

        <Layout>
            <Header
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                }}
            >
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={new Array(1).fill(null).map((_, index) => ({
                        key: String(index + 1),
                        label: `Home Page`,
                    }))}
                />
            </Header>
            <Content
                className="site-layout"
                style={{
                    padding: '0 50px',
                    marginTop: 64,
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    {/* <Breadcrumb.Item>List</Breadcrumb.Item> */}
                    {/* <Breadcrumb.Item>App</Breadcrumb.Item> */}
                </Breadcrumb>
                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 380,
                    }}
                >
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

                        <Form.Item
                            name={['user', 'idnumber']}
                            label="ID Number"
                            rules={[
                                {
                                    type: 'number',
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            required='true'
                            name="upload"
                            label="Image of ID"
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

                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Copyright © 2022 Irembo
            </Footer>
        </Layout >
    );
}

export default Dashboard;

