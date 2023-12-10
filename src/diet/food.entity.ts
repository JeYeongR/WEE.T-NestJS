import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Nutrition } from "./nutrition.entity";

@Entity({ name: "foods" })
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;

  @Column()
  gram: number;

  @Column({
    name: "image_url",
    length: 300,
  })
  image_url: string;

  @Column({ name: "nutrient_content" })
  nutrientContent: number;

  @Column({ length: 40 })
  information: string;

  @ManyToOne(() => Nutrition)
  @JoinColumn({ name: "nutrition_id" })
  nutrition: Nutrition;
}
