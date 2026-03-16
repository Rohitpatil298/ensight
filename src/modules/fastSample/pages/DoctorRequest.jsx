import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  IconButton,
  Tooltip,
  Typography,
  alpha,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  FileDownload,
  Edit,
  CheckCircle,
  Cancel,
  PictureAsPdf,
} from "@mui/icons-material";
import { DataTable } from "../../../shared/components/DataTable";

const DoctorRequest = () => {
  const [doctorRequests, setDoctorRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    type: "", // "accept" or "reject"
    rows: [],
  });

  useEffect(() => {
    fetchDoctorRequests();
  }, []);

  const fetchDoctorRequests = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call when endpoint is available
      // const response = await surveyApi.getDoctorRequests();
      // setDoctorRequests(response);

      // Mock data for demonstration
      setTimeout(() => {
        const mockData = [
          {
            id: 1,
            employeeCode: "40013088",
            drName: "AARSHA SADAR",
            productName: "ESTUCHOL TAB 150MG 10 X 10 T",
            qty: 12,
            region: "TRICHUR",
            hq: "Kollam",
            editedMobile: "9979912498",
            originalMobile: "7829894128",
            lastApprovalDate: "18-07-2025",
            speciality: "CONSULTING PHYSICIAN",
            pancard: "ABCDE12345",
            zone: "SOUTH ZONE",
          },
          {
            id: 2,
            employeeCode: "40013088",
            drName: "AARSHA SADAR",
            productName: "ESTUCHOL TAB 150MG 10 X 10 T",
            qty: 12,
            region: "TRICHUR",
            hq: "Kollam",
            editedMobile: "9979912498",
            originalMobile: "7829894128",
            lastApprovalDate: "18-07-2025",
            speciality: "CONSULTING PHYSICIAN",
            pancard: "ABCDE12345",
            zone: "SOUTH ZONE",
          },
          {
            id: 3,
            employeeCode: "40013088",
            drName: "AARSHA SADAR",
            productName: "ESTUCHOL TAB 150MG 10 X 10 T",
            qty: 12,
            region: "TRICHUR",
            hq: "Kollam",
            editedMobile: "9979912498",
            originalMobile: "7829894128",
            lastApprovalDate: "18-07-2025",
            speciality: "CONSULTING PHYSICIAN",
            pancard: "ABCDE12345",
            zone: "SOUTH ZONE",
          },
          {
            id: 4,
            employeeCode: "40013088",
            drName: "AARSHA SADAR",
            productName: "APLEVANT 0.75 MG (pens)",
            qty: 18,
            region: "TRICHUR",
            hq: "Kollam",
            editedMobile: "9979912498",
            originalMobile: "7829894128",
            lastApprovalDate: "18-07-2025",
            speciality: "CONSULTING PHYSICIAN",
            pancard: "ABCDE12345",
            zone: "SOUTH ZONE",
          },
          {
            id: 5,
            employeeCode: "40013088",
            drName: "AARSHA SADAR",
            productName: "APLEVANT 0.75 MG (pens)",
            qty: 18,
            region: "TRICHUR",
            hq: "Kollam",
            editedMobile: "9979912498",
            originalMobile: "7829894128",
            lastApprovalDate: "18-07-2025",
            speciality: "CONSULTING PHYSICIAN",
            pancard: "ABCDE12345",
            zone: "SOUTH ZONE",
          },
          {
            id: 6,
            employeeCode: "40013088",
            drName: "AARSHA SADAR",
            productName: "APLEVANT 0.75 MG (pens)",
            qty: 18,
            region: "TRICHUR",
            hq: "Kollam",
            editedMobile: "9979912498",
            originalMobile: "7829894128",
            lastApprovalDate: "18-07-2025",
            speciality: "CONSULTING PHYSICIAN",
            pancard: "ABCDE12345",
            zone: "SOUTH ZONE",
          },
          {
            id: 7,
            employeeCode: "40013088",
            drName: "AARSHA SADAR",
            productName: "APLEVANT 0.75 MG (pens)",
            qty: 18,
            region: "TRICHUR",
            hq: "Kollam",
            editedMobile: "9979912498",
            originalMobile: "7829894128",
            lastApprovalDate: "18-07-2026",
            speciality: "CONSULTING PHYSICIAN",
            pancard: "ABCDE12345",
            zone: "SOUTH ZONE",
          },
          {
            id: 8,
            employeeCode: "40013088",
            drName: "AARSHA SADAR",
            productName: "APLEVANT 0.75 MG (pens)",
            qty: 18,
            region: "TRICHUR",
            hq: "Kollam",
            editedMobile: "9979912498",
            originalMobile: "7829894128",
            lastApprovalDate: "18-07-2025",
            speciality: "CONSULTING PHYSICIAN",
            pancard: "ABCDE12345",
            zone: "SOUTH ZONE",
          },
          {
            id: 9,
            employeeCode: "40013088",
            drName: "AARSHA SADAR",
            productName: "APLEVANT 0.75 MG (pens)",
            qty: 18,
            region: "TRICHUR",
            hq: "Kollam",
            editedMobile: "9979912498",
            originalMobile: "7829894128",
            lastApprovalDate: "18-07-2025",
            speciality: "CONSULTING PHYSICIAN",
            pancard: "ABCDE12345",
            zone: "SOUTH ZONE",
          },
          {
            id: 10,
            employeeCode: "40013088",
            drName: "AARSHA SADAR",
            productName: "APLEVANT 0.75 MG (pens)",
            qty: 18,
            region: "TRICHUR",
            hq: "Kollam",
            editedMobile: "9979912498",
            originalMobile: "7829894128",
            lastApprovalDate: "18-07-2025",
            speciality: "CONSULTING PHYSICIAN",
            pancard: "ABCDE12345",
            zone: "SOUTH ZONE",
          },
          {
            id: 11,
            employeeCode: "40013088",
            drName: "AARSHA SADAR",
            productName: "APLEVANT 0.75 MG (pens)",
            qty: 18,
            region: "TRICHUR",
            hq: "Kollam",
            editedMobile: "9979912498",
            originalMobile: "7829894128",
            lastApprovalDate: "18-07-2025",
            speciality: "CONSULTING PHYSICIAN",
            pancard: "ABCDE12345",
            zone: "SOUTH ZONE",
          },
          {
            id: 12,
            employeeCode: "40013088",
            drName: "AARSHA SADAR",
            productName: "APLEVANT 0.75 MG (pens)",
            qty: 18,
            region: "TRICHUR",
            hq: "Kollam",
            editedMobile: "9979912498",
            originalMobile: "7829894128",
            lastApprovalDate: "18-07-2025",
            speciality: "CONSULTING PHYSICIAN",
            pancard: "ABCDE12345",
            zone: "SOUTH ZONE",
          },
        ];
        setDoctorRequests(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch doctor requests:", error);
      setLoading(false);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = doctorRequests.map((row) => row.id);
      setSelectedRows(allIds);
      setSelectAll(true);
    } else {
      setSelectedRows([]);
      setSelectAll(false);
    }
  };

  const handleSelectRow = (rowId) => {
    const selectedIndex = selectedRows.indexOf(rowId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, rowId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
    setSelectAll(newSelected.length === doctorRequests.length);
  };

  const handleExportAll = () => {
    // TODO: Implement export functionality
    console.log("Exporting all doctor requests...");
  };

  const handleExportToday = () => {
    // TODO: Implement export today functionality
    console.log("Exporting today doctor requests...");
  };

  const handleEdit = (row) => {
    console.log("Edit doctor request:", row);
    // TODO: Implement edit functionality
  };

  const handleViewPDF = (row) => {
    console.log("View PDF for:", row);
    // TODO: Implement PDF view functionality
  };

  const handleAcceptClick = () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one row");
      return;
    }
    const selectedData = doctorRequests.filter((row) =>
      selectedRows.includes(row.id)
    );
    setConfirmModal({
      open: true,
      type: "accept",
      rows: selectedData,
    });
  };

  const handleRejectClick = () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one row");
      return;
    }
    const selectedData = doctorRequests.filter((row) =>
      selectedRows.includes(row.id)
    );
    setConfirmModal({
      open: true,
      type: "reject",
      rows: selectedData,
    });
  };

  const handleConfirm = () => {
    const { type, rows } = confirmModal;
    console.log(`${type} doctor requests:`, rows);
    // TODO: Implement API call to accept/reject
    setSelectedRows([]);
    setSelectAll(false);
    setConfirmModal({ open: false, type: "", rows: [] });
  };

  const handleCloseModal = () => {
    setConfirmModal({ open: false, type: "", rows: [] });
  };

  const columns = [
    {
      field: "id",
      header: "Id",
      align: "center",
      minWidth: 60,
      render: (value, row) => (
        <Typography variant="body2" fontWeight={600}>
          {row.id}
        </Typography>
      ),
    },
    {
      field: "select",
      header: (
        <Checkbox
          checked={selectAll}
          indeterminate={selectedRows.length > 0 && selectedRows.length < doctorRequests.length}
          onChange={handleSelectAll}
          sx={{
            color: "#22C55E",
            "&.Mui-checked": {
              color: "#22C55E",
            },
            "&.MuiCheckbox-indeterminate": {
              color: "#22C55E",
            },
          }}
        />
      ),
      align: "center",
      minWidth: 60,
      render: (value, row) => (
        <Checkbox
          checked={selectedRows.indexOf(row.id) !== -1}
          onChange={() => handleSelectRow(row.id)}
          sx={{
            color: "#22C55E",
            "&.Mui-checked": {
              color: "#22C55E",
            },
          }}
        />
      ),
    },
    {
      field: "edit",
      header: "Edit",
      align: "center",
      minWidth: 60,
      render: (value, row) => (
        <IconButton
          size="small"
          onClick={() => handleEdit(row)}
          sx={{
            color: "primary.main",
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
      ),
    },
    {
      field: "employeeCode",
      header: "Employee Code",
      minWidth: 140,
      render: (value, row) => (
        <Typography variant="body2">{row.employeeCode || "-"}</Typography>
      ),
    },
    {
      field: "drName",
      header: "Dr Name",
      minWidth: 180,
      render: (value, row) => (
        <Typography variant="body2" fontWeight={500}>
          {row.drName || "-"}
        </Typography>
      ),
    },
    {
      field: "productName",
      header: "Product name",
      minWidth: 150,
      render: (value, row) => (
        <Typography variant="body2">{row.productName || "-"}</Typography>
      ),
    },
    {
      field: "qty",
      header: "Qty",
      align: "center",
      minWidth: 80,
      render: (value, row) => (
        <Typography variant="body2" fontWeight={600}>
          {row.qty || "-"}
        </Typography>
      ),
    },
    {
      field: "region",
      header: "Region",
      minWidth: 120,
      render: (value, row) => (
        <Typography variant="body2">{row.region || "-"}</Typography>
      ),
    },
    {
      field: "hq",
      header: "HQ",
      minWidth: 100,
      render: (value, row) => <Typography variant="body2">{row.hq || "-"}</Typography>,
    },
    {
      field: "editedMobile",
      header: "Edited Mobile",
      minWidth: 140,
      render: (value, row) => (
        <Typography variant="body2" fontFamily="monospace">
          {row.editedMobile || "-"}
        </Typography>
      ),
    },
    {
      field: "originalMobile",
      header: "Original Mobile",
      minWidth: 140,
      render: (value, row) => (
        <Typography variant="body2" fontFamily="monospace">
          {row.originalMobile || "-"}
        </Typography>
      ),
    },
    {
      field: "lastApprovalDate",
      header: "Last approval date",
      minWidth: 160,
      render: (value, row) => (
        <Typography variant="body2">{row.lastApprovalDate || "-"}</Typography>
      ),
    },
    {
      field: "speciality",
      header: "Speciality",
      minWidth: 140,
      render: (value, row) => (
        <Typography variant="body2">{row.speciality || "-"}</Typography>
      ),
    },
    {
      field: "pancard",
      header: "Pancard",
      minWidth: 140,
      render: (value, row) => (
        <Typography variant="body2" fontFamily="monospace">
          {row.pancard || "-"}
        </Typography>
      ),
    },
    {
      field: "pdf",
      header: "PDF",
      align: "center",
      minWidth: 80,
      render: (value, row) => (
        <Tooltip title="View PDF">
          <IconButton
            size="small"
            onClick={() => handleViewPDF(row)}
            sx={{
              color: "error.main",
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
              },
            }}
          >
            <PictureAsPdf fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "zone",
      header: "Zone",
      minWidth: 120,
      render: (value, row) => (
        <Typography variant="body2">{row.zone || "-"}</Typography>
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
          Doctor Request <span style={{ color: "#16A34A" }}>listing</span>
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            startIcon={<FileDownload />}
            onClick={handleExportAll}
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
            Export Doctor Requests
          </Button>
          <Button
            variant="contained"
            startIcon={<FileDownload />}
            onClick={handleExportToday}
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
            Export Today Doctor Requests
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            startIcon={<CheckCircle />}
            onClick={handleAcceptClick}
            disabled={selectedRows.length === 0}
            sx={{
              bgcolor: "#22C55E",
              color: "white",
              fontWeight: 600,
              px: 3,
              py: 1,
              "&:hover": {
                bgcolor: "#16A34A",
              },
              "&:disabled": {
                bgcolor: "#e0e0e0",
                color: "#9e9e9e",
              },
            }}
          >
            Accept ({selectedRows.length})
          </Button>
          <Button
            variant="contained"
            startIcon={<Cancel />}
            onClick={handleRejectClick}
            disabled={selectedRows.length === 0}
            sx={{
              bgcolor: "#EF4444",
              color: "white",
              fontWeight: 600,
              px: 3,
              py: 1,
              "&:hover": {
                bgcolor: "#DC2626",
              },
              "&:disabled": {
                bgcolor: "#e0e0e0",
                color: "#9e9e9e",
              },
            }}
          >
            Reject ({selectedRows.length})
          </Button>
        </Stack>
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
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <DataTable
            columns={columns}
            data={doctorRequests}
            emptyMessage="No data available in table"
            hover={true}
            sx={{
              overflow: "auto",
              "& .MuiTableCell-root": {
                whiteSpace: "nowrap",
              },
              "& .MuiTable-root": {
                minWidth: "max-content",
              },
            }}
          />
        </Box>
      )}

      {!loading && doctorRequests.length === 0 && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Showing 0 to 0 of 0 entries
          </Typography>
        </Box>
      )}

      {/* Confirmation Modal */}
      <Dialog
        open={confirmModal.open}
        onClose={handleCloseModal}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, fontSize: "1.25rem", pb: 1 }}>
          Confirm!
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Are you sure you want to {confirmModal.type} {confirmModal.rows.length} selected request{confirmModal.rows.length > 1 ? 's' : ''}?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              borderColor: "divider",
              color: "text.secondary",
              "&:hover": {
                borderColor: "text.secondary",
                bgcolor: alpha("#000", 0.04),
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              bgcolor: confirmModal.type === "accept" ? "#22C55E" : "#EF4444",
              "&:hover": {
                bgcolor: confirmModal.type === "accept" ? "#16A34A" : "#DC2626",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorRequest;
