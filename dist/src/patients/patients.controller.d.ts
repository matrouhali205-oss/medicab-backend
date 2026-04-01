import { PatientsService } from './patients.service';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    create(data: any): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, data: any): any;
}
