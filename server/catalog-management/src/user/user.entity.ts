import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Catalog } from '../catalog/catalog.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Catalog, (catalog) => catalog.user)
  catalogs: Catalog[];
}
