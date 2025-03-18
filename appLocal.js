
const express= require("express");
const path = require("path")
const bodyParser= require("body-parser")
const sequelize= require("./util/database")
const userRoutes= require("./routes/userRouter")
const passwordRoutes= require("./routes/passwordRoutes")
const userController= require("./controllers/userController")
const expenseRoutes = require('./routes/expenseRoutes');
const User = require("./models/userModel")
const Order = require("./models/orderModel")
const ForgotPasswordRequest= require("./models/ForgotPasswordRequest")
const Expense= require("./models/expense")
const paymentRoutes = require('./routes/paymentRoutes');

const premiumFeatureRoutes = require('./routes/premiumFeature')
const fetch = require("node-fetch"); // For making API calls


const app=express();

var cors= require("cors");


app.use(cors({
    origin: "*",  // Allow all origins 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow all methods 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"Public")));

User.hasMany(Expense); // One to Many Relationship 
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);



app.use("/user",userRoutes); 
app.use("/user",expenseRoutes); 
app.use("/api",expenseRoutes)
app.use('/api', paymentRoutes); 
app.use('/premium', premiumFeatureRoutes)
app.use("/password",passwordRoutes) 


app.get("/expensetrack",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","expense.html")) 
 })



sequelize
.sync({force:false})
.then(result=>{
    console.log('Database synced!'); 
    app.listen(process.env.PORT || 3000,()=>{console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`)});
})
.catch(err=>{
    console.log(err)  
});