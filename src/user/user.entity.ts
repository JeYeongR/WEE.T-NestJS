import { Common } from "src/common/common.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./gender.entity";

@Entity({ name: "users" })
export class User extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 8 })
  nickname: string;

  @Column({ length: 30 })
  email: string;

  @Column()
  height: number;

  @Column({ name: "goal_weight" })
  goalWeight: number;

  @Column({ name: "goal_body_fat" })
  goalBodyFat: number;

  @Column({ name: "goal_skeletal_muscle_mass" })
  goalSkeletalMuscleMass: number;

  @Column({ name: "birth_year", length: 10 })
  birthYear: string;

  @Column({ name: "social_id", length: 50 })
  socialId: string;

  @Column()
  provide: string;

  @ManyToOne(() => Gender)
  @JoinColumn({ name: "gender_id" })
  gender: Gender;
}
