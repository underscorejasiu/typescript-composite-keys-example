import { AppDataSource } from "./data-source"
import { Item } from "./entity/item.entity"
import { ObjectEntity } from "./entity/object.entity"

import { Workbook } from "./entity/workbook.entity"

AppDataSource.initialize().then(async () => {
    // workbook insert
    const workbook = new Workbook()
    workbook.data = 'Test'

    await AppDataSource.manager.save(workbook);
    console.log("Saved a new workbook with id: " + workbook.id);
    const workbooks = await AppDataSource.manager.find(Workbook)
    console.log("Loaded workbooks: ", workbooks);

    // // object insert
    // const object = new ObjectEntity()
    // object.workbookId = workbook.id;

    // await AppDataSource.manager.save(object)
    // console.log("Saved a new object with id: " + object.id);
    // const objects = await AppDataSource.manager.find(ObjectEntity)
    // console.log("Loaded objects: ", objects)

    // item insert
    const item = new Item()
    item.workbook = workbook;
    item.objectEntity = new ObjectEntity()
    item.objectEntity.objectData = 'test';

    await AppDataSource.manager.save(item)
    console.log("Saved a new item with id: " + item.id);
    const items = await AppDataSource.manager.find(Item)
    console.log("Loaded items: ", items)



    // get with relations via entity find
    try {
        console.log('Load via entity.')
        const itemWithRelations = await AppDataSource.manager.getRepository(Item).findOne({ where: { id: item.id }, relations: { objectEntity: true, workbook: true } });
        console.log('Loaded via entity find with relations: ', itemWithRelations)
    } catch (e) {
        console.log('Error during load via entity find with relations: ', e)
    }


    // get via query builder 
    // try {
    //     console.log('Load via query builder.')
    //     const itemWithRelations = await AppDataSource.manager.getRepository(Item)
    //         .createQueryBuilder('item')
    //         .leftJoinAndSelect('item.workbook', 'workbook')
    //         .leftJoinAndSelect('item.objectEntity', 'objectEntity')
    //         .where('item.object = :object', { object: object.id })
    //         .andWhere('item.workbookId = :workbookId', { workbookId: workbook.id })
    //         .getOne();
    //     console.log('Loaded via query builder with relations: ', itemWithRelations)
    // } catch (e) {
    //     console.log('Error during load via query builder with relations: ', e)
    // }


}).catch(error => console.log(error))
