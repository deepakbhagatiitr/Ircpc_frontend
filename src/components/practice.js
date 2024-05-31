const connectToMongo = require('./db');
const express = require('express');
const { sendMail } = require('./utils/sendmail');
var cors = require('cors');
require("dotenv").config();
const multer = require("multer");
const path = require('path');
const Patents = require('./schema/Patents'); // Ensure you import the Patents model

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;
// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

// Define routes
app.use('/api/auth', require('./crud/auth'));
app.use('/api/query', require('./crud/query'));
app.use('/api/profiles', require('./crud/dashboard'));



app.post("/api/profiles/addpatents", upload.single('pdf'), async (req, res) => {
  try {
    const {
      email,
      title,
      fieldOfInvention,
      detailedDescription,
      inventor,
      committeeMembers,
      status
    } = req.body;

    const pdfPath = `/uploads/${req.files[0]}`;
    console.log(pdfPath);
    const newPatent = new Patents({
      email,
      title,
      fieldOfInvention,
      detailedDescription,
      inventor,
      committeeMembers,
      pdf: pdfPath,
      status
    });

    const savedPatent = await newPatent.save();

    // Send email notifications
    const receiverEmail = email;
    const senderEmail = "iprcelliitr84@gmail.com";
    const emailSubject = "Patent is added";
    const emailMessage = "Congratulations! You have successfully added your patent claim";

    try {
      await sendMail(receiverEmail, senderEmail, emailSubject, emailMessage);

      const websiteURL = `http://localhost:8080/ViewPatent?id=${savedPatent._id}`;
      const emailMessage1 = `Someone has added a patent claim, please visit the website to verify: ${websiteURL}`;
      await sendMail(receiverEmail, senderEmail, emailSubject, emailMessage1);

      res.status(201).json({ message: "Patent added successfully", patent: savedPatent });
    } catch (emailError) {
      console.error("Error sending email:", emailError.message);
      res.status(500).json({ message: "Error sending email", error: emailError.message });
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error adding patent", error });
  }
});


app.get('/pdfs', async (req, res) => {
  try {
    const pdfs = await Pdf.find({});
    res.json(pdfs);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
