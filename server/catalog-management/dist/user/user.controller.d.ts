import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./user.entity").User[]>;
    findOne(id: number): Promise<import("./user.entity").User>;
    create(username: string, email: string): Promise<import("./user.entity").User>;
    delete(id: number): Promise<void>;
}
