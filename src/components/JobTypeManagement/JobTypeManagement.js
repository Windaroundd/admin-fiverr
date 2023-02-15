import React, { useEffect, useState } from "react";

import { Table } from "antd";
import { adminServices } from "../../services/adminServices";
import { columns, expandedColumns } from "./JobTypeUtils";
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
import { setAuthorization } from "../../services/configUrl";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export default function JobTypeManagement() {
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let { token } = useSelector((state) => {
    return state.userSlice.user;
  });
  setAuthorization(token);

  let [jobTypeList, setJobTypeList] = useState([]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      id: "",
      tenLoaiCongViec: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required("Please enter this section"),
      tenLoaiCongViec: Yup.string().required("Please enter this section"),
    }),
    onSubmit: (jobInfo) => {
      let jobInfoFinal = {
        id: +jobInfo.id,
        tenLoaiCongViec: jobInfo.tenLoaiCongViec,
      };
      console.log("jobInfoFinal: ", jobInfoFinal);
      if (isEdit) {
        adminServices
          .putJobType(jobInfoFinal)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        adminServices
          .postJobType(jobInfoFinal)
          .then((res) => {
            toast.success(res.data.message);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });
  const handleDeleteJobType = (jobID) => {
    adminServices
      .deleteJobType(jobID)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  useEffect(() => {
    adminServices
      .getJobTypeList()
      .then((res) => {
        console.log("res: ", res);
        const renderJobTypeList = (jobTypeList) => {
          return jobTypeList.map((jobType) => {
            return {
              id: jobType.id,
              jobID: jobType.maLoaiCongviec,
              groupName: jobType.tenNhom,
              img: <img className="w-32" src={jobType.hinhAnh} alt="" />,

              action: (
                <div className="flex  gap-2">
                  <button
                    onClick={() => {
                      setIsEdit(true);
                      handleOpen();
                    }}
                    className="px-2 py-1 ant-btn ant-btn-default"
                  >
                    View & Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteJobType(jobType.maLoaiCongviec);
                    }}
                    className="px-2 py-1  ant-btn ant-btn-primary ant-btn-dangerous"
                  >
                    Delete
                  </button>
                </div>
              ),
            };
          });
        };
        setJobTypeList(renderJobTypeList(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="container  p-6 shadow-xl user-table">
        {" "}
        <div>
          <button
            onClick={() => {
              handleOpen();
              setIsEdit(false);
            }}
            className="px-2 py-3 bg-green-500 rounded-md mb-3"
          >
            ADD NEW JOB TYPE
          </button>
        </div>
        <Table columns={columns} dataSource={jobTypeList} />
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
                ADD NEW JOB TYPE
              </h1>
            </div>
            <div className="flex justify-start gap-2 mb-4">
              <div>
                <TextField
                  id="outlined-basic"
                  label="ID"
                  variant="outlined"
                  name="id"
                  value={validation.values.id}
                  onChange={validation.handleChange}
                />
                {validation.errors.id && validation.touched.id && (
                  <p className="text-red-400 text-sm">{validation.errors.id}</p>
                )}
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Job Type"
                  variant="outlined"
                  name="tenLoaiCongViec"
                  value={validation.values.tenLoaiCongViec}
                  onChange={validation.handleChange}
                />
                {validation.errors.tenLoaiCongViec &&
                  validation.touched.tenLoaiCongViec && (
                    <p className="text-red-400 text-sm">
                      {validation.errors.tenLoaiCongViec}
                    </p>
                  )}
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
