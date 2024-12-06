import React, { useEffect, useState, useRef } from "react";
import Payslip from "../PaySlip";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import html2pdf from "html2pdf.js";

function PaySlipContainer() {
  const { payroll_id } = useParams();
  const api = useAxios();
  const [paySlipData, setPaySlipData] = useState({});
  const [loading, setLoading] = useState(true);
  const payslipRef = useRef(null);

  useEffect(() => {
    api
      .get(`main/payroll-detail/${payroll_id}/`)
      .then((response) => {
        setPaySlipData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDownload = () => {
    // Options for the PDF generation (optional)
    const options = {
      filename: `payslip_${payroll_id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Use html2pdf library to generate PDF from HTML content
    html2pdf().set(options).from(payslipRef.current).save();
  };

  return (
    <div style={{ padding: "5px" }}>
      {!loading && (
        <>
          <div ref={payslipRef}>
            <Payslip paySlipData={paySlipData} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "5px",
            }}
          >
            <button
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#007BFF",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleDownload}
            >
              Download PDF
            </button>
            <Link to="/payroll">
              <button
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "lightslategray",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Go Back
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default PaySlipContainer;
