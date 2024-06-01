"use client";
import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

import axios from 'axios'; // install axios using npm install axios
import { Directions } from '@mui/icons-material';

export default function Stats() {
  // State for department-wise patent applications
  const [departmentData, setDepartmentData] = useState({
    labels: ["AP", "AMSC", "BB", "CE", "CH", "CIV", "CSE", "DES", "EE", "ES", "ELE", "ECE", "HSS", "HYD", "HRE", "MS", "MATH", "MIE", "MME", "PT", "PPE", "PHY", "WRDM"],
    datasets: [
      {
        label: 'Number of Patent Applications',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [2, 25, 37, 66, 40, 32, 96, 6, 76, 5, 55, 13, 13, 74, 22, 90, 18, 59, 81, 31, 55, 41, 32],
      },
    ],
  });

  // State for pie chart data
  const [pieChartData, setPieChartData] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
      {
        data: [30, 20, 15, 10, 25],
        backgroundColor: [
          'rgba(255,99,132,0.6)',
          'rgba(54,162,235,0.6)',
          'rgba(255,206,86,0.6)',
          'rgba(75,192,192,0.6)',
          'rgba(153,102,255,0.6)',
        ],
        hoverBackgroundColor: [
          'rgba(255,99,132,0.8)',
          'rgba(54,162,235,0.8)',
          'rgba(255,206,86,0.8)',
          'rgba(75,192,192,0.8)',
          'rgba(153,102,255,0.8)',
        ],
      },
    ],
  });

  // State for yearly patent filings
  const [yearlyData, setYearlyData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Number of Patent Filings',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Simulating API response delay
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       // Replace this with the actual API endpoint for department-wise data
  //       const departmentResponse = await axios.get('https://api.example.com/department-data');
  //       setDepartmentData(departmentResponse.data);

  //       // Replace this with the actual API endpoint for pie chart data
  //       const pieChartResponse = await axios.get('https://api.example.com/pie-chart-data');
  //       setPieChartData(pieChartResponse.data);

  //       // Replace this with the actual API endpoint for yearly data
  //       const yearlyDataResponse = await axios.get('https://api.example.com/yearly-data');
  //       setYearlyData(yearlyDataResponse.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error.message);
  //     }
  //   };

  //   fetchData();
  // }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <>
    <div className="stats">
    {/* <div style={{  margin: '30px' }}> */}
      <div className='ststbox' style={{ flex: '1', marginRight: '10px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Department-wise Patent Applications</h2>
        <Bar data={departmentData} options={{ maintainAspectRatio: true }} />
      </div>
      <div className='ststbox' style={{ flex: '2', marginRight: '10px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Department-wise Distribution</h2>
        <Pie data={pieChartData} options={{ maintainAspectRatio: true }} />
      </div>
      <div className='ststbox'style={{ flex: '3' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Yearly Patent Filings</h2>
        <Bar data={yearlyData} options={{ maintainAspectRatio: true }} />
      </div>
    </div>
    {/* </div> */}
    </>
  );
};


