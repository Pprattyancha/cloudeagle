import { useDispatch, useSelector } from "react-redux";
import { updateCell } from "../redux/tableSlice";
import { TextField, Typography } from "@mui/material";
import "../styles/EditableCell.css";
const EditableCell = ({ row, column }) => {
    const dispatch = useDispatch();
    const { editingRowId, editedRow } = useSelector((state) => state.table);

    const isEditing = editingRowId === row.id;

    const value =
        editedRow?.[row.id]?.[column] ?? row[column];

    return isEditing ? (
        <TextField
            variant="standard" 
            value={value}
            onChange={(e) =>
                dispatch(
                    updateCell({
                        id: row.id,
                        key: column,
                        value: e.target.value,
                    })
                )
            }
            className="editable-cell-input"
            fullWidth
        />
    ) : (
        <Typography
            className="editable-cell-text"
        >
            {value}
        </Typography>
    );
};

export default EditableCell;