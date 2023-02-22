import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectEntity } from "./object.entity";
import { Workbook } from "./workbook.entity";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  workbookId: Workbook["id"];

  @ManyToOne(() => Workbook, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "workbookId" })
  workbook: Workbook;

  @OneToOne(() => ObjectEntity, (object: ObjectEntity) => object.item, {
    cascade: ["insert", "soft-remove"],
  })
  objectEntity: ObjectEntity;
}