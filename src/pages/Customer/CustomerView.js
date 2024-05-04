import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import CustomModal from "./../../components/CustomModal";
import CustomerCreate from "./CustomerCreate";
import CustomerUpdate from "./CustomerUpdate";
import apiService from "../../Service/apiService";
import { CustomLoader } from "../../components/CustomLoader";
import { useNotificationHandling } from "../../components/useNotificationHandling";
import { MessageAlert } from "../../components/MessageAlert";
import CustomSearch from "../../components/CustomSearch";

const CustomerView = () => {
  const [open, setOpen] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [groupOptions, setGroupOptions] = useState([]);
  const { handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleReset = () => {
    setSearchQuery("");
  };

  const getCustomersData = useCallback(async () => {
    try {
      setOpen(true);
      const response = await apiService.getCustomerData(searchQuery);
      setCustomerData(response.data);
    } catch (error) {
      handleError(error);
      console.error("error", error);
    } finally {
      setOpen(false);
    }
  }, [searchQuery, setOpen, setCustomerData, handleError]);

  useEffect(() => {
    getCustomersData();
  }, [getCustomersData]);

  const handleFetchGroupOptions = async () => {
    try {
      setOpen(true);
      const response = await apiService.getGroupData();
      setGroupOptions(response.data);
      console.info("Fetched group data:", response.data);
    } catch (error) {
      console.error("Error fetching group data", error);
    } finally {
      setOpen(false);
    }
  };

const handlePopupCreate = async () => {
  await handleFetchGroupOptions();
  setOpenModalCreate(true);
};

const handlePopupUpdate = async (rowData) => {
  await handleFetchGroupOptions();
  setSelectedRow(rowData);
  setOpenModalUpdate(true);
};

  return (
    <>
      <CustomLoader open={open} />
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
      <Grid item xs={12}>
          <Box marginBottom="10px">
            <Grid container spacing={2} alignItems="center">
              {/* Search field on the left */}
              <Grid item xs={12} md={6} lg={4}>
                <CustomSearch onSearch={handleSearch} onReset={handleReset} />
              </Grid>

              {/* "Customer" text in the center */}
              <Grid item xs={12} md={6} lg={4} textAlign="center">
                <h3
                  style={{
                    marginBottom: "1em",
                    fontSize: "24px",
                    color: "rgb(34, 34, 34)",
                    fontWeight: 800,
                  }}
                >
                  Customer
                </h3>
              </Grid>

              {/* Add button on the right */}
              <Grid item xs={12} md={6} lg={4} textAlign="right">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handlePopupCreate(true)}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>

          <TableContainer
            sx={{
              maxHeight: 400,
              "&::-webkit-scrollbar": {
                width: 15,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f2f2f2",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#aaa9ac",
              },
            }}
          >
            <Table
              sx={{ minWidth: 1200 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Number</StyledTableCell>
                  <StyledTableCell align="center">Groups</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {customerData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.user_email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.number}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.groups.join(", ")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        sx={{ color: "#1976d2" }}
                        onClick={() => handlePopupUpdate(row)}
                      >
                        View
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
      <CustomModal
        maxwidth={"xl"}
        title={"Customer Create"}
        openPopup={openModalCreate}
        setOpenPopup={setOpenModalCreate}
      >
        <CustomerCreate
          setOpenPopup={setOpenModalCreate}
          getCustomersData={getCustomersData}
          groupOptions={groupOptions}
        />
      </CustomModal>
      <CustomModal
        maxwidth={"xl"}
        title={"Customer Update"}
        openPopup={openModalUpdate}
        setOpenPopup={setOpenModalUpdate}
      >
        <CustomerUpdate
          setOpenPopup={setOpenModalUpdate}
          selectedRow={selectedRow}
          getCustomersData={getCustomersData}
          groupOptions={groupOptions}
        />
      </CustomModal>
    </>
  );
};

export default CustomerView;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: 0, // Remove padding from header cells
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 0, // Remove padding from body cells
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
