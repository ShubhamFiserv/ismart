/**
 * Payment Model mongo db schema
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
   amount:Number,
   paymentDate: Date,
   paymentType: {
      type: String,
      enum : ['Make','Recieve']
  },
   category:{
      type: String,
      enum : ['Medical','Travels','Loans','Utility Bills','Education','Shopping','Misc'],
      default:'Misc'
   },
   description:String
});

mongoose.model('payments', paymentSchema);