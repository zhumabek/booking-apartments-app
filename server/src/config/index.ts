
let dbUrl:string;

switch (process.env.NODE_ENV) {
    case 'development':
        dbUrl = "mongodb://localhost/booking-apartments-app";
        break;
    case 'production':
        dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        break;
    default:
        dbUrl = 'mongodb://localhost/booking-apartments-app';
}

export const config = {
    mongoOptions: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    dbUrl,
    cookieOptions: {
        httpOnly: true,
        sameSite: true,
        signed: true,
        secure: process.env.NODE_ENV === "production"
    },

    cloudinaryOptions: {
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        cloud_name: process.env.CLOUDINARY_NAME,
        folder: "AP_SELLING_ASSETS/"
    }
};