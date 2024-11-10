import { Catalog } from '../catalog/catalog.entity';
export declare class User {
    user_id: number;
    username: string;
    email: string;
    created_at: Date;
    catalogs: Catalog[];
}
