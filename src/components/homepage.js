"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./table";
import Nav from "./navbar";
import Sidebar from './sidebar';
import Mainpage from "./mainpage";

export default function Homepage() {
    const [data, setData] = useState("");

    useEffect(() => {
        fetch_user_data();
    }, []);

    async function fetch_user_data() {
        console.log('fetching data');
        const params = new URLSearchParams(window.location.search);
        const authcode = params.get('code');

        // Check if authorization code exists
        if (!authcode) {
            console.error('Authorization code not found in URL');
            return;
        }

        console.log(authcode);

        try {
            // POST request to retrieve access token
            const response = await axios.post("https://iprc-backend-208970416432.us-central1.run.app/api/auth/channeli", {
                authcode,
            });

            console.log(response.data);

            if (typeof window !== 'undefined') {
                localStorage.setItem('userdata', JSON.stringify(response.data));
            }

            var userKaData = await response.data;
            setData(userKaData);

            const profile_data_string =
                "Enrolment Number: " + userKaData.username + "<br/>" +
                "Name: " + userKaData.person.fullName + "<br/>" +
                "Current Year: " + userKaData.student.currentYear + "<br/>" +
                "Institute Email: " + userKaData.contactInformation.instituteWebmailAddress + "<br/>";

            console.log(profile_data_string);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <Mainpage />
            <div className="grid grid-cols-[auto,1fr]">
                <Sidebar userdata={data} className="h-screen" />
                <Table />
            </div>
        </>
    );
}
