import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { adminServices } from "../../services/adminServices";
import { columns } from "./userUtils";

export default function User() {
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
            };
          });
        };
        setUserList(renderUserList(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={userList} />
    </div>
  );
}
