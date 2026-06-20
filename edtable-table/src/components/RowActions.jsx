import { useDispatch, useSelector } from "react-redux";
import { editRow, cancelEdit, saveRowApi, deleteRowApiThunk, undoEdit } from "../redux/tableSlice";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import '../styles/RowActions.css'
const RowActions = ({ row }) => {
    const dispatch = useDispatch();
    const editingRowId = useSelector((state) => state.table.editingRowId);

    const isEditing = editingRowId === row.id;

    const commonProps = {
        size: "small",
        sx: { p: 0.5 },
    };

    const viewActions = [
        {
            title: "Edit",
            icon: <EditOutlinedIcon fontSize="small" />,
            color: "primary",
            onClick: () => dispatch(editRow(row.id)),
        },
        {
            title: "Undo",
            icon: <ReplayOutlinedIcon fontSize="small" />,
            color: "primary",
            onClick: () => dispatch(undoEdit(row.id)),
        },
        {
            title: "Delete",
            icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
            color: "error",
            onClick: () => dispatch(deleteRowApiThunk(row.id)),
        },
    ];

    const editActions = [
        {
            title: "Save",
            icon: <CheckCircleOutlinedIcon fontSize="small" />,
            color: "primary",
            onClick: () =>
                dispatch(saveRowApi({ id: row.id, data: row })),
        },
        {
            title: "Cancel",
            icon: <DoNotDisturbAltOutlinedIcon fontSize="small" />,
            color: "error",
            onClick: () => dispatch(cancelEdit()),
        },
    ];

    return (
        <Box sx={{ display: "flex", gap: 1 }}>

            {!isEditing &&
                viewActions.map((action, index) => (
                    <Tooltip key={index} title={action.title}>
                        <IconButton
                            {...commonProps}
                            color={action.color}
                            onClick={action.onClick}
                        >
                            {action.icon}
                        </IconButton>
                    </Tooltip>
                ))}

            {isEditing && (
                <Box className="action-container">
                    {editActions.map((action, index) => (
                        <Tooltip key={index} title={action.title}>
                            <IconButton
                                {...commonProps}
                                color={action.color}
                                onClick={action.onClick}
                            >
                                {action.icon}
                            </IconButton>
                        </Tooltip>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default RowActions;