import Assignment from "../domain/Assignment";
import AssignmentFilter from "../domain/AssignmentFilter";
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export class AssignmentApi extends GeneralApi {
    private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['inventory-domain']}${urls['assignment']}`;
    }

    async ListAssignments(filter?: AssignmentFilter): Promise<GeneralApiResult<Assignment[]>> {
        const params = new URLSearchParams();
        if (filter?.userId) params.append('userid', filter.userId);
        if (filter?.departmentId) params.append('depid', filter.departmentId);
        if (filter?.purchasedDate) params.append('purDate', filter.purchasedDate);
        if (filter?.model) params.append('model', filter.model);
        if (filter?.serialNumber) params.append('sn', filter.serialNumber);
        if (filter?.isReturned !== undefined) params.append('rtrnd', filter.isReturned ? '1' : '0');

        const query = params.toString();
        let url = `${this.baseUrl}${urls['assignments-list']}${query ? `?${query}` : ''}`;
        let result = await this.SecureApiCaller<Assignment[]>('GET', url);
        return result;
    }

    async GetAssignment(assignmentID: number): Promise<GeneralApiResult<Assignment>> {
        let url = `${this.baseUrl}${urls['assignment-get']}/${assignmentID.toString()}`;
        let result = await this.SecureApiCaller<Assignment>('GET', url);
        return result;
        
    }

    async CreateAssignment(assignment: Assignment): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['assignment-create']}`;
        let result = await this.SecureApiCaller<boolean>('POST', url, this.toRequestBody(assignment));
        return result;
    }

    async UpdateAssignment(assignment: Assignment): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['assignment-update']}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url, this.toRequestBody(assignment));
        return result;
    }

    // Only the fields the server reads. Nulls for non-nullable server types (Guid, DateTime, bool)
    // fail JSON binding, so unknown values are left out instead of sent as null.
    private toRequestBody(assignment: Assignment) {
        return {
            id: assignment.id ?? 0,
            device: assignment.device.id
                ? { id: assignment.device.id, serialNumber: assignment.device.serialNumber }
                : { serialNumber: assignment.device.serialNumber },
            assignedUser: { id: assignment.assignedUser.id },
            accessories: assignment.accessories.map(accessory => ({ id: accessory.id })),
            remarks: assignment.remarks
        };
    }

    async ReturnAssignment(assignmentID: number): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['assignment-return']}/${assignmentID.toString()}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url);
        return result;
    }

}