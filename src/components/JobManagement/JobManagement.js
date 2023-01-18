import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { adminServices } from "../../services/adminServices";
import { columns } from "./JobUtils";

export default function JobManagement() {
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    adminServices
      .getJobList()
      .then((res) => {
        const renderJobList = (jobList) => {
          return jobList.map((job) => {
            return {
              key: job.id,
              name: job.tenCongViec,
              avatar: <img src={job.hinhAnh} alt="" />,
              creator: job.nguoiTao,
              shortDesc: job.moTaNgan,
              price: job.giaTien,
              rate: job.danhGia,
            };
          });
        };
        setJobList(renderJobList(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={jobList} />
    </div>
  );
}
