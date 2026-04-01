import { AppointmentsService } from './appointments.service';
export declare class AppointmentsController {
    private readonly apptsService;
    constructor(apptsService: AppointmentsService);
    create(data: any, req: any): any;
    findAll(): any;
    findByDentist(req: any): any;
    updateStatus(id: string, status: any): any;
}
