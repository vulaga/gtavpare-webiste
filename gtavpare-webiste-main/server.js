const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Check if environment variables are set
const emailUser = process.env.EMAIL_USER || 'your-email@gmail.com';
const emailPass = process.env.EMAIL_PASS || 'your-app-password';
const emailRecipient = process.env.EMAIL_RECIPIENT || 'your-email@gmail.com';

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

// Test email configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

app.post('/send-confirmation', upload.single('paymentPhoto'), async (req, res) => {
    try {
        console.log('Received form data:', req.body);
        
        const {
            account,
            launcher,
            moneyAmount,
            desiredRank,
            payment,
            price,
            paymentProof
        } = req.body;

        // Validate required fields
        if (!account || !launcher || !payment || !paymentProof) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields' 
            });
        }

        const mailOptions = {
            from: emailUser,
            to: emailRecipient,
            subject: 'Nova Porudžbina - GTA Novčani Servisi',
            html: `
                <h2>Nova Porudžbina</h2>
                <p><strong>Account:</strong> ${account}</p>
                <p><strong>Launcher:</strong> ${launcher}</p>
                ${moneyAmount ? `<p><strong>GTA$ Iznos:</strong> ${moneyAmount}M GTA$</p>` : ''}
                ${desiredRank ? `<p><strong>Rank Boost:</strong> Rank ${desiredRank}</p>` : ''}
                <p><strong>Način Plaćanja:</strong> ${payment}</p>
                <p><strong>Cena:</strong> ${price}</p>
                <h3>Dokaz o Uplati (Tekst):</h3>
                <p>${paymentProof}</p>
            `,
            attachments: []
        };

        // Add the payment proof photo if it exists
        if (req.file) {
            mailOptions.attachments.push({
                filename: req.file.originalname,
                content: req.file.buffer
            });
        }

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to send email',
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 