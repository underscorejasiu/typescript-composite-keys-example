import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Workbook } from "./workbook.entity";

@Entity()
export class ObjectEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @PrimaryColumn()
  workbookId: Workbook["id"];
  
  @ManyToOne(() => Workbook, { nullable: true, cascade: ["soft-remove"] })
  @JoinColumn({ name: "workbookId" })
  workbook: Workbook;
}