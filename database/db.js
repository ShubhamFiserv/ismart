//We only require mongo URI for db connection - we are using same DB for local & prod
//Todo :  to use diffrent DB for prod & local
module.exports = {
    mongoURI: 'mongodb+srv://admin:password@123@cluster0.ikwnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  };