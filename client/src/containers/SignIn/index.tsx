import React from "react";
import {Button, Card, Col, Form, Input, Layout, Row, Spin, Typography} from "antd";
import { useMutation } from 'react-apollo'
import {Redirect} from "react-router-dom";
import {User} from "../../lib/types";
import {LockOutlined, UserOutlined} from "@ant-design/icons/lib";
import {SignIn as SignInData, SignInVariables} from "../../lib/graphql/mutations/SignIn/__generated__/SignIn";
import {SIGN_IN} from "../../lib/graphql/mutations/SignIn";
import {displayErrorMessage, displaySuccessNotification} from "../../lib/utils";

const { Content } = Layout;
const { Title } = Typography;

interface Props {
  setUser: (user: User) => void;
}

export const SignIn = ({ setUser } : Props) => {

  const [ signIn, { data: signInData, loading: signInLoading }] = useMutation<SignInData, SignInVariables>(SIGN_IN, {
    onCompleted: data => {
      if (data && data.signIn && data.signIn.token) {
        setUser(data.signIn);
        sessionStorage.setItem("token", data.signIn.token);
        displaySuccessNotification("You've successfully signed in!");
      }
    },
    onError: (error) => {
      displayErrorMessage(error.message);
    }
  });

  const onFinish = (formValues: { email: string, password: string }) => {
    signIn({ variables: { input: formValues } })
  };

  if (signInLoading) {
    return (
        <Content>
          <Spin size="large" tip="Signing you in..." />
        </Content>
    );
  }

  if (signInData && signInData.signIn) {
    return <Redirect to={"/"} />;
  }

  return (
    <Content>
      <Row>
        <Col xs={{span: 24, offset: 0 }} md={{ offset: 8, span: 8 }} >
          <Card>
            <Title level={3}>
              Log in to App!
            </Title>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
              <Form.Item
                  name="email"
                  rules={[{ required: true, type: "email", message: 'Please input your email!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Sign in
                </Button>
                Or <a href="">Sign up now!</a>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};
