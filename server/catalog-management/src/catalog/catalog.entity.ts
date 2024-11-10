import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Locale } from './locale.entity';

@Entity('catalogs')
export class Catalog {
  @PrimaryGeneratedColumn()
  catalog_id: number;

  @ManyToOne(() => User, (user) => user.catalogs, { onDelete: 'CASCADE' })
  user: User; 

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'enum', enum: ['fashion', 'home', 'general'] })
  vertical: string;

  @Column({ default: false })
  is_primary: boolean;

  @Column({ type: 'timestamp', nullable: true })
  indexed_at: Date;

  @OneToMany(() => Locale, (locale) => locale.catalog, { cascade: true })
  locales: Locale[];
}
