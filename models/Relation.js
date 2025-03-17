const User = require("../models/userModel")
const Expense = require("../models/expense")
const Order = require("../models/orderModel")
const ForgotPasswordRequest = require("../models/ForgotPasswordRequest")
const Downloaded = require("../models/Downloaded")


User.hasMany(ForgotPasswordRequest, { foreignKey: "userId" })
ForgotPasswordRequest.belongsTo(User, { foreignKey: "userId"})


User.hasMany(Downloaded, { foreignKey: "userId"})
Downloaded.belongsTo(User, { foreignKey: "userId"})

module.exports = { User, Expense, Order, ForgotPasswordRequest,Downloaded}