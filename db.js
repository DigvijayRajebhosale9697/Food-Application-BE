import mongoose from 'mongoose';

const URI = 'mongodb+srv://digvijayrajebhosale4349:XJTDCrvAiL7QYJqh@gofoodcluster1.sks6ioq.mongodb.net/GoFoodDB?retryWrites=true&w=majority';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true });
        console.log("DATABASE CONNECTED");

        const connection = mongoose.connection;

        const fetchedData = await connection.db.collection('Food_items');
        const data = await fetchedData.find({}).toArray();

        const FoodCategory = await connection.db.collection('FoodCategory');
        const CategoryData = await FoodCategory.find({}).toArray();

        globalThis.Fooditems = data;
        globalThis.FoodCategory = CategoryData;

    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
}

export default connectToDatabase;
