import {Calendar, Col, Row, Spin, Typography, Layout} from "antd";
import React, {useEffect, useRef, useState} from "react";
import moment from "moment";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {ApartmentTimeSlots as ApartmentTimeSlotsData,ApartmentTimeSlotsVariables} from "../../../lib/graphql/queries/ApartmentTimeSlot/__generated__/ApartmentTimeSlots";
import {APARTMENT_TIME_SLOTS} from "../../../lib/graphql/queries/ApartmentTimeSlot";
import {Redirect, useParams} from "react-router-dom";

interface ApartmentTimeSlot {
    _id?: string
    date: string;
    isBooked: boolean;
    apartmentId?: string;
}

export const EditApartmentTimeSlots = () => {
    const [date, setDate] = useState(moment());
    const [timeSlots, setTimeSlots] = useState<ApartmentTimeSlot[]>([]);
    const {id: apartmentId } = useParams();

    const { loading, data: timeSlotsData, error, refetch } = useQuery<ApartmentTimeSlotsData, ApartmentTimeSlotsVariables>(
        APARTMENT_TIME_SLOTS,
        {
            variables: {
                id: apartmentId
            },
            onCompleted: (data) => {
                setTimeSlots(data.apartmentTimeSlots);
            }
        }
    );

    if (loading) {
        return (
            <Layout.Content>
                <Spin size="large" tip="Fetching apartment time slots..." />
            </Layout.Content>
        );
    }

    const onSelect = (value: moment.Moment) => {
        const selectedSlot = value.format("DD-MM-YYYY");
        const existingSlot = timeSlots.find(slot => {
            return moment(slot.date).format("DD-MM-YYYY") === selectedSlot;
        })

        if (!existingSlot){
            setTimeSlots([
                    ...timeSlots,
                    { date: selectedSlot, isBooked: false }
                ]
            )
        } else {
            const updatedTimeSlots = timeSlots.filter(slot => slot.date !== selectedSlot);
            setTimeSlots(updatedTimeSlots);
        }
        setDate(value);


    };

    const onPanelChange = (value: moment.Moment) => {
        setDate( value );
    };

    const dateCellRender = (value: moment.Moment) => {
        return timeSlots.map(timeSlot => {
            if (value.format("DD-MM-YYYY") === timeSlot.date) {
                return <div style={{background: "blue", width: "100%", height: "100%"}}></div>
            } else {
                return null;
            }
        })
    }

    const disableDate = (value: moment.Moment) => {
        return value < moment().subtract("day", 1);
    }

    return (
        <Row>
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
        </Row>
    )
}