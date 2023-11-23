import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "genders" })
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 5 })
  name: string;
}
