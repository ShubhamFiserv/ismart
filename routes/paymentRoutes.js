const { request } = require('express');
const mongoose = require('mongoose');
const Payment = mongoose.model('payments');
const ACCOUNT_BALNACE = 10000;

const daysInMonth =  function (month, year) {
   return new Date(year, month, 0).getDate();
}

module.exports = (app) => {
   app.get('/api/payments/categories', async (req, res) => {
      const categories = await Payment.schema.path('category').enumValues;
      res.send(categories);
   });

   app.post('/api/payments', async (req, res) => {
      console.log(req.body);
      const { amount, paymentDate,paymentType,category,description }  = req.body;
      const payment = new Payment({
         amount,
         paymentDate,
         paymentType,
         category,
         description
      });
      try {
         if(paymentType === 'Make' && amount > ACCOUNT_BALNACE) {
            throw new Error('Account Balance is low.')
         }
         await payment.save();  
         res.status(201).send();
      } catch(err) {
         res.status(422).send(err);
      }
   }); 

   app.get('/api/payments/:frequency/:month?/:category?', async (req, res) => {
      let payments= [];
      console.log(req.params.frequency);
      console.log(req.params.month);
      console.log(req.params.category);
      if(req.params.frequency.toLowerCase() === 'current'){
         payments = await Payment.find().limit(10).sort({paymentDate: -1})
         if(req.params.category){
            payments = await Payment.find({ category: req.params.category}).limit(10).sort({paymentDate: -1});
            console.log(payments)
         }
      }else if (req.params.frequency.toLowerCase()  === 'monthly'){
         let now = new Date();
         let daysInSelectedMonth = daysInMonth(req.params.month, now.getFullYear());
         console.log(daysInSelectedMonth)
         let start = new Date(2021, req.params.month, 1);
         let end = new Date(2021,  req.params.month, daysInSelectedMonth);
         console.log(start);
         console.log(end);
         payments = await Payment.find({paymentDate: {$gte: start, $lt: end}}).sort({paymentDate: 1});
         if(req.params.category){
            payments = await Payment.find({paymentDate: {$gte: start, $lt: end}}).find({ category: req.params.category}).sort({paymentDate: -1});
         }
      }
      else if (req.params.frequency.toLowerCase() ==='half_year') {
         let now = new Date();
         now.setMonth(now.getMonth() - 5);
         console.log(now);
         payments = await Payment.find({paymentDate: {$gte: now}}).sort({paymentDate: 1});
      }
      res.send(payments);
   });

   app.get('/api/payments', async (req, res) => {
      const payments = await Payment.find();
      res.send(payments);
   }); 
};