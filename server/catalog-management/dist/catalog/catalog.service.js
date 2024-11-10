"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CatalogService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const catalog_entity_1 = require("./catalog.entity");
const locale_entity_1 = require("./locale.entity");
const user_entity_1 = require("../user/user.entity");
let CatalogService = CatalogService_1 = class CatalogService {
    async handleCron() {
        this.logger.debug('Running scheduled auto-indexing process');
        await this.autoIndexingProcess();
    }
    constructor(catalogRepository, localeRepository, userRepository) {
        this.catalogRepository = catalogRepository;
        this.localeRepository = localeRepository;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(CatalogService_1.name);
    }
    async findAll() {
        const catalogs = await this.catalogRepository.find({ relations: ['locales', 'user'] });
        return catalogs.map(catalog => ({
            ...catalog,
            multiLocale: catalog.locales.length > 1
        }));
    }
    async findByUserId(userId) {
        const catalogs = await this.catalogRepository.find({
            where: { user: { user_id: userId } },
            relations: ['locales', 'user'],
        });
        return catalogs.map(catalog => ({
            ...catalog,
            multiLocale: catalog.locales.length > 1
        }));
    }
    async createCatalog(createCatalogDto) {
        const { user_id, name, vertical, is_primary, locales } = createCatalogDto;
        const user = await this.userRepository.findOne({ where: { user_id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (is_primary) {
            await this.catalogRepository.update({ user: user, is_primary: true }, { is_primary: false });
        }
        const catalog = this.catalogRepository.create({
            user: user,
            name,
            vertical,
            is_primary,
            indexed_at: new Date().toISOString(),
            locales: locales.map((locale_code) => this.localeRepository.create({ locale_code })),
        });
        return await this.catalogRepository.save(catalog);
    }
    async updateCatalog(id, updateCatalogDto) {
        const catalog = await this.catalogRepository.findOne({ where: { catalog_id: id }, relations: ['user'] });
        if (!catalog) {
            throw new common_1.NotFoundException('Catalog not found');
        }
        const { is_primary, locales } = updateCatalogDto;
        if (is_primary) {
            await this.catalogRepository.update({ is_primary: true }, { is_primary: false });
            catalog.is_primary = true;
        }
        if (locales) {
            await this.localeRepository.delete({ catalog: { catalog_id: catalog.catalog_id } });
            catalog.locales = locales.map(locale_code => this.localeRepository.create({ locale_code }));
        }
        catalog.indexed_at = new Date();
        return await this.catalogRepository.save(catalog);
    }
    async deleteCatalog(id) {
        const result = await this.catalogRepository.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('Catalog not found');
    }
    async deleteBulk(ids) {
        await this.catalogRepository.delete(ids);
    }
    async findWithFilters(search, multiLocale) {
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
    async autoIndexingProcess() {
        const catalogs = await this.catalogRepository.find();
        for (const catalog of catalogs) {
            catalog.indexed_at = new Date();
            await this.catalogRepository.save(catalog);
        }
    }
};
exports.CatalogService = CatalogService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_10AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatalogService.prototype, "handleCron", null);
exports.CatalogService = CatalogService = CatalogService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(catalog_entity_1.Catalog)),
    __param(1, (0, typeorm_1.InjectRepository)(locale_entity_1.Locale)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CatalogService);
//# sourceMappingURL=catalog.service.js.map