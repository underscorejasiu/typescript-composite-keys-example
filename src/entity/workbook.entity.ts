import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Workbook {
  @PrimaryGeneratedColumn("uuid", { name: 'id' })
  id: string;


  @Column()
  data: string;
}
