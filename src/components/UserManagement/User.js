import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { adminServices } from "../../services/adminServices";
import { columns } from "./userUtils";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export default function User() {
  let { role } = useSelector((state) => {
    return state.userSlice.user.user;
  });
  const [isEdit, setIsEdit] = useState(false);
  const [gender, setGender] = useState(true);

  const [userDetail, setUserDetail] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getUserDetail = (userID) => {
    adminServices
      .getUserDetail(userID)
      .then((res) => {
        let userDetail = res.data.content;
        let fakeUserDetail = {
          ...JSON.parse(JSON.stringify(userDetail)),
          password: "123456789",
          confirmPassword: "123456789",
        };
        setUserDetail(fakeUserDetail);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const renderUserList = (userList) => {
    return userList.map((userAccount) => {
      return {
        key: userAccount.id,
        name: userAccount.name,
        avatar: userAccount.hinhAnh,
        role: userAccount.role,
        action: (
          <div className="flex  gap-2">
            <button
              onClick={() => {
                setIsEdit(true);
                handleOpen();
                getUserDetail(userAccount.id);
              }}
              className="px-2 py-1 ant-btn ant-btn-default"
            >
              View & Edit
            </button>
            <button
              onClick={() => {
                handleDeleteUser(userAccount.id);
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
  const [userList, setUserList] = useState([]);
  const getUserList = () => {
    adminServices
      .getUserList()
      .then((res) => {
        setUserList(renderUserList(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserList();
  }, []);
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleDeleteUser = (userID) => {
    adminServices
      .deleteUser(userID)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.content);
      });
  };
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: userDetail.name || "",
      email: userDetail.email || "",
      password: userDetail.password || "",
      phone: userDetail.phone || "",
      birthday: moment(userDetail.birthday).format("DD / MM / YYYY") || "",

      role: userDetail.role || "",
      skill: userDetail?.skill?.join() || "",
      certification: userDetail?.certification?.join() || "",
      confirmPassword: userDetail.confirmPassword || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter user name"),

      email: Yup.string()
        .email("Invalid email")
        .required("Please enter user email"),

      phone: Yup.string().required("Please enter user phone"),

      birthday: Yup.string().required("Please enter user birthday"),

      role: Yup.string().required("Please enter user role"),
      skill: Yup.string().required("Please enter user skill"),
      certification: Yup.string().required("Please enter user certification"),

      password: Yup.string()
        .min(6, "Your password must be at least 6 characters")
        .max(25, "Your password must be at least 25 characters")
        .required("Please enter user password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password does not match")
        .required("Please confirm your password"),
    }),
    onSubmit: (userInfo) => {
      console.log("userInfo: ", userInfo);
      let { skill, certification } = userInfo;

      let UserInfoFinal = {
        ...userInfo,
        skill: [...skill.split(",")],
        certification: [...certification.split(",")],
        gender: gender,
      };
      if (isEdit) {
        adminServices
          .putUserInfo(userDetail.id, UserInfoFinal)
          .then((res) => {
            toast.success("Update user successfully");
            setUserDetail({});
            getUserList();
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } else {
        adminServices
          .addNewUser(UserInfoFinal)
          .then((res) => {
            toast.success("Add user successfully");
            setUserDetail({});
            getUserList();
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    },
  });
  const searchUser = (username) => {
    if (username === "") {
      adminServices
        .getUserList()
        .then((res) => {
          setUserList(renderUserList(res.data.content));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      adminServices
        .searchUser(username)
        .then((res) => {
          setUserList(renderUserList(res.data.content));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="">
      <div className="container  p-6 shadow-xl user-table ">
        <div>
          <button
            onClick={() => {
              handleOpen();
              setIsEdit(false);
            }}
            className="px-2 py-3 bg-green-500 rounded-md mb-3"
          >
            ADD NEW USER
          </button>
        </div>
        <div className="flex justify-center">
          <input
            onChange={(e) => {
              searchUser(e.target.value);
            }}
            className="w-3/4 py-2 px-3"
            type="text"
            placeholder="Search user"
          />
        </div>
        <Table className="" columns={columns} dataSource={userList} />
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
              <h1 className="text-3xl font-bold text-center">ADD NEW USER</h1>
            </div>
            <div className="flex justify-start gap-2 mb-4">
              <div>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={validation.values.name}
                  onChange={validation.handleChange}
                />
                {validation.errors.name && validation.touched.name && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.name}
                  </p>
                )}
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={validation.values.email}
                  onChange={validation.handleChange}
                />
                {validation.errors.email && validation.touched.email && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.email}
                  </p>
                )}
              </div>
            </div>
            <div
              className={`${isEdit ? "hidden" : "flex"}
               justify-start gap-2 mb-4`}
            >
              <div>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  name="password"
                  value={validation.values.password}
                  onChange={validation.handleChange}
                />
                {validation.errors.password && validation.touched.password && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.password}
                  </p>
                )}
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Confirm password"
                  variant="outlined"
                  name="confirmPassword"
                  value={validation.values.confirmPassword}
                  onChange={validation.handleChange}
                />
                {validation.errors.confirmPassword &&
                  validation.touched.confirmPassword && (
                    <p className="text-red-400 text-sm">
                      {validation.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>
            <div className="flex justify-start gap-2 mb-4">
              <div>
                <TextField
                  id="outlined-basic"
                  label="Skill"
                  variant="outlined"
                  name="skill"
                  value={validation.values.skill}
                  onChange={validation.handleChange}
                />
                {validation.errors.skill && validation.touched.skill && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.skill}
                  </p>
                )}
                <p className="text-xs text-gray-400">
                  *Note: Please separate your skills by ","
                </p>
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  name="phone"
                  value={validation.values.phone}
                  onChange={validation.handleChange}
                />
                {validation.errors.phone && validation.touched.phone && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.phone}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-start gap-2 mb-4">
              <div>
                <TextField
                  id="outlined-basic"
                  label="Birthday"
                  variant="outlined"
                  name="birthday"
                  value={validation.values.birthday}
                  onChange={validation.handleChange}
                />
                {validation.errors.birthday && validation.touched.birthday && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.birthday}
                  </p>
                )}
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    sx={{ minWidth: 200 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="Gender"
                    onChange={handleChangeGender}
                  >
                    <MenuItem value={true}>Male</MenuItem>
                    <MenuItem value={false}>Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex justify-start gap-2 mb-4">
              <div>
                <TextField
                  id="outlined-basic"
                  label="Role"
                  variant="outlined"
                  name="role"
                  value={validation.values.role}
                  onChange={validation.handleChange}
                />
                {validation.errors.role && validation.touched.role && (
                  <p className="text-red-400 text-sm">
                    {validation.errors.role}
                  </p>
                )}
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Certification"
                  variant="outlined"
                  name="certification"
                  value={validation.values.certification}
                  onChange={validation.handleChange}
                />
                {validation.errors.certification &&
                  validation.touched.certification && (
                    <p className="text-red-400 text-sm">
                      {validation.errors.certification}
                    </p>
                  )}
                <p className="text-xs text-gray-400">
                  *Note: Please separate your certifications by ","
                </p>
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
