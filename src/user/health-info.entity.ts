import { Common } from "src/common/common.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "health_infos" })
export class HealthInfo extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weight: number;

  @Column({ name: "skeletal_muscle_mass" })
  skeletalMuscleMass: number;

  @Column()
  bmi: number;

  @Column({ name: "body_fat" })
  bodyFat: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}
