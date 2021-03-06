/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// import AddEditUser from "examples/SideMenu/AddEditUser";
import { useSelector } from "react-redux";

import React from "react";

export function Author({ image, name, email }) {
    return (
        <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
            <SuiBox mr={2}>
                <SuiAvatar src={image} alt={name} size="sm" variant="rounded" />
            </SuiBox>
            <SuiBox display="flex" flexDirection="column">
                <SuiTypography variant="button" fontWeight="medium">
                    {name}
                </SuiTypography>
                <SuiTypography variant="caption" color="secondary">
                    {email}
                </SuiTypography>
            </SuiBox>
        </SuiBox>
    );
}

export function Function({ job, org }) {
    return (
        <SuiBox display="flex" flexDirection="column">
            <SuiTypography variant="caption" fontWeight="medium" color="text">
                {job}
            </SuiTypography>
            <SuiTypography variant="caption" color="secondary">
                {org}
            </SuiTypography>
        </SuiBox>
    );
}

const authorsTableData = {
    columns: [
        { name: "user", align: "left" },
        { name: "role", align: "left" },
        { name: "phone", align: "left" },
        { name: "action", align: "center" },
    ],

    rows: [
        {
            user: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
            role: <Function job="Manager" org="Organization" />,
            phone: (
                <SuiTypography variant="caption" color="secondary" fontWeight="medium">
                    +212-0625-125212
                </SuiTypography>
            ),
            action: (
                <SuiBox display="flex" flexDirection="row" gap="5px">
                    <SuiButton
                        // onClick={}
                        variant="text"
                        size="small"
                        color={"text"}
                    >
                        Edit
                    </SuiButton>
                    <SuiButton
                        // onClick={}
                        variant="text"
                        size="small"
                        color={"error"}
                    >
                        Remove
                    </SuiButton>
                </SuiBox>
            ),
        },
        {
            user: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
            role: <Function job="Manager" org="Organization" />,
            phone: (
                <SuiTypography variant="caption" color="secondary" fontWeight="medium">
                    +212-0625-125212
                </SuiTypography>
            ),
            action: (
                <SuiBox display="flex" flexDirection="row" gap="5px">
                    <SuiButton
                        // onClick={}
                        variant="text"
                        size="small"
                        color={"text"}
                    >
                        Edit
                    </SuiButton>
                    <SuiButton
                        // onClick={}
                        variant="text"
                        size="small"
                        color={"error"}
                    >
                        Remove
                    </SuiButton>
                </SuiBox>
            ),
        },
        {
            user: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
            role: <Function job="Manager" org="Organization" />,
            phone: (
                <SuiTypography variant="caption" color="secondary" fontWeight="medium">
                    +212-0625-125212
                </SuiTypography>
            ),
            action: (
                <SuiBox display="flex" flexDirection="row" gap="5px">
                    <SuiButton
                        // onClick={}
                        variant="text"
                        size="small"
                        color={"text"}
                    >
                        Edit
                    </SuiButton>
                    <SuiButton
                        // onClick={}
                        variant="text"
                        size="small"
                        color={"error"}
                    >
                        Remove
                    </SuiButton>
                </SuiBox>
            ),
        },
    ],
};

export default authorsTableData;
