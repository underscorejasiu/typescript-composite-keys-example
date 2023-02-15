import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectEntity } from "./object.entity";
import { Workbook } from "./workbook.entity";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  workbookId: Workbook["id"];

  @Column({ nullable: true })
  object: ObjectEntity["id"];

  @ManyToOne(() => Workbook, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "workbookId" })
  workbook: Workbook;
  
  @OneToOne("ObjectEntity", {
    nullable: true,
    cascade: ["insert", "soft-remove"],
  })
  @JoinColumn([
    { name: "object", referencedColumnName: "id" },
    { name: "workbookId", referencedColumnName: "workbookId" },
  ])
  objectEntity: ObjectEntity;
}