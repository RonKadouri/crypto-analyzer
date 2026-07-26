import { Breadcrumbs, InputAdornment, TextField } from "@mui/material";
import "./menu.css";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { searchSlice } from "../../../redux/search-slice";

export function Menu() {

    const dispatch = useDispatch();

    return (
        <div className="Menu">

            <Breadcrumbs>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/reports">Reports</NavLink>
                <NavLink to="/recommendations">Recommendations</NavLink>
                <NavLink to="/about">About</NavLink>
            </Breadcrumbs>

            <TextField
                className="SearchField"
                placeholder="Search coin..."
                size="small"
                onChange={e => dispatch(searchSlice.actions.setSearch(e.target.value))}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="7" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </InputAdornment>
                        ),
                    },
                }}
            />

        </div>
    );
}
