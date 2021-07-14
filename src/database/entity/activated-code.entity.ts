import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'activated-code' })
export class ActivatedCodeEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	activatedCode: number;

	@Column({ nullable: true })
	email: string;
}
