import "reflect-metadata"
import { DataSource } from "typeorm"
import { Item } from "./entity/item.entity"
import { ObjectEntity } from "./entity/object.entity"
import { User } from "./entity/User"
import { Workbook } from "./entity/workbook.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: 'db',
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "myapp",
    synchronize: true,
    logging: false,
    entities: [User, Workbook, ObjectEntity, Item],
    migrations: [],
    subscribers: [],
})
