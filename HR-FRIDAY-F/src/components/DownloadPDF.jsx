import React from "react";
import { jsPDF } from "jspdf";

const DownloadPDF = ({ data }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add text to PDF
    doc.text("Payroll Information", 10, 10);
    doc.text(`Name: ${data.employee.full_name}`, 10, 20);
    doc.text(`Month: ${data.month}`, 10, 30);
    doc.text(`Year: ${data.year}`, 10, 40);
    doc.text(`Hours: ${data.hours}`, 10, 50);
    doc.text(`Base Salary: ${data.base_salary}`, 10, 60);
    doc.text(`Tax: ${data.tax}%`, 10, 70);
    doc.text(`Deductions: ${data.deductions}`, 10, 80);
    // doc.text(`Bonus: $500`, 10, 90);
    doc.text(`Final Amount: ${data.amount}`, 10, 100);

    // Save the PDF
    doc.save("payroll.pdf");
  };

  return <div></div>;
};

export default DownloadPDF;
