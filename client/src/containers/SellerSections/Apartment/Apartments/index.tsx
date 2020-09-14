import React, { useState} from "react";
import {Button, Col, Row, Table, Avatar, Layout, Spin} from "antd";
import {Link } from "react-router-dom";
import { useQuery, useMutation} from "@apollo/react-hooks";
import {getApartmentsVariables as GetApartmentsVariables, getApartments as GetApartmentsData } from "../../../../lib/graphql/queries/Apartments/__generated__/getApartments";
import {GET_APARTMENTS} from "../../../../lib/graphql/queries/Apartments";
import {CalendarTwoTone, DeleteFilled, EditFilled } from "@ant-design/icons/lib";
import {APARTMENTS_PAGE_LIMIT} from "../../../../lib/utils/constants";
import {DELETE_APARTMENT} from "../../../../lib/graphql/mutations/Apartment";
import {
    deleteApartment,
    deleteApartmentVariables
} from "../../../../lib/graphql/mutations/Apartment/__generated__/deleteApartment";
import {displayErrorMessage} from "../../../../lib/utils";

interface IApartments {
    _id: string;
    name: string;
    image: string;
    numOfRooms: number;
    price: number;
}

export const Apartments = () => {
    const [apartments, setApartments] = useState<IApartments[]>([]);
    const [page, setPage] = useState(1);

    const { loading, data, refetch: getApartments } = useQuery<GetApartmentsData, GetApartmentsVariables>(
        GET_APARTMENTS,
        {
            variables: {
                page: page,
                limit: APARTMENTS_PAGE_LIMIT
            },
            onCompleted: (data) => {
                setApartments(data.getApartments.result);
            },
            onError: (error) => displayErrorMessage(error.message)
        }
    );

    const [deleteApartment, { loading: deleteLoading }] = useMutation<deleteApartment, deleteApartmentVariables>(
        DELETE_APARTMENT,
        {
            onCompleted: async () => {
                const { data } = await getApartments();

                setApartments(data.getApartments.result);
            },
            onError: (error) => displayErrorMessage(error.message)
        }
    );

    const deleteHandler = (id: string) => {
       deleteApartment({
           variables: { id }
       });
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => {
                return <Avatar shape="square" size={70} src={image} />
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Number of rooms',
            dataIndex: 'numOfRooms',
            key: 'numOfRooms',
        },
        {
            title: '',
            dataIndex: '_id',
            key: '_id',
            render: (id: string) => <Link to={`/apartment/${id}`}>
                                        <EditFilled style={{ fontSize: '20px' }}/>
                                    </Link>
        },
        {
            title: '',
            dataIndex: '_id',
            key: '_id',
            render: (id: string) => <Link to={`/apartment/${id}/time-slots`}>
                                        <CalendarTwoTone style={{ fontSize: '20px' }}/>
                                    </Link>
        },
        {
            title: '',
            dataIndex: '_id',
            key: '_id',
            render: (id: string) => <DeleteFilled onClick={() => deleteHandler(id)} style={{ fontSize: '20px' }}/>
        }


    ];

    if (loading) {
        return (
            <Layout.Content>
                <Spin size="large" tip="Fetching apartments..." />
            </Layout.Content>
        );
    }


    if (deleteLoading) {
        return (
            <Layout.Content>
                <Spin size="large" tip="Deleting apartment..." />
            </Layout.Content>
        );
    }


    return <Row>
        <Col xs={24} >
            <Link to="/apartment">
                <Button>
                    Add Apartment
                </Button>
            </Link>
        </Col>
        <Col xs={24} style={{marginTop: "10px"}}>
            <Table dataSource={apartments} columns={columns}
                   pagination={{
                        current: page,
                        total: data?.getApartments?.total,
                        defaultPageSize: APARTMENTS_PAGE_LIMIT,
                        hideOnSinglePage: true,
                        showLessItems: true,
                        onChange: (page: number) => setPage(page)
            }}/>
        </Col>
    </Row>;
};

