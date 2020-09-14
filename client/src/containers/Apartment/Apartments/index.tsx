import React from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";

export const Apartments = () => {
    return <div>
        <Link to="/apartment">
            <Button>
                Add Apartment
            </Button>
        </Link>
    </div>;
};
