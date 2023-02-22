import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";
import { Workbook } from "./workbook.entity";

@Entity()
export class ObjectEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @PrimaryColumn()
  workbookId: Workbook["id"];

  @Column()
  itemId: Workbook["id"];

  @Column()
  objectData: string;

  @OneToOne(() => Item, (item: Item) => item.objectEntity, {
    cascade: ["soft-remove"],
  })
  @JoinColumn([
    { name: "itemId", referencedColumnName: "id" },
    { name: "workbookId", referencedColumnName: "workbookId" },
  ])
  item: Item;
}