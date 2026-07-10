import { Breadcrumbs } from "@mui/material";
import "./menu.css";
import { NavLink } from "react-router";

export function Menu() {
    return (
        <div className="Menu">

            <Breadcrumbs>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/reports">Reports</NavLink>
                <NavLink to="/recommendations">Recommendations</NavLink>
                <NavLink to="/about">About</NavLink>
            </Breadcrumbs>

        </div>
    );
}
