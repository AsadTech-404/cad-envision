import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateInvoice = (order) => {
  const doc = new PDFDocument();
  const filePath = path.join("invoices", `invoice-${order._id}.pdf`);

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("INVOICE", { align: "center" });
  doc.moveDown();
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Customer: ${order.customerEmail}`);
  doc.text(`Status: ${order.status}`);
  doc.moveDown();

  order.items.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.drawing.title} - $${item.price}`);
  });

  doc.moveDown();
  doc.text(`Total: $${order.totalAmount}`, { bold: true });

  doc.end();

  return filePath;
};
