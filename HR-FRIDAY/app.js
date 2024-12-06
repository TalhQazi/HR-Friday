const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./Middleware/errorHandler");

// Route files
const employeeRoutes = require("./Routes/employeeRoutes");
const leaveRoutes = require("./Routes/leaveRequestRoutes");
const attendanceRoutes = require("./Routes/attendanceRoutes");
const payrollRoutes = require("./Routes/payrollRoutes");
const trainingRoutes = require("./Routes/trainingRoutes");
const shiftRoutes = require("./Routes/shiftRoutes");
const companyRouter = require('./Routes/companyRoutes.js');
const projectRouter = require('./Routes/projectRoutes.js');
const performanceRouter = require('./Routes/performanceRoutes.js');


// Load env vars
dotenv.config();

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/leaves", leaveRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/payrolls", payrollRoutes);
app.use("/api/v1/trainings", trainingRoutes);
app.use("/api/v1/shift", shiftRoutes);
app.use("/api/v1/companies",companyRouter)
app.use('/api/v1/performances', performanceRouter);
app.use('/api/v1/projects', projectRouter);
// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
