import React, { useCallback, useEffect, useState } from "react";
import { Table } from "antd";

import { adminServices } from "../../services/adminServices";
import { columns } from "./userUtils";
import { useSelector } from "react-redux";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
  const [gender, setGender] = useState(true);

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    adminServices
      .getUserList()
      .then((res) => {
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
                    onClick={() => {}}
                    className="px-2 py-1 ant-btn ant-btn-default"
                  >
                    View & Edit
                  </button>
                  <button
                    onClick={() => {}}
                    className="px-2 py-1  ant-btn ant-btn-primary ant-btn-dangerous"
                  >
                    Delete
                  </button>
                </div>
              ),
            };
          });
        };
        setUserList(renderUserList(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",

      role: "",
      skill: "",
      certification: "",
      confirmPassword: "",
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
      adminServices
        .addNewUser(UserInfoFinal)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <div className="my-8 ">
      <div className="container  p-6 ">
        <div>
          <button
            onClick={handleOpen}
            className="px-2 py-3 bg-green-500 rounded-md mb-3"
          >
            Add new User
          </button>
        </div>
        <Table className="shadow-xl" columns={columns} dataSource={userList} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={validation.handleSubmit}>
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
            <div className="flex justify-start gap-2 mb-4">
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
