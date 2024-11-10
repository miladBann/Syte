import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
export declare class CatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    findAll(search?: string, multiLocale?: boolean): Promise<import("./catalog.entity").Catalog[]>;
    findByUserId(userId: number): Promise<import("./catalog.entity").Catalog[]>;
    create(createCatalogDto: CreateCatalogDto): Promise<import("./catalog.entity").Catalog>;
    update(id: number, updateCatalogDto: UpdateCatalogDto): Promise<import("./catalog.entity").Catalog>;
    delete(id: number): Promise<{
        message: string;
    }>;
    deleteBulk(ids: number[]): Promise<{
        message: string;
    }>;
}
