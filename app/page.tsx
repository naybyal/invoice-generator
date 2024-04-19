'use client'

import styles from '@/app/home.module.css';
import React, { useState } from 'react';
import jsPDF from 'jspdf'

function Form() {
        const [formData, setFormData] = useState({
            centreName: '',
            address: '',
            contactNo: '',
            pinCode: '',
            uniqueCode: '',
            serialNumber: '',
            transactionDate: '',
            applicantName: '',
            serviceAvailed: '',
            govtServiceCharge: '',
            totalAmountPaid: '',
            greetingMessage: '',
        });

        const handleChange = (e: { target: { name: any; value: any; }; }) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = async (e: { preventDefault: () => void; }) => {
            e.preventDefault();
            try {
                const doc = new jsPDF();

                let y = 10;
                Object.entries(formData).forEach(([key, value]) => {
                    const text = key === 'serialNumber' ? `${value}` : value;
                    const labelText = key === 'greetingMessage' ? `` : `${key}:`;

                    doc.text(labelText, 10, y);
                    doc.text(text, 80, y);

                    y += 20;
                });

                doc.save(`pdf_${Date.now()}.pdf`);
            } catch (error) {
                console.error('Error generating PDF:', error);
            }
        };

        return (
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label>Centre Name:</label>
                    <input type="text" name="centreName" value={formData.centreName} onChange={handleChange}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Address:</label>
                    <textarea name="address" value={formData.address} onChange={handleChange}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Contact No.:</label>
                    <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Pin Code:</label>
                    <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Akshaya Centre Unique Code:</label>
                    <input type="text" name="uniqueCode" value={formData.uniqueCode} onChange={handleChange}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Serial Number / Transaction Number:</label>
                    <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Date/Time of Transaction:</label>
                    <input type="datetime-local" name="transactionDate" value={formData.transactionDate}
                           onChange={handleChange}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Name of the Applicant:</label>
                    <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Service Availed:</label>
                    <input type="text" name="serviceAvailed" value={formData.serviceAvailed} onChange={handleChange}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Service Charge (Govt. Service Charge):</label>
                    <input type="text" name="govtServiceCharge" value={formData.govtServiceCharge}
                           onChange={handleChange}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Amount Paid (Govt. Service Charge + Akshaya Service Charge):</label>
                    <input type="text" name="totalAmountPaid" value={formData.totalAmountPaid} onChange={handleChange}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Greeting Message (optional):</label>
                    <textarea name="greetingMessage" value={formData.greetingMessage} onChange={handleChange}/>
                </div>
                <button className={styles.button} type="submit">Generate PDF</button>
            </form>
        );
}

export default function Home() {
    return (
        <div>
            <div className={styles.top}>
                <h1>Invoice Generator</h1>
                {/*<p>Generate invoices with ease</p>*/}
            </div>
            <div className={styles.container}>
                <Form/>
            </div>
        </div>

    );
}
