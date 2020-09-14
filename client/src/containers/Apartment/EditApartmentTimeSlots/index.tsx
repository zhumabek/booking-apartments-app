import {Calendar, Col, Row, Typography} from "antd";
import React, {useState} from "react";
import moment from "moment";

interface ApartmentTimeSlot {
    _id?: string
    date: string;
    isBooked: boolean;
    apartmentId?: string;
}

export const EditApartmentTimeSlots = () => {
    const [date, setDate] = useState(moment());
    const [timeSlots, setTimeSlots] = useState<ApartmentTimeSlot[]>([]);


    const onSelect = (value: moment.Moment) => {
        const selectedSlot = value.format("DD-MM-YYYY");
        const existingSlot = timeSlots.find(slot => slot.date === selectedSlot)

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