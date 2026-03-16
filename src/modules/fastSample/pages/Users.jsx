import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  IconButton,
  Typography,
  alpha,
  MenuItem,
  Select,
  FormControl,
  Pagination,
  Paper,
} from "@mui/material";
import { Add, FileDownload, Edit } from "@mui/icons-material";
import { DataTable } from "../../../shared/components/DataTable";
import { surveyApi } from "../api";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call when endpoint is available
      // const response = await surveyApi.getUsers({ page, limit: rowsPerPage });
      // setUsers(response.data);
      // setTotalEntries(response.total);

      // Mock data for demonstration

        const mockUsers = [
          {
            id: 1,
            parentEmployeeCode: "0",
            employeeCode: "RESPIRASPECIALITYCARE",
            name: "RESPIRA SPECIALITY CARE",
            employeePosition: "ME",
            email: "0111@lupin.com",
          },
          {
            id: 2,
            parentEmployeeCode: "200043",
            employeeCode: "180863",
            name: "Sanjay Keshri",
            employeePosition: "ZSM",
            email: "sanjaykeshri@lupin.com",
          },
          {
            id: 3,
            parentEmployeeCode: "162881",
            employeeCode: "201813",
            name: "Anand Kumar",
            employeePosition: "ZSM",
            email: "kumaranand@lupin.com",
          },
          {
            id: 4,
            parentEmployeeCode: "201813",
            employeeCode: "208660",
            name: "Abinash Pathak",
            employeePosition: "RSM",
            email: "abinashpathak@lupin.com",
          },
          {
            id: 5,
            parentEmployeeCode: "208660",
            employeeCode: "227446",
            name: "Ajeet Kumar Singh",
            employeePosition: "ASM",
            email: "ajeetkumarsingh@lupin.com",
          },
          {
            id: 6,
            parentEmployeeCode: "227446",
            employeeCode: "40022134",
            name: "ADITYA MISHRA",
            employeePosition: "ME",
            email: "adityamishra2@lupin.com",
          },
          {
            id: 7,
            parentEmployeeCode: "227446",
            employeeCode: "247096",
            name: "SANJIV KUMAR",
            employeePosition: "ME",
            email: "sanjivkumar@lupin.com",
          },
          {
            id: 8,
            parentEmployeeCode: "227446",
            employeeCode: "221154",
            name: "Pritam Raj Soni",
            employeePosition: "ME",
            email: "pritamrajsoni@lupin.com",
          },
          {
            id: 9,
            parentEmployeeCode: "211464",
            employeeCode: "219611",
            name: "Rajan Kumar",
            employeePosition: "ME",
            email: "kumarrajan@lupin.com",
          },
          {
            id: 10,
            parentEmployeeCode: "227446",
            employeeCode: "230088",
            name: "Vikash Kumar",
            employeePosition: "ME",
            email: "vikashkumar4@lupin.com",
          },
        ];
        setUsers(mockUsers);
        setTotalEntries(402);
        setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setLoading(false);
    }
  };

  const handleAddUsers = () => {
    console.log("Add users clicked");
    // TODO: Navigate to add users page
  };

  const handleExportUsers = () => {
    console.log("Export users clicked");
    // TODO: Implement export functionality
  };

  const handleEdit = (row) => {
    navigate(`/fast-sample/admin/user/edit/${row.id}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const startEntry = (page - 1) * rowsPerPage + 1;
  const endEntry = Math.min(page * rowsPerPage, totalEntries);

  const columns = [
    {
      field: "srNo",
      header: "Sr No.",
      align: "center",
      minWidth: 80,
      render: (value, row, index) => (
        <Typography variant="body2" fontWeight={600}>
          {startEntry + index}
        </Typography>
      ),
    },
    {
      field: "parentEmployeeCode",
      header: "Parent Employee Code",
      minWidth: 180,
      render: (value, row) => (
        <Typography variant="body2">{row.parentEmployeeCode}</Typography>
      ),
    },
    {
      field: "employeeCode",
      header: "Employee Code",
      minWidth: 200,
      render: (value, row) => (
        <Typography variant="body2">{row.employeeCode}</Typography>
      ),
    },
    {
      field: "name",
      header: "Name",
      minWidth: 180,
      render: (value, row) => (
        <Typography variant="body2" fontWeight={500}>
          {row.name}
        </Typography>
      ),
    },
    {
      field: "employeePosition",
      header: "Employee Position",
      minWidth: 160,
      render: (value, row) => (
        <Typography variant="body2">{row.employeePosition}</Typography>
      ),
    },
    {
      field: "email",
      header: "Email",
      minWidth: 220,
      render: (value, row) => (
        <Typography variant="body2" color="primary.main">
          {row.email}
        </Typography>
      ),
    },
    {
      field: "action",
      header: "Action",
      align: "center",
      minWidth: 100,
      render: (value, row) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<Edit />}
          onClick={() => handleEdit(row)}
          sx={{
            borderColor: "#3B82F6",
            color: "#3B82F6",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.75rem",
            px: 2,
            "&:hover": {
              borderColor: "#2563EB",
              bgcolor: alpha("#3B82F6", 0.05),
            },
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box>
      {/* Title */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          User <span style={{ color: "#16A34A" }}>listing</span>
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddUsers}
            sx={{
              bgcolor: "#22C55E",
              color: "white",
              fontWeight: 600,
              px: 3,
              py: 1,
              "&:hover": {
                bgcolor: "#16A34A",
              },
            }}
          >
            Add Users
          </Button>
          <Button
            variant="contained"
            startIcon={<FileDownload />}
            onClick={handleExportUsers}
            sx={{
              bgcolor: "#22C55E",
              color: "white",
              fontWeight: 600,
              px: 3,
              py: 1,
              "&:hover": {
                bgcolor: "#16A34A",
              },
            }}
          >
            Export Users
          </Button>
        </Stack>
      </Box>

      {/* Entries Selector */}
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Show
        </Typography>
        <FormControl size="small" sx={{ minWidth: 70 }}>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            sx={{
              fontSize: "0.875rem",
              "& .MuiSelect-select": {
                py: 0.75,
              },
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          entries
        </Typography>
      </Box>

      {/* Data Table */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 400,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Loading...
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mb: 3 }}>
          <DataTable
            columns={columns}
            data={users}
            emptyMessage="No data available in table"
            hover={true}
            sx={{
              "& .MuiTableCell-root": {
                whiteSpace: "nowrap",
              },
            }}
          />
        </Box>
      )}

      {/* Pagination Info and Controls */}
      {!loading && users.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {startEntry} to {endEntry} of {totalEntries} entries
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 500,
              },
              "& .Mui-selected": {
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Users;