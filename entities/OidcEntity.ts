import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class OidcEntity {
  @CreateDateColumn({ nullable: false, update: false })
  createdOn: Date;

  @UpdateDateColumn({ nullable: false })
  modifiedOn: string;

  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ nullable: false })
  type: number;

  @Column({ type: "jsonb", nullable: false })
  payload: Record<string, any>;

  @Column({ nullable: true })
  grantId: string;

  @Column({ nullable: true })
  userCode: string;

  @Column({ nullable: true, unique: true })
  uid: string;

  @Column({ nullable: true })
  consumedAt: Date;

  @Column({ nullable: true })
  expiresAt: Date;
}
