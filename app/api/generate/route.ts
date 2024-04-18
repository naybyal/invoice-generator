import PDFDocument from 'pdfkit';
import fs from 'fs';

export async function POST(req: any, res: any) {
    if (req.method === 'POST') {
        const formData = req.body;
        const doc = new PDFDocument();

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

        const filePath = `pdfs/pdf_${Date.now()}.pdf`;
        doc.pipe(fs.createWriteStream(filePath));
        doc.end();

        const fileData = fs.readFileSync(filePath);

        res.setHeader('Content-Disposition', `attachment; filename=${filePath}`);
        res.setHeader('Content-Type', 'application/pdf');

        res.status(200).end(fileData);
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}




