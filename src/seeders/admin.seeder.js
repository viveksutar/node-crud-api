import Admin from "../models/admin.model.js";

const admiSeeder = async()=>{
    try {
        await Admin.deleteMany({});

        const adminSeed = await Admin.create({
            fullName:'Administrator',
            username:'admin',
            password:'admin'
        })
        adminSeed.token = adminSeed.generateAccessToken();
        await adminSeed.save();
        console.log("Admin seeder imported successfully.");
    } catch (error) {
        console.error("Error importing admin seeder:", error);
    }
}

export {
    admiSeeder
}