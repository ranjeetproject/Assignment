import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../../constants/constants";

const AddForm = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const [isValid, setIsValid] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_END_POINT}users/create`);
      const formattedOptions = response.data.roles.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setOptions(formattedOptions);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //select multiple options
  const handleChange = (selectedOption) => {
    setSelectedRoles(selectedOption);
  };

  ///Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValid(isValidEmail);
    if (name == null) {
      toast("please enter your name");
      setIsLoading(false);
    } else if (email == null) {
      toast("please enter your email address");
      setIsLoading(false);
    } else if (isValid == false) {
      toast("please enter your valid email address");
      setIsLoading(false);
    } else if (selectedRoles.length == 0) {
      toast("please chooses roles");
      setIsLoading(false);
    } else {
      try {
        await axios.post(`${API_END_POINT}users`, {
          name,
          email,
          roles: selectedRoles.map((role) => role.value),
        });
        // Reset form fields
        setName("");
        setEmail("");
        setSelectedRoles([]);
        setIsLoading(false);
        navigate("list");
      } catch (error) {
        setIsError(error.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Add Form</h3>
      </div>
      <div
        className="container"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: "500px" }}>
          <div className=" mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" mb-3">
            <Select
              options={options}
              isMulti
              value={selectedRoles}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddForm;
