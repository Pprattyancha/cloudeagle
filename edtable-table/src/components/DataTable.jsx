import React from "react";
import EditableCell from "./EditableCell";
import RowActions from "./RowActions";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "../styles/DataTable.css";

const DataTable = ({ data = [], loading, error }) => {
  return (
    <Paper className="table-wrapper">
      <TableContainer className="table-container">
        <Table stickyHeader>

          <TableHead>
            <TableRow>
              <TableCell className="table-header">Name</TableCell>
              <TableCell className="table-header">Email</TableCell>
              <TableCell className="table-header">Salary</TableCell>
              <TableCell className="table-header center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {/* Loading */}
            {loading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box className="center-box">
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {/* Error */}
            {error && !loading && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  {error}
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!loading && !error && data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}

            {/* Data */}
            {!loading &&
              !error &&
              data.map((row) => (
                <TableRow key={row.id} hover className="table-row">
                  <TableCell className="table-cell">
                    <EditableCell row={row} column="name" />
                  </TableCell>

                  <TableCell className="table-cell">
                    <EditableCell row={row} column="email" />
                  </TableCell>

                  <TableCell className="table-cell">
                    <EditableCell row={row} column="salary" />
                  </TableCell>

                  <TableCell className="table-cell center">
                    <RowActions row={row} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;