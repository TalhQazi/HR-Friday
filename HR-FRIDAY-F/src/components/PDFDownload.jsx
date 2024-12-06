import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRef } from "react";
function PDFDownload({ payroll }) {
  const pdfRef = useRef();
  const downloadPDF = function () {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - pdfHeight * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("payroll.pdf");
    });
  };
  return (
    <div className="column is-full" ref={pdfRef}>
      <div className="content">
        <h2>Payroll Summary</h2>
        <table className="table is-bordered">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <span id="summaryName">{payroll.employee.full_name}</span>
              </td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>
                <span id="summaryDate">
                  {payroll.month} {payroll.year}
                </span>
              </td>
            </tr>
            <tr>
              <td>Monthly Salary:</td>
              <td>
                <span id="summaryBaseSalary">{payroll.base_salary}</span>
              </td>
            </tr>
            {/* <tr>
          <td>Overtime Pay:</td>
          <td>
            <span id="summaryOvertimePay"></span>
          </td>
        </tr> */}
            <tr>
              <td>Bonus:</td>
              <td>
                <span id="summaryBonus">{payroll.bonus}</span>
              </td>
            </tr>
            <tr>
              <td>Deductions:</td>
              <td>
                <span id="summaryDeductions">{payroll.deductions}</span>
              </td>
            </tr>
            <tr>
              <td>Taxes:</td>
              <td>
                <span id="summaryTaxes">{payroll.tax}</span>
              </td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>
                <span id="summaryTotal">{payroll.total}</span>
              </td>
            </tr>

            <tr>
              <td>Status:</td>
              <td>
                <span id="summaryStatus">{payroll.status}</span>
              </td>
            </tr>
            <br />
          </tbody>
        </table>
        <div className="field">
          <div className="control">
            <button className="button is-primary" onClick={downloadPDF}>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PDFDownload;
