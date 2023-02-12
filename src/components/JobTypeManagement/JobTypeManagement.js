import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table } from "antd";
import { adminServices } from "../../services/adminServices";
import { columns, expandedColumns } from "./JobTypeUtils";

export default function JobTypeManagement() {
  let [jobTypeList, setJobTypeList] = useState([]);
  useEffect(() => {
    adminServices
      .getJobTypeList()
      .then((res) => {
        const renderJobTypeList = (jobTypeList) => {
          return jobTypeList.map((jobType) => {
            return {
              id: jobType.id,
              jobID: jobType.maLoaiCongviec,
              groupName: jobType.tenNhom,
              img: <img className="w-32" src={jobType.hinhAnh} alt="" />,
              dsChiTietLoai: jobType.dsChiTietLoai,
            };
          });
        };
        setJobTypeList(renderJobTypeList(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {}, [jobTypeList]);
  const data = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 3,
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
  ];

  const data1 = [
    {
      key: 1,
      name: "I am diff",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      name: "yes",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 3,
      name: "no",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
  ];

  const data2 = [
    {
      key: 1,
      name: "hello",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      name: "hi",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 3,
      name: "test",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
  ];

  const expandedRow = (row) => {
    let jobIndex = jobTypeList.findIndex((job) => {
      return job.id == row.id;
    });
    let inTable = jobTypeList[jobIndex].dsChiTietLoai.map((jobDetail) => {
      return {
        id: jobDetail.id,
        name: jobDetail.tenChiTiet,
      };
    });

    return (
      <Table
        columns={expandedColumns}
        dataSource={inTable}
        pagination={false}
      />
    );
  };
  return (
    <div>
      <Table
        columns={columns}
        expandedRowRender={expandedRow}
        dataSource={jobTypeList}
      />
    </div>
  );
}
