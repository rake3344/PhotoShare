import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Admin.css";
import DataTable from "react-data-table-component";
import axios from "axios";
import { axiosInterceptor } from "../auth/auth";

axiosInterceptor();
export default function Admin() {
  const [users, setUsers] = useState([]);
  const [userAdmin, setUserAdmin] = useState([]);
  const [ban, setBan] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await axios.get("/user/users-admin");
      setUsers(resp.data.users);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserAdmin = async () => {
      const resp = await axios.get("/user/user-admin");
      setUserAdmin(resp.data.userAdmin);
    };
    fetchUserAdmin();
  }, []);

  const columns = [
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Name",
      selector: (row) => row.first_name,
    },
    {
      name: "Lastname",
      selector: (row) => row.last_name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Followers",
      selector: (row) => row.followers,
    },
    {
      name: "Activo",
      selector: (row) => row.activo,
    },
    // {
    //   name: "Ban",
    //   cell: (row) =>
    //     ban ? (
    //       <button
    //         className="btn-unban"
    //         onClick={() => {
    //           const fetchBan = async () => {
    //             const resp = await axios.put(`/user/unban/${row.id_user}`, {
    //               headers: {
    //                 Authorization: `Bearer ${userAdmin[0].id_user}`,
    //               },
    //             });
    //             if (resp.data.msg === "User unbanned successfully") {
    //               console.log(resp);
    //               setBan(false);
    //             }
    //           };
    //           fetchBan();
    //         }}
    //       >
    //         Unban
    //       </button>
    //     ) : (
    //       <button
    //         className="btn-ban"
    //         onClick={() => {
    //           const fetchBan = async () => {
    //             const resp = await axios.put(`/user/ban/${row.id_user}`, {
    //               headers: {
    //                 Authorization: `Bearer ${userAdmin[0].id_user}`,
    //               },
    //             });
    //             if (resp.data.msg === "User banned successfully") {
    //               console.log(resp);
    //               setBan(true);
    //             }
    //           };
    //           fetchBan();
    //         }}
    //       >
    //         Ban
    //       </button>
    //     ),
    // },
  ];

  return (
    <>
      <Navbar />
      <div className="container-father">
        <DataTable
          title="Users"
          columns={columns}
          data={users}
          pagination
          responsive
        />
      </div>
    </>
  );
}
