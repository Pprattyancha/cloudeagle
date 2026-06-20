import React from "react";
import { Box, TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLimit, setPage } from "../redux/tableSlice";

const Pagination = ({ filteredCount }) => {
  const dispatch = useDispatch();

  const { page, limit, total, search } = useSelector(
    (state) => state.table
  );

  const handleChangePage = (e, newPage) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    dispatch(setLimit(newLimit));
    dispatch(setPage(0));
  };

  return (
    <Box display="flex" justifyContent="center">

      <TablePagination
        component="div"
        count={search ? filteredCount : total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 50, 100, 500]}
      />
    </Box>
  );
};

export default Pagination;