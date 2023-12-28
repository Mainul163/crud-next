"use client";
import React from "react";
import "tailwindcss/tailwind.css";
import { useState, useEffect } from "react";
import styles from "../style/userTable.module.css";
const UserTable = () => {
  const [userinfo, setUserinfo] = useState([]);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [country, setCountry] = useState("");

  const handleModel = () => {
    document.getElementById("my_modal_1").showModal();
    var inputElement = document.getElementById("first-name");

    // Set the value of the input element
    inputElement.value = "New Value";
  };

  const loadInfo = () => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setUserinfo(data));
  };
  const handleSubmit = (id) => {
    console.log("data", id);
    fetch(`http://localhost:5000/employees/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => loadInfo());
  };
  useEffect(() => {
    loadInfo();
  }, []);
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
                  <button
                    className="btn btn-error"
                    onClick={() => handleSubmit(data.id)}
                  >
                    DELETE
                  </button>
                  <button
                    className="btn btn-accent"
                    onClick={() => handleModel()}
                  >
                    UPDATE
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update form</h3>

          <div className="modal-action">
            <form method="dialog">
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="first-name"
                          value={name}
                          id="first-name"
                          autoComplete="given-name"
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          autoComplete="email"
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          onChange={(e) => setCountry(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserTable;
