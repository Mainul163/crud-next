"use client";
import React from "react";
import "tailwindcss/tailwind.css";
import { useState, useEffect } from "react";
import styles from "../style/userTable.module.css";
const UserTable = () => {
  const [userinfo, setUserinfo] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setUserinfo(data));
  }, [userinfo]);
  console.log(userinfo, "data");

  return (
    <div>
      <div className="overflow-x-auto">
        <table className={`${styles.borderTable} table`}>
          {/* head */}
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userinfo.map((data) => (
              <tr key={data.id}>
                <th>{data.id}</th>
                <th>{data.name}</th>
                <th>{data.email}</th>
                <th>{data.country}</th>
                <th>
                  <button className="btn btn-error">DELETE</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
