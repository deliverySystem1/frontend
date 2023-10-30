/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
import { Button, Checkbox, Form, Input } from "antd";
import { signup, validateToken } from "../../store/user";

import { connect } from "react-redux";
import { useEffect } from "react";
import cookie from "react-cookies";

const Signup = (props) => {
  const onFinish = (values) => {
    props.signup(values.username, values.Password, values.role);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  console.log(props.myUser);

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    props.validateToken(token);
  }, []);

  return (
    <div>
      <Form
        name='basic'
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
        autoComplete='off'>
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          label='Email'
          name='Email'
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Role'
          name='Role'
          rules={[
            {
              required: true,
              message: "Please input your role!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  myUser: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  signup,
  validateToken: (e) => dispatch(validateToken(e)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
