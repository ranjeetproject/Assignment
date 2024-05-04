import React, { useState, useEffect } from "react";
import { API_END_POINT } from "../../constants/constants";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const List = () => {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    try {
      const response = await axios.get(`${API_END_POINT}users`);
      setListData(response.data.user);
      console.log(listData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <div
      className="container"
      style={{
        display: "flex",
      }}
    >
    <button className="btn btn-danger" onClick={()=>navigate(-1)}>Back</button>
    </div>
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.roles.map((role) => `${role.name}, `)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default List;
