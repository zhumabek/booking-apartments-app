import React, {useEffect, useRef} from "react";
import {Button, Card, Col, Form, Input, Layout, Row, Spin, Typography} from "antd";
import {useApolloClient, useMutation} from 'react-apollo'

import {User} from "../../lib/types";
import {LockOutlined, UserOutlined} from "@ant-design/icons/lib";

const { Content } = Layout;
const { Text, Title } = Typography;

interface Props {
  setUser: (user: User) => void;
}

export const SignIn = ({ setUser } : Props) => {
  const client = useApolloClient();
  const onFinish = (values: {}) => {
    console.log('Received values of form: ', values);
  };


  return (
    <Content>
      <Row>
        <Col xs={{span: 24, offset: 0 }} md={{ offset: 8, span: 8 }} >
          <Card>
            <Title level={3} className="log-in-card__intro-title">
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
