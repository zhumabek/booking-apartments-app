import {Calendar, Col, Row, Spin, Typography, Layout, Button} from "antd";
import React, {useState} from "react";
import moment from "moment";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {ApartmentTimeSlots as ApartmentTimeSlotsData,ApartmentTimeSlotsVariables} from "../../../lib/graphql/queries/ApartmentTimeSlot/__generated__/ApartmentTimeSlots";
import {APARTMENT_TIME_SLOTS} from "../../../lib/graphql/queries/ApartmentTimeSlot";
import {Link, useParams} from "react-router-dom";
import {DATE_FORMAT} from "../../../lib/utils/constants";
import {displayErrorMessage} from "../../../lib/utils";
import {
    editApartmentTimeSlot as EditApartmentTimeSlotData,
    editApartmentTimeSlotVariables as EditApartmentTimeSlotVariables
} from "../../../lib/graphql/mutations/ApartmentTimeSlot/__generated__/editApartmentTimeSlot";
import {EDIT_APARTMENT_TIME_SLOT} from "../../../lib/graphql/mutations/ApartmentTimeSlot";

interface ApartmentTimeSlot {
    _id?: string
    date: string;
    isBooked: boolean;
    apartmentId: string;
}

export const EditApartmentTimeSlots = () => {
    const [date, setDate] = useState(moment());
    const [timeSlots, setTimeSlots] = useState<ApartmentTimeSlot[]>([]);
    const {id: apartmentId } = useParams();

    const { loading, data: timeSlotsData, error, refetch: timeSlotsReFetch } = useQuery<ApartmentTimeSlotsData, ApartmentTimeSlotsVariables>(
        APARTMENT_TIME_SLOTS,
        {
            variables: {
                id: apartmentId
            },
            onCompleted: (data) => {
                setTimeSlots(data.apartmentTimeSlots);
            },
            onError: (error) => console.log(error)
        }
    );

    const [editTimeSlot, { loading: editTimeSlotLoading }] = useMutation<
        EditApartmentTimeSlotData,
        EditApartmentTimeSlotVariables
        >(EDIT_APARTMENT_TIME_SLOT, {
        onCompleted: async () => {
            const { data } = await timeSlotsReFetch();
            setTimeSlots(data.apartmentTimeSlots)
        },
        onError: (error) => {
            displayErrorMessage(error.message);
        }
    });

    if (loading) {
        return (
            <Layout.Content>
                <Spin size="large" tip="Fetching apartment time slots..." />
            </Layout.Content>
        );
    }

    const onSelect = (value: moment.Moment) => {

        const selectedSlot = value.format(DATE_FORMAT);
        const existingSlot = timeSlots.find(slot => {
            return moment(+slot.date).format(DATE_FORMAT) === selectedSlot;
        });

        let timeSlot: ApartmentTimeSlot = {
            date: selectedSlot,
            isBooked: false,
            apartmentId
        };

        if (existingSlot){
            timeSlot = {
                _id: existingSlot._id,
                date: existingSlot.date,
                isBooked: existingSlot.isBooked,
                apartmentId
            }
        }

        editTimeSlot({
                variables: {
                    input: timeSlot
                }
            }
        )
        setDate(value);


    };

    const onPanelChange = (value: moment.Moment) => {
        setDate( value );
    };

    const dateCellRender = (value: moment.Moment) => {
        return timeSlots.map(timeSlot => {
            if (
                value.format(DATE_FORMAT) === moment(+timeSlot.date).format(DATE_FORMAT)
            ) {
                return <div key={timeSlot._id} style={{background: timeSlot.isBooked ? "red"  : "blue", width: "100%", height: "100%"}}></div>
            } else {
                return null;
            }
        })
    }

    const disableDate = (value: moment.Moment) => {
        const isCurrentDateBooked = timeSlots.find(slot => {
            return moment(slot.date).format(DATE_FORMAT) === value.format(DATE_FORMAT) && slot.isBooked
        })

        return value < moment().subtract("day", 1) || !!isCurrentDateBooked;
    }

    return (
        <Row gutter={12}>
            <Col xs={24} md={{offset: 2, span: 20}}>
               <Typography.Title level={4}>
                   Please select time slots for your apartment!
                   You can select or unselect by clicking on specific date grid.
               </Typography.Title>
            </Col>
            <Col xs={24} md={{offset: 2, span: 20}}>
                <Calendar value={date}
                          dateCellRender={dateCellRender}
                          onSelect={onSelect}
                          onPanelChange={onPanelChange}
                          disabledDate={disableDate}
                />
            </Col>
            <Col xs={24} md={{offset: 2, span: 20}} style={{display: "flex", justifyContent: "flex-end"}}>
                <Link to="/apartments">
                    <Button type="primary" color="red">Finish and go to apartments</Button>
                </Link>
            </Col>
        </Row>
    )
}