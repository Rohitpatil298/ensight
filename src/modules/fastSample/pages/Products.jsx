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
  Chip,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { DataTable } from "../../../shared/components/DataTable";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call when endpoint is available
      // const response = await surveyApi.getProducts({ page, limit: rowsPerPage });
      // setProducts(response.data);
      // setTotalEntries(response.total);

      // Mock data for demonstration
      setTimeout(() => {
        const mockProducts = [
          {
            id: 1,
            name: "ESTUCHOL TAB 150MG 10 X 10 T",
            status: "Active",
          },
          {
            id: 2,
            name: "APLEVANT 0.75 MG (pens)",
            status: "Active",
          },
          {
            id: 3,
            name: "LUPISULIDE-P TABLET",
            status: "Inactive",
          },
          {
            id: 4,
            name: "PANTOP 40 MG",
            status: "Active",
          },
          {
            id: 5,
            name: "AZORAN 50 MG TABLET",
            status: "Active",
          },
          {
            id: 6,
            name: "METOLAZONE 2.5MG",
            status: "Inactive",
          },
          {
            id: 7,
            name: "CEFPODOXIME PROXETIL 200MG",
            status: "Active",
          },
          {
            id: 8,
            name: "RABEPRAZOLE 20MG",
            status: "Active",
          },
          {
            id: 9,
            name: "ATORVASTATIN 10MG",
            status: "Active",
          },
          {
            id: 10,
            name: "AMOXICILLIN 500MG",
            status: "Inactive",
          },
        ];
        setProducts(mockProducts);
        setTotalEntries(50);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    navigate("/fast-sample/admin/products/create");
  };

  const handleEdit = (row) => {
    navigate(`/fast-sample/admin/products/edit/${row.id}`);
  };

  const handleDelete = (row) => {
    console.log("Delete product:", row);
    // TODO: Implement delete functionality
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
      field: "id",
      header: "Sr No.",
      align: "center",
      minWidth: 100,
      render: (value, row) => (
        <Typography variant="body2" fontWeight={600}>
          {row.id}
        </Typography>
      ),
    },
    {
      field: "name",
      header: "Name",
      minWidth: 300,
      render: (value, row) => (
        <Typography variant="body2" fontWeight={500}>
          {row.name || "-"}
        </Typography>
      ),
    },
    {
      field: "status",
      header: "Status",
      align: "center",
      minWidth: 150,
      render: (value, row) => (
        <Chip
          label={row.status}
          size="small"
          sx={{
            bgcolor: row.status === "Active" ? "#22C55E" : "#EF4444",
            color: "white",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      ),
    },
    {
      field: "action",
      header: "Action",
      align: "center",
      minWidth: 120,
      render: (value, row) => (
        <Stack direction="row" spacing={1} justifyContent="center">
          <IconButton
            size="small"
            onClick={() => handleEdit(row)}
            sx={{
              color: "#F4A300",
              "&:hover": {
                bgcolor: (theme) => alpha("#F4A300", 0.1),
              },
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDelete(row)}
            sx={{
              color: "#EF4444",
              "&:hover": {
                bgcolor: (theme) => alpha("#EF4444", 0.1),
              },
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Product <span style={{ color: "#16A34A" }}>{'>> listing'}</span>
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddProduct}
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
          Add item
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #E5E7EB",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2">Show</Typography>
          <FormControl size="small">
            <Select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              sx={{ minWidth: 70 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body2">entries</Typography>
        </Box>

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
          <DataTable
            columns={columns}
            data={products}
            emptyMessage="No data available in table"
            hover={true}
          />
        )}

        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {products.length > 0 ? startEntry : 0} to {endEntry} of{" "}
            {totalEntries} entries
          </Typography>

          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  "&.Mui-selected": {
                    bgcolor: "#22C55E",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#16A34A",
                    },
                  },
                },
              }}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Products;