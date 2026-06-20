import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter, setSearch, undo } from "../redux/tableSlice";
import { exportCSV } from "../utils/csvExport";
import { Box, Button, Stack, TextField } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
const ToolBar = () => {
    const dispatch = useDispatch();
    const { data, search } = useSelector((state) => state.table);
    const actions = [
        {
            label: "undo",
            icon: <ReplayOutlinedIcon fontSize="small" />,
            variant: "outlined",
            onClick: () => dispatch(undo()),
        },
        {
            label: "csv",
            icon: <FileDownloadOutlinedIcon fontSize="small" />,
            variant: "contained",
            onClick: () => exportCSV(data),
        },
    ];

    return (
        <Box sx={{ my: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                    size="small"
                    label="Search"
                    value={search}
                    onChange={(e) => {
                        dispatch(setSearch(e.target.value));
                        dispatch(applyFilter());
                    }}
                />
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        variant={action.variant}
                        startIcon={action.icon}
                        onClick={action.onClick}
                    >
                        {action.label}
                    </Button>
                ))}

            </Stack>
        </Box>
    );
};

export default ToolBar;