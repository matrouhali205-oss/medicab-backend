import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: Record<string, any>): Promise<any>;
    register(body: Record<string, any>): Promise<any>;
    getProfile(req: any): any;
}
