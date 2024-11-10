import { Repository } from 'typeorm';
import { Catalog } from './catalog.entity';
import { Locale } from './locale.entity';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { User } from "../user/user.entity";
export declare class CatalogService {
    private readonly catalogRepository;
    private readonly localeRepository;
    private userRepository;
    private readonly logger;
    handleCron(): Promise<void>;
    constructor(catalogRepository: Repository<Catalog>, localeRepository: Repository<Locale>, userRepository: Repository<User>);
    findAll(): Promise<Catalog[]>;
    findByUserId(userId: number): Promise<Catalog[]>;
    createCatalog(createCatalogDto: CreateCatalogDto): Promise<Catalog>;
    updateCatalog(id: number, updateCatalogDto: UpdateCatalogDto): Promise<Catalog>;
    deleteCatalog(id: number): Promise<void>;
    deleteBulk(ids: number[]): Promise<void>;
    findWithFilters(search: string, multiLocale: boolean): Promise<Catalog[]>;
    autoIndexingProcess(): Promise<void>;
}
