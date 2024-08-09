const mongoose=require("mongoose");
module.exports.connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 20000, // Tăng thời gian chờ kết nối lên 20 giây
          })
        console.log("Connect Success");
    } catch (error) {
        console.log("Connect Error ")
    }
}