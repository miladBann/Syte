import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catalog } from './catalog.entity';
import { Locale } from './locale.entity';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { User } from "../user/user.entity";

@Injectable()
export class CatalogService {
    private readonly logger = new Logger(CatalogService.name);

    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    async handleCron() {
        this.logger.debug('Running scheduled auto-indexing process');
        await this.autoIndexingProcess();
    }

    constructor(
        @InjectRepository(Catalog)
        private readonly catalogRepository: Repository<Catalog>,
        @InjectRepository(Locale)
        private readonly localeRepository: Repository<Locale>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<Catalog[]> {
        const catalogs = await this.catalogRepository.find({ relations: ['locales', 'user'] });
        return catalogs.map(catalog => ({
            ...catalog,
            multiLocale: catalog.locales.length > 1
        }));
    }

    async findByUserId(userId: number): Promise<Catalog[]> {
        const catalogs = await this.catalogRepository.find({
            where: { user: { user_id: userId } },
            relations: ['locales', 'user'],
        });
        
        return catalogs.map(catalog => ({
            ...catalog,
            multiLocale: catalog.locales.length > 1
        }));
    }

    async createCatalog(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
        const { user_id, name, vertical, is_primary, locales } = createCatalogDto;

        // Fetch the user to attach to the catalog
        const user = await this.userRepository.findOne({ where: { user_id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // If the new catalog is primary, set the old primary catalog to false
        if (is_primary) {
            await this.catalogRepository.update(
                { user: user, is_primary: true },
                { is_primary: false }
            );
        }

        // Create the new catalog
        const catalog = this.catalogRepository.create({
            user: user, // Attach the user entity as 'user'
            name,
            vertical,
            is_primary,
            indexed_at: new Date().toISOString(),
            locales: locales.map((locale_code) =>
                this.localeRepository.create({ locale_code })
            ),
        });

        // Save the new catalog
        return await this.catalogRepository.save(catalog);
    }

    async updateCatalog(id: number, updateCatalogDto: UpdateCatalogDto): Promise<Catalog> {
        const catalog = await this.catalogRepository.findOne({ where: { catalog_id: id }, relations: ['user'] });
      
        if (!catalog) {
          throw new NotFoundException('Catalog not found');
        }
      
        // Update the catalog based on the DTO
        const { is_primary, locales } = updateCatalogDto;
      
        // Handle is_primary flag
        if (is_primary) {
          // If the catalog is set to be primary, reset the previous primary catalog
          await this.catalogRepository.update(
            { is_primary: true }, // Update any catalog with is_primary set to true
            { is_primary: false }
          );
          catalog.is_primary = true;
        }
      
        // Handle locales
        if (locales) {
          // Clear existing locales and add the new ones
          await this.localeRepository.delete({ catalog: { catalog_id: catalog.catalog_id } });
          catalog.locales = locales.map(locale_code => this.localeRepository.create({ locale_code }));
        }
      
        // Update the timestamp and save the catalog
        catalog.indexed_at = new Date();
        return await this.catalogRepository.save(catalog);
    }

    async deleteCatalog(id: number): Promise<void> {
        const result = await this.catalogRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Catalog not found');
    }

    async deleteBulk(ids: number[]): Promise<void> {
        await this.catalogRepository.delete(ids);
    }

    async findWithFilters(search: string, multiLocale: boolean): Promise<Catalog[]> {
        const query = this.catalogRepository.createQueryBuilder('catalog')
            .leftJoinAndSelect('catalog.locales', 'locale')
            .leftJoinAndSelect('catalog.user', 'user');

        if (search) {
            query.andWhere('catalog.name LIKE :search', { search: `%${search}%` });
        }

        if (multiLocale) {
            query.andWhere('catalog.locales IS NOT NULL');
        }

        return await query.getMany();
    }

    async autoIndexingProcess(): Promise<void> {
        const catalogs = await this.catalogRepository.find();
        for (const catalog of catalogs) {
            catalog.indexed_at = new Date();
            await this.catalogRepository.save(catalog);
        }
    }
}
