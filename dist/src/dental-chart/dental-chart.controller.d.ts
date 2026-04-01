import { DentalChartService } from './dental-chart.service';
export declare class DentalChartController {
    private readonly dentalChartService;
    constructor(dentalChartService: DentalChartService);
    getPatientChart(patientId: string): any;
    updateTooth(patientId: string, toothNumber: string, data: any): any;
}
