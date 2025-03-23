// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import './EmergencyReport.css';

// const EmergencyReport = () => {
//     const location = useLocation();
//     const { reportData } = location.state || { reportData: {} }; // Single employee data
//     const [employeeReport, setEmployeeReport] = useState({});

//     useEffect(() => {
//         if (reportData) {
//             setEmployeeReport(reportData);
//         } else {
//             console.log("No report data received");
//         }
//     }, [reportData]);

//     const generatePDF = () => {
//         const doc = new jsPDF();
//         doc.text(`Emergency Contact Report of ${employeeReport.employeeID}`, 14, 16);
//         autoTable(doc, {
//             startY: 20,
//             head: [['Employee Name', 'Employee ID', 'Emergency Contact', 'Contact Number']],
//             body: [[
//                 `${employeeReport.firstName} ${employeeReport.lastName}`,
//                 employeeReport.employeeID,
//                 employeeReport.emergencyContact,  // Assuming employee has this property
//                 employeeReport.emergencyContactPhoneNumber  // Assuming employee has this property
//             ]],
//         });

//         doc.save(`${employeeReport.employeeID}-Emergency-Report.pdf`);
//     };

//     return (
//         <div className="emergency-report-container">
//             {employeeReport ? (
//                 <>
//                     <h1>Emergency Report of {employeeReport.employeeID}</h1>
//                     <button onClick={generatePDF} className="download-button">Download as PDF</button>
//                     <div className="report-details">
//                         <p>Employee Name: {employeeReport.firstName} {employeeReport.lastName}</p>
//                         <p>Employee ID: {employeeReport.employeeID}</p>
//                         <p>Emergency Contact: {employeeReport.emergencyContact}</p>
//                         <p>Contact Number: {employeeReport.emergencyContactPhoneNumber}</p>
//                     </div>
//                 </>
//             ) : (
//                 <h2>No emergency report available</h2>
//             )}
//         </div>
//     );
// };

// export default EmergencyReport;



import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const EmergencyReport = () => {
    const [employeeReport, setEmployeeReport] = useState({
        employeeID: "E12345",
        firstName: "John",
        lastName: "Doe",
        emergencyContact: "Jane Doe",
        emergencyContactPhoneNumber: "123-456-7890",
        salary: 5000,
    });

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text(`Emergency Contact Report of ${employeeReport.employeeID}`, 14, 16);
        autoTable(doc, {
            startY: 20,
            head: [['Employee Name', 'Employee ID', 'Emergency Contact', 'Contact Number']],
            body: [[
                `${employeeReport.firstName} ${employeeReport.lastName}`,
                employeeReport.employeeID,
                employeeReport.emergencyContact,  // Emergency contact person
                employeeReport.emergencyContactPhoneNumber  // Emergency contact phone number
            ]],
        });

        doc.save(`${employeeReport.employeeID}-Emergency-Report.pdf`);
    };

    return (
        <div className="emergency-report-container">
            <h1>Emergency Report of {employeeReport.employeeID}</h1>
            <button onClick={generatePDF} className="download-button">Download as PDF</button>
            <div className="report-details">
                <p>Employee Name: {employeeReport.firstName} {employeeReport.lastName}</p>
                <p>Employee ID: {employeeReport.employeeID}</p>
                <p>Emergency Contact: {employeeReport.emergencyContact}</p>
                <p>Contact Number: {employeeReport.emergencyContactPhoneNumber}</p>
            </div>
        </div>
    );
};

export default EmergencyReport;
