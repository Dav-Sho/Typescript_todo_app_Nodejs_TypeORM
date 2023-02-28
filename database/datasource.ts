import {DataSource} from 'typeorm'
import { Task } from '../src/models/task';
import dotenv from 'dotenv'

dotenv.config({path: 'config/config.env'});


const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_Database,
    entities: [Task],
    synchronize: true
})

export default AppDataSource