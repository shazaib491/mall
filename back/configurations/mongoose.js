const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then((resolve) => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("Can not connect to database : " + err);
})
