import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Catalog } from './catalog.entity';

@Entity('locales')
export class Locale {
  @PrimaryGeneratedColumn()
  locale_id: number;

  @ManyToOne(() => Catalog, (catalog) => catalog.locales, { onDelete: 'CASCADE' })
  catalog: Catalog;

  @Column({ length: 5 })
  locale_code: string;
}
