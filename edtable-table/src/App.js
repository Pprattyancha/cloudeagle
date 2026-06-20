import { useEffect } from 'react';
import DataTable from './components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTable } from './redux/tableSlice';
import ToolBar from './components/ToolBar.jsx';
import Pagination from './components/Pagination.jsx';
import { Box } from '@mui/material';
import Toast from './components/Toast.jsx';

function App() {
  const dispatch = useDispatch();

  const { data, page, limit, loading, error } = useSelector(
    (state) => state.table
  );

  useEffect(() => {
    dispatch(fetchTable({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{ width: "100%" }}
    >
      <ToolBar data={data} />
      <DataTable
        data={data}
        page={page}
        limit={limit}
        loading={loading}
        error={error}
      />
      <Pagination />
      <Toast />
    </Box>
  );
}

export default App;