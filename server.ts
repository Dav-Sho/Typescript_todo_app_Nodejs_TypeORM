import express, {Express, Request, Response} from "express"
import 'colors'
import dotenv from 'dotenv'
import AppDataSource from "./database/datasource"
import cors from 'cors'
import task from "./src/routes/task"

dotenv.config({path: 'config/config.env'});

const app:Express = express();

app.use(express.json())
app.use("/api/v1/tasks", task)
app.use(cors())

app.get("/", (req: Request, res: Response) => {
    console.log("Welcome");
    
})

const port = process.env.PORT || 5000;

AppDataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log(`App running in ${process.env.NODE_ENV} mode on port:${port}`.yellow);
    })
    console.log("Database Connected...".cyan.underline);
    
}).catch((err) => {
    console.error(err.message.red);
    
});


