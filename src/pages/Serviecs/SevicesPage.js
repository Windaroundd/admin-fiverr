import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { adminServices } from "../../services/adminServices";

export default function SevicesPage() {
  const [servicesList, setServicesList] = useState([]);

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

  useEffect(() => {
    adminServices
      .getServiceList()
      .then((res) => {
        console.log(res);
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
                  <button className="px-2 py-1 ant-btn ant-btn-default">
                    View & Edit
                  </button>
                  <button className="px-2 py-1  ant-btn ant-btn-primary ant-btn-dangerous">
                    Delete
                  </button>
                </div>
              ),
            };
          });
        };
        setServicesList(renderServicesList(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={servicesList} />
    </div>
  );
}
