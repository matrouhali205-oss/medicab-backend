import { RecordsService } from './records.service';
export declare class RecordsController {
    private readonly recordsService;
    constructor(recordsService: RecordsService);
    create(data: any): any;
    findByPatient(patientId: string): any;
}
