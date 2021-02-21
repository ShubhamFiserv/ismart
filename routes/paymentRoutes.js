const { request } = require('express');
const mongoose = require('mongoose');
const Payment = mongoose.model('payments');
const ACCOUNT_BALNACE = 10000;

/**
 *  Method to return number of days in selected month
 * @param {*} month  - selected month
 * @param {*} year - selected year
 */
const daysInMonth =  function (month, year) {
   return new Date(year, month+1, 0).getDate();
}

module.exports = (app) => {
   //API routes handle for getting the list of Categories
   app.get('/api/payments/categories', async (req, res) => {
      const categories = await Payment.schema.path('category').enumValues;
      res.send(categories);
   });
   
   //API routes posting a payment
   app.post('/api/payments', async (req, res) => {
      const { amount, paymentDate,paymentType,category,description }  = req.body;
      const payment = new Payment({
         amount,
         paymentDate,
         paymentType,
         category,
         description
      });
      try {
         //As we dont have account information availble as part of this app
         // I am assuming if User is going to make a payment of greater than 10000 
         // User will get error on UI
         //Todo :  need to create more specific error handler if introduction of new & 
         // diffrent errors
         if(paymentType === 'Make' && amount > ACCOUNT_BALNACE) {
            throw new Error('Account Balance is low.')
         }
         // saving the data into Payment Mongo DB collection
         await payment.save();  
         res.status(201).send();
      } catch(err) {
         res.status(422).send(err);
      }
   }); 
   
   //API routes for getting list of payments as per filter model
   app.get('/api/payments/:frequency/:month?/:category?', async (req, res) => {
      let payments = [];
      //For handling if frequency selected to 'current'
      // for this case , we dont need to consider month filter option as it will NA in this case 
      if(req.params.frequency.toLowerCase() === 'current'){
         payments = await Payment.find().limit(10).sort({paymentDate: -1});
         //in case of category selection filter applied.
         if(req.params.category && req.params.category !=="All"){
            payments = await Payment.find({ category: req.params.category}).limit(10).sort({paymentDate: -1});
         }
      }else if (req.params.frequency.toLowerCase()  === 'monthly'){
         //For handling if frequency selected to 'monthly'
         let now = new Date();
         let monthDiff = now.getMonth() - req.params.month;
         if(monthDiff >= 0){
            now.setMonth(now.getMonth() - monthDiff);
         } else {
            now.setMonth(now.getMonth() + monthDiff);
         }
         let daysInSelectedMonth = daysInMonth(+req.params.month, now.getFullYear());
         let start = new Date(now.getFullYear(), req.params.month, 1);
         end = new Date(now.getFullYear(),  req.params.month, daysInSelectedMonth);
         payments = await Payment.find({paymentDate: {$gte: start, $lt: end}}).sort({paymentDate: -1});
         if(req.params.category && req.params.category !=="All"){
            payments = await Payment.find({paymentDate: {$gte: start, $lt: end}}).find({ category: req.params.category}).sort({paymentDate: -1});
         }
      }
      else if (req.params.frequency.toLowerCase() ==='half_year') {
         //For handling if frequency selected to 'half_year' for spend analysis
         let now = new Date();
         now.setMonth(now.getMonth() - 5);
         payments = await Payment.find({paymentDate: {$gte: now}}).sort({paymentDate: 1});
      }
      res.send(payments);
   });
   
   //API routes getting list of payment
   app.get('/api/payments', async (req, res) => {
      const payments = await Payment.find();
      res.send(payments);
   }); 
};