"use client";
import React, { useState } from 'react';
import Link from "next/link";
import axios from "axios";
import Table from "./table";
import './style.css'

export default function Reslogin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      if (response.data.success) {
        console.log("You have successfully logged in");
        window.location.href = "/";
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setError("Login failed. Please try again.");
    }
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      setError("");
      if (!name || !email || !password) {
        setError("Please fill in all fields.");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/api/auth/createuser",
        {
          name,
          email,
          password,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        console.log("User created successfully");
        window.location.href = "/";
      } else {
        setError("Email is already in use");
      }
    } catch (error) {
      console.error(error.response.data);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
 <Table/>
    </>
  );
}
