import React from "react";
import {Button, Card, Col, Form, Input, Layout, Row, Spin, Typography} from "antd";
import { useMutation } from 'react-apollo'
import {Redirect} from "react-router-dom";
import {User} from "../../../lib/types";
import {SignUp as SignUpData, SignUpVariables} from "../../../lib/graphql/mutations/SignUp/__generated__/SignUp";
import {displayErrorMessage, displaySuccessNotification} from "../../../lib/utils";
import {SIGN_UP} from "../../../lib/graphql/mutations/SignUp";

const { Content } = Layout;
const { Title } = Typography;

interface Props {
  setUser: (user: User) => void;
}

export const SignUp = ({ setUser } : Props) => {

  const [form] = Form.useForm();
  const [ signUp, { data: signUpData, loading: signUpLoading }] = useMutation<SignUpData, SignUpVariables>(SIGN_UP, {
    onCompleted: data => {
      if (data && data.signUp && data.signUp.token) {
        setUser(data.signUp);
        sessionStorage.setItem("token", data.signUp.token);
        displaySuccessNotification("You've successfully signed up!");
      }
    },
    onError: (error) => {
      displayErrorMessage(error.message);
    }
  });

  const onFinish = (formValues: {
    email: string,
    password: string,
    confirm: string
    firstName: string,
    lastName: string
  }) => {
    signUp({
      variables: {
        input: {
          email: formValues.email,
          password: formValues.password,
          firstName: formValues.firstName,
          lastName: formValues.lastName
        }
      }
    })
  };

  if (signUpLoading) {
    return (
        <Content>
          <Spin size="large" tip="Signing you UP..." />
        </Content>
    );
  }

  if (signUpData && signUpData.signUp) {
    return <Redirect to={"/"} />;
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <Content>
      <Row>
        <Col xs={{span: 24, offset: 0 }} md={{ offset: 7, span: 10 }} >
          <Card>
            <Row justify="center">
              <Col>
                <Title level={3}>
                  Sign up to App!
                </Title>
              </Col>
            </Row>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
            >
              <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                      },
                    }),
                  ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                  name="firstName"
                  label={"First name"}
                  rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                  name="lastName"
                  label={"Last name"}
                  rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                  wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }}
              >
                <Button type="primary" htmlType="submit" block>
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};
