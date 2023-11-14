import { Button, Checkbox, Form, Input } from "antd";
import { login, validateToken } from "../../store/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { When } from "react-if";
import { useEffect } from "react";
import cookie from "react-cookies";
import { useDispatch } from "react-redux";

const Login = (props) => {
  //   const [state, setstate] = useState(initialState);
  //   const [state, setstate] = useState(initialState);
  console.log(props.myUser, "jhbygvhgvsdfgdgsdfg");
  const onFinish = (values) => {
    props.login(values);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  console.log(props.myUser, "***********");
  const dispatch = useDispatch();

  const validateuser = (token) => {
    dispatch(validateToken(token));
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    validateuser(token);
  }, []);

  return (
    <div>
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
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
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
        <When condition={props.myUser.userInfo.role == "admin"}>
          <Button type="link" htmlType="button">
            If you dont have an account you can register from
            <Link to="/register"> Here</Link>
          </Button>
        </When>
        <When condition={props.myUser.userInfo.role == "manager"}>
          <Button type="link" htmlType="button">
            Add a new employee from
            <Link to="/register"> Here</Link>
          </Button>
        </When>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  myUser: state.user,
});

const mapDispatchToProps = {
  login,
  // validateToken: () => dispatch(validateToken()),
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
