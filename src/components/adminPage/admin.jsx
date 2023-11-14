import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { login, validateToken } from "../../store/user";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import cookie from "react-cookies";

import {
  deleteOrder,
  getRemoteData,
  addNewOrder,
  updateOneOrder,
} from "../../store/orders";

import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  InputNumber,
} from "antd";

const { TextArea } = Input;

function AdminForm(props) {
  const [componentDisabled, setComponentDisabled] = useState(false);

  //   const dispatch = useDispatch();
  //   const handelAddNewOrder = (item) => {
  //     dispatch(addNewOrder(item));
  //   };
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Success:", values);
    props.addNewOrder(values)
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validateuser = (token) => {
    dispatch(validateToken(token));
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    validateuser(token);
    props.getRemoteData();
  }, []);

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="orderName" name="orderName">
          <Input />
        </Form.Item>

        <Form.Item label="customerName" name="customerName">
          <Input />
        </Form.Item>
        <Form.Item label="customerPhone" name="customerPhone">
          <Input />
        </Form.Item>
        <Form.Item label="location" name="location">
          <Input />
        </Form.Item>
        <Form.Item label="collectedCash" name="collectedCash">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Select" name="status">
          <Select>
            <Select.Option value="delivered"> delivered </Select.Option>
            <Select.Option value="undelivered">unDelivered</Select.Option>
            <Select.Option value="canceled">canceled</Select.Option>
            <Select.Option value="rescheduled">rescheduled</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="driverId" name="driverId">
          <InputNumber />
        </Form.Item>

        <Form.Item label="storeId" name="storeId">
          <InputNumber />
        </Form.Item>
        <Form.Item label="note" name="note">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="arrived" name="arrived" valuePropName="checked">
          <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            arrived
          </Checkbox>
        </Form.Item>

        <Form.Item label="long" name="long">
        <InputNumber />
        </Form.Item>
        <Form.Item label="lat" name="lat">
        <InputNumber />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

const mapStateToProps = (state) => ({
  myUser: state.user,
  orders: state.orders,
});

const mapDispatchToProps ={
  //   signup,
  getRemoteData,
  addNewOrder,
  deleteOrder,
  updateOneOrder,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminForm);
