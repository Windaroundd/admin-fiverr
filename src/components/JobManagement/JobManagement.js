import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { adminServices } from "../../services/adminServices";
import { columns } from "./JobUtils";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, FormControl, InputLabel, Modal, TextField } from "@mui/material";
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
export default function JobManagement() {
  const [jobList, setJobList] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [jobDetail, setJobDetail] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { token } = useSelector((state) => {
    return state.userSlice.user;
  });
  setAuthorization(token);
  const renderJobList = (jobList) => {
    return jobList.map((job) => {
      return {
        key: job.id,
        name: job.tenCongViec,
        avatar: <img className="w-52" src={job.hinhAnh} alt="" />,
        creator: job.nguoiTao,
        shortDesc: job.moTaNgan,
        price: job.giaTien,
        rate: job.danhGia,
        action: (
          <div className="flex  gap-2">
            <button
              onClick={() => {
                setIsEdit(true);
                handleOpen();
                getJobDetail(job.id);
              }}
              className=" ant-btn ant-btn-default"
            >
              <span>View & Edit</span>
            </button>
            <button
              onClick={() => {
                handleDeleteJob(job.id);
              }}
              className="  ant-btn ant-btn-primary ant-btn-dangerous"
            >
              <span>Delete</span>
            </button>
          </div>
        ),
      };
    });
  };
  const getJobList = () => {
    adminServices
      .getJobList()
      .then((res) => {
        setJobList(renderJobList(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getJobList();
  }, []);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      tenCongViec: jobDetail.tenCongViec || "",
      danhGia: jobDetail.danhGia || "",
      giaTien: jobDetail.giaTien || "",
      nguoiTao: jobDetail.nguoiTao || "",
      hinhAnh: jobDetail.hinhAnh || "",
      moTa: jobDetail.moTa || "",
      maChiTietLoaiCongViec: jobDetail.maChiTietLoaiCongViec || "",
      moTaNgan: jobDetail.moTaNgan || "",
      saoCongViec: jobDetail.saoCongViec || "",
    },
    validationSchema: Yup.object({
      tenCongViec: Yup.string().required("Please enter job title"),

      danhGia: Yup.number().required("Please enter job rate"),

      giaTien: Yup.number().required("Please enter job price"),

      nguoiTao: Yup.number().required("Please enter creator id"),

      hinhAnh: Yup.string().required("Please enter image link"),
      moTa: Yup.string().required("Please enter job description"),
      maChiTietLoaiCongViec: Yup.number().required(
        "Please enter job type detail id"
      ),

      moTaNgan: Yup.string().required("Please enter short description"),
      saoCongViec: Yup.number().required("Please enter job start"),
    }),
    onSubmit: (jobInfo) => {
      if (isEdit) {
        adminServices
          .putJobDetail(jobDetail.id, jobInfo)
          .then((res) => {
            toast.success(res.message);
            getJobList();
            setJobDetail({});
          })
          .catch((err) => {
            toast.error(err.content);
          });
      } else {
        adminServices
          .addNewJob(jobInfo)
          .then((res) => {
            toast.success(res.data.message);
            getJobList();
            setJobDetail({});
          })
          .catch((err) => {
            toast.error(err.response.data.content);
          });
      }
    },
  });
  const getJobDetail = (jobID) => {
    adminServices
      .getJobByID(jobID)
      .then((res) => {
        setJobDetail(res.data.content);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleDeleteJob = (userID) => {
    adminServices
      .deleteJob(userID)
      .then((res) => {
        toast.success(res.data.message);
        getJobList();
      })
      .catch((err) => {
        toast.error(err.response.data.content);
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
            ADD NEW JOB
          </button>
        </div>

        <Table columns={columns} dataSource={jobList} />
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
              <h1 className="text-3xl font-bold text-center">ADD NEW JOB</h1>
            </div>
            <div className="flex justify-start gap-2 mb-4">
              <div>
                <TextField
                  id="outlined-basic"
                  label="Job title"
                  variant="outlined"
                  name="tenCongViec"
                  value={validation.values.tenCongViec}
                  onChange={validation.handleChange}
                />
                {validation.errors.tenCongViec &&
                  validation.touched.tenCongViec && (
                    <p className="text-red-400 text-sm">
                      {validation.errors.tenCongViec}
                    </p>
                  )}
              </div>
              <div>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Rate"
                  variant="outlined"
                  name="danhGia"
                  value={validation.values.danhGia}
                  onChange={validation.handleChange}
                />
                {validation.errors.danhGia && validation.touched.danhGia && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.danhGia}
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
                  type="number"
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  name="giaTien"
                  value={validation.values.giaTien}
                  onChange={validation.handleChange}
                />
                {validation.errors.giaTien && validation.touched.giaTien && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.giaTien}
                  </p>
                )}
              </div>
              <div>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Creator"
                  variant="outlined"
                  name="nguoiTao"
                  value={validation.values.nguoiTao}
                  onChange={validation.handleChange}
                />
                {validation.errors.nguoiTao && validation.touched.nguoiTao && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.nguoiTao}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-start gap-2 mb-4">
              <div>
                <TextField
                  id="outlined-basic"
                  label="Image"
                  variant="outlined"
                  name="hinhAnh"
                  value={validation.values.hinhAnh}
                  onChange={validation.handleChange}
                />
                {validation.errors.hinhAnh && validation.touched.hinhAnh && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.hinhAnh}
                  </p>
                )}
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Short Description"
                  variant="outlined"
                  name="moTaNgan"
                  value={validation.values.moTaNgan}
                  onChange={validation.handleChange}
                />
                {validation.errors.moTaNgan && validation.touched.moTaNgan && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.moTaNgan}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-start gap-2 mb-4">
              <div>
                <TextField
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  name="moTa"
                  value={validation.values.moTa}
                  onChange={validation.handleChange}
                />
                {validation.errors.moTa && validation.touched.moTa && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.moTa}
                  </p>
                )}
              </div>
              <div>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Job type detail id"
                  variant="outlined"
                  name="maChiTietLoaiCongViec"
                  value={validation.values.maChiTietLoaiCongViec}
                  onChange={validation.handleChange}
                />
                {validation.errors.maChiTietLoaiCongViec &&
                  validation.touched.maChiTietLoaiCongViec && (
                    <p className="text-red-400 text-sm">
                      {validation.errors.maChiTietLoaiCongViec}
                    </p>
                  )}
              </div>
            </div>
            <div className="flex justify-start gap-2 mb-4">
              <div>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Job Star"
                  variant="outlined"
                  name="saoCongViec"
                  value={validation.values.saoCongViec}
                  onChange={validation.handleChange}
                />
                {validation.errors.saoCongViec &&
                  validation.touched.saoCongViec && (
                    <p className="text-red-400 text-sm">
                      {validation.errors.saoCongViec}
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
