import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `\n MONGODB Conected host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB conection failed ", error);
    process.exit(1);
  }
};

export default connectDB
