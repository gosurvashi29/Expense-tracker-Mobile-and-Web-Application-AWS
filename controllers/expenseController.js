const Expense = require('../models/expense'); 
const User =require('../models/userModel');
const sequelize= require("../util/database")
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');


const addExpense = async (req, res) => {
    const t = await sequelize.transaction(); 

    const description = req.body.description;
    const amount = req.body.amount;
    const category = req.body.category;

    try {
       
        const newExpense = await Expense.create({
            description: description,
            amount: amount,
            category: category,
            UserId: req.user.id
        }, { transaction: t }); 

        
        const user = await User.findByPk(req.user.id, { transaction: t });

        if (!user) {
            await t.rollback();  
            return res.status(404).json({ message: 'User not found' });
        }

        
        const updatedTotalAmount = (user.totalAmount || 0) + amount;

        
        user.totalAmount = updatedTotalAmount;
        await user.save({ transaction: t }); 

        
        await t.commit();

        
        res.status(201).json({
            message: 'Expense added successfully',
            newExpenseDetail: newExpense
        });

    } catch (error) {
        await t.rollback();  
        res.status(500).json({ message: 'Error adding expense', error: error.message });
    }
};



const deleteExpense = async (req, res) => {
    const t = await sequelize.transaction(); 
    const { id } = req.params;

    try {
        
        const deletedExpense = await Expense.destroy({
            where: { id, userId: req.user.id}
        });

        
        if (!deletedExpense) {
            await t.rollback();
            return res.status(404).json({ message: 'Expense not found' });
        }

        
        await t.commit();
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(500).json({ message: 'Error deleting expense', error: error.message });
    }
};
//Get all Expenses for a User with pagination
const getExpenses = async (req, res) => {
  try {
    const user = req.user
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

  
    const { rows: expenses, count } = await Expense.findAndCountAll({
      where: { userId: user.id },
      limit,
      offset,
    });

    const isPremium = await user.isPremium; 

    res.json({
      expenses,
      isPremium,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const downloadExpenses = async (req, res) => {
    try {
      const userId = req.user.id;
      const expenses = await req.user.getExpenses({
        attributes: ['amount', 'category', 'description', 'createdAt'],
      });
  
      // Convert JSON to CSV
      const fields = ['amount', 'category', 'description', 'createdAt'];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(expenses);
  
      
      const fileName = `myExpenses-${userId}-${Date.now()}.csv`;
  
      
      const filePath = path.join(__dirname, '..', 'Public', 'downloads', fileName); 
  
      
      fs.writeFileSync(filePath, csv);
  
      
      const fileUrl = filePath;
  
      
      const fileInfo = { fileName, url: fileUrl };
      const response = await req.user.createDownloaded(fileInfo);
      
     
      res.download(fileUrl)
      
    } catch (err) {
      console.error('Error in downloadExpenses controller:', err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  
  

module.exports = { addExpense, getExpenses, deleteExpense , downloadExpenses};
