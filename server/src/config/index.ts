
let dbUrl:string;

switch (process.env.NODE_ENV) {
    case 'development':
        dbUrl = "mongodb://localhost/app";
        break;
    case 'production':
        dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        break;
    default:
        dbUrl = 'mongodb://localhost/app';
}

export const config = {
    mongoOptions: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    dbUrl
};