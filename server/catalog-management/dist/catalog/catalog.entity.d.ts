import { User } from '../user/user.entity';
import { Locale } from './locale.entity';
export declare class Catalog {
    catalog_id: number;
    user: User;
    name: string;
    vertical: string;
    is_primary: boolean;
    indexed_at: Date;
    locales: Locale[];
}
