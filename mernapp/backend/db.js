const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://GoFood:Vishnu%402604@cluster0.ycf2z4n.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';
//const mongoURI = 'mongodb://GoFood:Vishnu%402604@ac-qvw6ym4-shard-00-00.ycf2z4n.mongodb.net:27017,ac-qvw6ym4-shard-00-01.ycf2z4n.mongodb.net:27017,ac-qvw6ym4-shard-00-02.ycf2z4n.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-mse4g0-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Connected to MongoDB");
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        console.log("Data from 'food_Items' collection:", data);
        global.food_items = data;
        const food_category = await mongoose.connection.db.collection("food_category");
        const catData = await food_category.find({}).toArray();
        console.log("Data from 'food_category' collection:", catData);
        global.food_category = catData;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};
module.exports = mongoDB;