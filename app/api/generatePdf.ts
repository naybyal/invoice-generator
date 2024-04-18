// pages/api/generatePdf.ts

import { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';
import fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const formData = req.body;

        // Create a new PDF document
        const doc = new PDFDocument();

        // Set font and font size
        doc.font('Helvetica').fontSize(12);

        // Add content to the PDF
        doc.text(`${formData.centreName}`);
        doc.text(`${formData.address}`);
        doc.text(`${formData.contactNo}`);
        doc.text(`${formData.pinCode}`);
        doc.text(`${formData.uniqueCode}`);
        doc.text(`T${formData.serialNumber}`);
        doc.text(`${formData.transactionDate}`);
        doc.text(`Applicant Name: ${formData.applicantName}`);
        doc.text(`Service Availed: ${formData.serviceAvailed}`);
        doc.text(`Service Charge (Govt.): ${formData.govtServiceCharge}`);
        doc.text(`Amount Paid: ${formData.totalAmountPaid}`);
        doc.text(`${formData.greetingMessage}`);

        // Save the PDF to a file
        const filePath = `pdfs/pdf_${Date.now()}.pdf`;  // Updated file path
        doc.pipe(fs.createWriteStream(filePath));
        doc.end();

        const fileData = fs.readFileSync(filePath);
        // Set response headers for download
        res.setHeader('Content-Disposition', `attachment; filename=${filePath}`);
        res.setHeader('Content-Type', 'application/pdf');

        // Return the file path or other response
        res.status(200).end(fileData);
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
