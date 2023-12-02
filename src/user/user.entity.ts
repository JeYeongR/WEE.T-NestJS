import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Common } from "../common/common.entity";
import { Gender } from "./gender.entity";

@Entity({ name: "users" })
export class User extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 8,
    nullable: true,
  })
  nickname: string;

  @Column({ length: 30 })
  email: string;

  @Column({ nullable: true })
  height: number;

  @Column({
    name: "goal_weight",
    nullable: true,
  })
  goalWeight: number;

  @Column({
    name: "goal_skeletal_muscle_mass",
    nullable: true,
  })
  goalSkeletalMuscleMass: number;

  @Column({
    name: "birth_year",
    length: 10,
    nullable: true,
  })
  birthYear: string;

  @Column({
    name: "social_id",
    length: 50,
  })
  socialId: string;

  @Column()
  provider: string;

  @ManyToOne(() => Gender)
  @JoinColumn({ name: "gender_id" })
  gender: Gender;
}
