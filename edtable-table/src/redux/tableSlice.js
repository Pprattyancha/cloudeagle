import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteRowApi, fetchTableData, updateRowApi } from "../services/api";

export const fetchTable = createAsyncThunk(
    "table/fetch",
    async ({ page, limit }) => {
        const res = await fetchTableData(page, limit);
        return res;
    }
);

export const saveRowApi = createAsyncThunk(
    "table/saveRow",
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await updateRowApi(id, data);
            return res;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deleteRowApiThunk = createAsyncThunk(
    "table/deleteRow",
    async (id, thunkAPI) => {
        try {
            await deleteRowApi(id);
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const tableSlice = createSlice({
    name: "table",
    initialState: {
        data: [],
        originalData: [],
        editedRow: {},
        editingRowId: null,
        search: "",
        history: [],
        total: 0,
        loading: false,
        error: null,
        page: 0,
        limit: 10,
        toast: {
            open: false,
            message: "",
            severity: "success",
        },
    },

    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },

        setLimit(state, action) {
            state.limit = action.payload;
        },

        setSearch(state, action) {
            state.search = action.payload;
        },

        editRow(state, action) {
            const row = state.data.find(r => r.id === action.payload);
            if (row) {
                state.editingRowId = row.id;
                state.editedRow[row.id] = { ...row };
            }
        },
        updateCell(state, action) {
            const { id, key, value } = action.payload;

            if (!state.editedRow[id]) {
                state.editedRow[id] = {};
            }

            state.editedRow[id][key] = value;
        },

        cancelEdit(state) {
            state.editingRowId = null;
        },

        undo(state) {
            if (!state.history.length || state.editingRowId !== null) {
                state.data = state.originalData;
                state.search = "";
                state.page = 0;
            }

            state.toast = {
                open: true,
                message: "Reset to original data",
                severity: "info",
            };
        },
        undoEdit(state, action) {
            const id = action.payload;
            const row = state.data.find(r => r.id === id);

            if (row) {
                state.history[id] = JSON.parse(JSON.stringify(row));

                if (state.editingRowId === id) {
                    state.editingRowId = null;
                }
                state.editedRow[id] = { ...row };
            }
        },
        setToast(state, action) {
            state.toast = {
                open: true,
                message: action.payload.message,
                severity: action.payload.severity || "success",
            };
        },

        closeToast(state) {
            state.toast.open = false;
        },
        applyFilter(state) {
            const q = state.search.trim().toLowerCase();
            const fields = ["name", "email", "salary"];

            const source = state.originalData;

            state.data = !q
                ? source
                : source.filter((row) =>
                    fields.some((key) =>
                        String(row?.[key] ?? "")
                            .toLowerCase()
                            .includes(q)
                    )
                );

            state.page = 0;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchTable.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTable.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.rows;
                state.originalData = action.payload.rows;
                state.total = action.payload.total;

                state.toast = {
                    open: true,
                    message: "Data loaded successfully",
                    severity: "success",
                };
            })
            .addCase(fetchTable.rejected, (state) => {
                state.loading = false;

                state.toast = {
                    open: true,
                    message: "Failed to fetch data",
                    severity: "error",
                };
            })
            .addCase(saveRowApi.fulfilled, (state, action) => {
                const updated = action.payload;

                state.history.push(JSON.parse(JSON.stringify(state.data)));

                state.data = state.data.map(row =>
                    row.id === updated.id ? updated : row
                );

                delete state.editedRow[updated.id];
                state.editingRowId = null;

                state.toast = {
                    open: true,
                    message: "Row updated successfully",
                    severity: "success",
                };
            })
            .addCase(saveRowApi.rejected, (state) => {
                state.toast = {
                    open: true,
                    message: "Failed to update row",
                    severity: "error",
                };
            })
            .addCase(deleteRowApiThunk.fulfilled, (state, action) => {
                state.history.push(JSON.parse(JSON.stringify(state.data)));

                state.data = state.data.filter(r => r.id !== action.payload);

                state.toast = {
                    open: true,
                    message: "Row deleted successfully",
                    severity: "success",
                };
            })
            .addCase(deleteRowApiThunk.rejected, (state) => {
                state.toast = {
                    open: true,
                    message: "Failed to delete row",
                    severity: "error",
                };
            })
    },
});

export const {
    setPage,
    setLimit,
    setSearch,
    editRow,
    undoEdit,
    updateCell,
    cancelEdit,
    undo,
    closeToast,
    setToast,
    applyFilter,
} = tableSlice.actions;

export default tableSlice.reducer;