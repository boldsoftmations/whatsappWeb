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
import apiService from "../../Service/apiService";
import { CustomLoader } from "../../components/CustomLoader";
import { useNotificationHandling } from "../../components/useNotificationHandling";
import { MessageAlert } from "../../components/MessageAlert";
import CustomSearch from "../../components/CustomSearch";
import GroupCreate from "./GroupCreate";

const GroupView = () => {
  const [open, setOpen] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const { handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleReset = () => {
    setSearchQuery("");
  };

  const getGroupsData = useCallback(async () => {
    try {
      setOpen(true);
      const response = await apiService.getGroupData(searchQuery);
      setGroupData(response.data);
    } catch (error) {
      handleError(error);
      console.error("error", error);
    } finally {
      setOpen(false);
    }
  }, [searchQuery, setOpen, setGroupData, handleError]);

  useEffect(() => {
    getGroupsData();
  }, [getGroupsData]);

  const handlePopupCreate = () => {
    setOpenModalCreate(true);
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

            {/* "Group" text in the center */}
            <Grid item xs={12} md={6} lg={4} textAlign="center">
              <h3
                style={{
                  marginBottom: "1em",
                  fontSize: "24px",
                  color: "rgb(34, 34, 34)",
                  fontWeight: 800,
                }}
              >
                Group
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
          <Table sx={{ minWidth: 1200 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Groups</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {groupData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <CustomModal
        maxwidth={"xl"}
        title={"Group Create"}
        openPopup={openModalCreate}
        setOpenPopup={setOpenModalCreate}
      >
        <GroupCreate
          setOpenPopup={setOpenModalCreate}
          getGroupsData={getGroupsData}
        />
      </CustomModal>

    </>
  );
};

export default GroupView;

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
