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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogController = void 0;
const common_1 = require("@nestjs/common");
const catalog_service_1 = require("./catalog.service");
const create_catalog_dto_1 = require("./dto/create-catalog.dto");
const update_catalog_dto_1 = require("./dto/update-catalog.dto");
let CatalogController = class CatalogController {
    constructor(catalogService) {
        this.catalogService = catalogService;
    }
    async findAll(search, multiLocale) {
        if (search || multiLocale !== undefined) {
            return await this.catalogService.findWithFilters(search, multiLocale);
        }
        return await this.catalogService.findAll();
    }
    async findByUserId(userId) {
        const catalogs = await this.catalogService.findByUserId(userId);
        if (!catalogs || catalogs.length === 0) {
            throw new common_1.NotFoundException(`No catalogs found for user with ID ${userId}`);
        }
        return catalogs;
    }
    async create(createCatalogDto) {
        return await this.catalogService.createCatalog(createCatalogDto);
    }
    async update(id, updateCatalogDto) {
        const updatedCatalog = await this.catalogService.updateCatalog(id, updateCatalogDto);
        if (!updatedCatalog) {
            throw new common_1.NotFoundException(`Catalog with ID ${id} not found`);
        }
        return updatedCatalog;
    }
    async delete(id) {
        await this.catalogService.deleteCatalog(id);
        return { message: `Catalog with ID ${id} deleted successfully` };
    }
    async deleteBulk(ids) {
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            throw new common_1.BadRequestException('Please provide an array of IDs to delete');
        }
        await this.catalogService.deleteBulk(ids);
        return { message: `${ids.length} catalogs deleted successfully` };
    }
};
exports.CatalogController = CatalogController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('multiLocale')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_catalog_dto_1.CreateCatalogDto]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_catalog_dto_1.UpdateCatalogDto]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "deleteBulk", null);
exports.CatalogController = CatalogController = __decorate([
    (0, common_1.Controller)('catalogs'),
    __metadata("design:paramtypes", [catalog_service_1.CatalogService])
], CatalogController);
//# sourceMappingURL=catalog.controller.js.map