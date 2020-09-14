import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import {
    Button, Col,
    Form,
    Input,
    InputNumber,
    Layout,
    Row,
    Typography,
    Upload,
    Spin,
} from "antd";
import {User} from "../../../lib/types";
import {beforeImageUpload, displayErrorMessage, displaySuccessNotification, getBase64Value} from "../../../lib/utils";
import {UploadChangeParam} from "antd/es/upload";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons/lib";
import {CREATE_APARTMENT} from "../../../lib/graphql/mutations/Apartment";
import {apartment as ApartmentData, apartmentVariables } from "../../../lib/graphql/mutations/Apartment/__generated__/apartment";

interface Props {
    user: User;
}
const { Content } = Layout;
const { Title } = Typography;
const { Item } = Form;

export const EditApartment = () => {
    const [form] = Form.useForm();
    const [imageLoading, setImageLoading] = useState(false);
    const [imageBase64Value, setImageBase64Value] = useState<string | null>(null);

    const [createApartment, { loading, data }] = useMutation<
        ApartmentData,
        apartmentVariables
        >(CREATE_APARTMENT, {
        onCompleted: () => {
            displaySuccessNotification("You've successfully created your apartment!");
        },
        onError: (error) => {
            displayErrorMessage(error.message);
        }
    });

    const handleImageUpload = async (info: UploadChangeParam) => {
        const { file } = info;

        if (file.status === "uploading") {
            setImageLoading(true);
            return;
        }

        if (file.originFileObj) {
            const imageBase64Value = await getBase64Value(file.originFileObj);
            setImageBase64Value(imageBase64Value);
            setImageLoading(false);
        }
    };

    const handleForm = (values: {
        name: string,
        description: string,
        price: number,
        numOfRooms: number
    }) => {

        const data = {
            ...values,
            image: imageBase64Value
        };

        createApartment({
            variables: {
                input: data
            }
        })
    };

    if (loading) {
        return (
            <Content>
                <Spin size="large" tip="Creating apartment..." />
            </Content>
        );
    }

    if (data && data.apartment) {
        return <Redirect to={`/apartment/${data?.apartment._id}/time-slots`} />;
    }

    return (
        <Content>
            <Row>
                <Col>
                    <Form layout="vertical" form={form} onFinish={handleForm} name="edit-apartment">

                        <Title level={3}>
                            Adding new apartment!
                        </Title>

                        <Item label="Title"
                              name="name"
                              rules={[
                                  {
                                      required: true,
                                      message: "Please enter a title for your listing!"
                                  },
                              ]}
                        >
                            <Input maxLength={45} placeholder="The iconic and luxurious Bel-Air mansion"/>
                        </Item>

                        <Item label="Max # of Rooms"
                              name="numOfRooms"
                              rules={[
                                  {
                                      required: true,
                                      message: "Please enter a max number of rooms!"
                                  }
                              ]}>
                            <InputNumber min={1} placeholder="1" />
                        </Item>

                        <Item label="Price"
                              extra="All prices in $USD/day"
                              name="price"
                              rules={[
                                  {
                                      required: true,
                                      message: "Please enter a price for your apartment!"
                                  }
                              ]}
                        >
                            <InputNumber min={0} placeholder="120" />
                        </Item>

                        <Item label="Description of apartment"
                              name="description"
                              rules={[
                                  {
                                      required: true,
                                      message: "Please enter a description for your apartment!"
                                  }
                              ]}
                        >
                            <Input.TextArea
                                rows={3}
                                maxLength={400}
                                placeholder="Here goes your description"
                            />
                        </Item>

                        <Item
                            label="Image"
                            extra="Images have to be under 5MB in size and of type JPG or PNG"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter provide an image for your listing!"
                                }
                            ]}
                        >
                            <Row>
                                <Col md={8}>
                                    <Upload
                                        name="image"
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeImageUpload}
                                        onChange={handleImageUpload}
                                    >
                                        <div>
                                            {imageLoading ? <LoadingOutlined /> : <PlusOutlined /> }
                                            <div>{imageBase64Value ? "Upload new" : "Upload"}</div>
                                        </div>

                                    </Upload>
                                </Col>
                                <Col md={12}>
                                    {imageBase64Value ? (
                                        <img
                                            width={300} src={imageBase64Value} alt="Apartment" />
                                    ): null}
                                </Col>
                            </Row>
                        </Item>

                        <Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Item>
                    </Form>
                </Col>
            </Row>
        </Content>
    );
};