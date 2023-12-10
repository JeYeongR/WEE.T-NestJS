import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "nutritions" })
export class Nutrition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;
}
