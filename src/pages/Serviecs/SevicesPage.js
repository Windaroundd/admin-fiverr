import { Table } from "antd";
import React, { useEffect, useState } from "react";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { adminServices } from "../../services/adminServices";
import { toast } from "react-toastify";
import { setAuthorization } from "../../services/configUrl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export default function SevicesPage() {
  const [servicesList, setServicesList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [serviceDetail, setServiceDetail] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { token } = useSelector((state) => {
    return state.userSlice.user;
  });
  setAuthorization(token);
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "jobID",
      dataIndex: "jobID",
      key: "jobID",
    },
    {
      title: "Hirer ID",
      dataIndex: "hirerID",
      key: "hirerID",
    },
    {
      title: "Hire Day",
      dataIndex: "hireDay",
      key: "hireDay",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const getServiceDetail = (serviceID) => {
    adminServices
      .getServiceByID(serviceID)
      .then((res) => {
        console.log("res: ", res);
        setServiceDetail(res.data.content);
      })
      .catch((err) => {
        toast.error(err.content);
      });
  };
  const handleChangeSatusService = (event) => {
    setIsComplete(event.target.value);
  };
  const renderServicesList = (servicesList) => {
    return servicesList.map((service) => {
      return {
        key: service.id,
        jobID: service.maCongViec,
        hirerID: service.maNguoiThue,
        hireDay: service.ngayThue,
        status: service.hoanThanh ? "Done" : "Pending",
        action: (
          <div className="flex  gap-2">
            <button
              onClick={() => {
                setIsEdit(true);
                handleOpen();
                getServiceDetail(service.id);
              }}
              className=" ant-btn ant-btn-default"
            >
              View & Edit
            </button>
            <button
              onClick={() => {
                handleDeleteService(service.id);
              }}
              className="  ant-btn ant-btn-primary ant-btn-dangerous"
            >
              Delete
            </button>
          </div>
        ),
      };
    });
  };
  const getServicesList = () => {
    adminServices
      .getServiceList()
      .then((res) => {
        setServicesList(renderServicesList(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getServicesList();
  }, []);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      maCongViec: serviceDetail.maCongViec || "",
      maNguoiThue: serviceDetail.maNguoiThue || "",
      ngayThue: serviceDetail.ngayThue || "",
      hoanThanh: serviceDetail.hoanThanh || "",
    },
    validationSchema: Yup.object({
      maCongViec: Yup.number().required("Please enter service id"),

      maNguoiThue: Yup.number().required("Please enter hirer id"),

      ngayThue: Yup.string().required("Please enter hire day"),
    }),
    onSubmit: (jobInfo) => {
      let jobInfoFinal = { ...jobInfo, hoanThanh: isComplete };
      console.log("jobInfoFinal: ", jobInfoFinal);

      if (isEdit) {
        adminServices
          .putServicebyID(serviceDetail.id, jobInfoFinal)
          .then((res) => {
            toast.success(res.message);
            getServicesList();
            setServiceDetail({});
          })
          .catch((err) => {
            toast.error(err.content);
          });
      } else {
        adminServices
          .postService(jobInfoFinal)
          .then((res) => {
            toast.success(res.message);
            getServicesList();
            setServiceDetail({});
          })
          .catch((err) => {
            toast.error(err.content);
          });
      }
    },
  });
  const handleDeleteService = (serviceID) => {
    adminServices
      .deleteService(serviceID)
      .then((res) => {
        toast(res.message);
        getServicesList();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div>
      <div className="container  p-6 shadow-xl user-table ">
        <div>
          <button
            onClick={() => {
              handleOpen();
              setIsEdit(false);
            }}
            className="px-2 py-3 bg-green-500 rounded-md mb-3"
          >
            ADD NEW SERIVICE
          </button>
        </div>

        <Table columns={columns} dataSource={servicesList} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form id="user-form" onSubmit={validation.handleSubmit}>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-center">
                ADD NEW SERVICE
              </h1>
            </div>
            <div className="flex justify-start gap-2 mb-4">
              <div>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Service ID"
                  variant="outlined"
                  name="maCongViec"
                  value={validation.values.maCongViec}
                  onChange={validation.handleChange}
                />
                {validation.errors.maCongViec &&
                  validation.touched.maCongViec && (
                    <p className="text-red-400 text-sm">
                      {validation.errors.maCongViec}
                    </p>
                  )}
              </div>
              <div>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Hirer ID"
                  variant="outlined"
                  name="maNguoiThue"
                  value={validation.values.maNguoiThue}
                  onChange={validation.handleChange}
                />
                {validation.errors.maNguoiThue &&
                  validation.touched.maNguoiThue && (
                    <p className="text-red-400 text-sm">
                      {validation.errors.maNguoiThue}
                    </p>
                  )}
              </div>
            </div>
            <div
              className={`flex
               justify-start gap-2 mb-4`}
            >
              <div>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Hire day"
                  variant="outlined"
                  name="ngayThue"
                  value={validation.values.ngayThue}
                  onChange={validation.handleChange}
                />
                {validation.errors.ngayThue && validation.touched.ngayThue && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.ngayThue}
                  </p>
                )}
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    sx={{ minWidth: 200 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={isComplete}
                    label="Status"
                    onChange={handleChangeSatusService}
                  >
                    <MenuItem value={true}>Completed</MenuItem>
                    <MenuItem value={false}>Pending</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="px-3 py-2 bg-green-400 rounded-sm"
                type="submit"
              >
                Submit{" "}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
