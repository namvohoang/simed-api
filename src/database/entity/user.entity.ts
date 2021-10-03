import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	phoneNumber: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({ nullable: true })
	gender: string;

	@Column({ type: 'timestamptz', nullable: true })
	dateOfBirth: Date;

	@Column()
	email: string;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}

	async comparePassword(attempt: string): Promise<boolean> {
		return await bcrypt.compare(attempt, this.password);
	}

	@Column()
	password: string;

	@Column({ nullable: true })
	refreshToken: string;

	@Column({ nullable: true })
	resetPasswordToken: number;

	@Column({ type: 'boolean', default: false })
	is2FA: boolean;

	@Column({ type: 'boolean', default: true })
	isActive: boolean;

	@Column({ type: 'boolean', default: false })
	isArchived: boolean;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	createDateTime: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	lastChangedDateTime: Date;
}
