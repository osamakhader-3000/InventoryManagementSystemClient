import Assignment from "../domain/Assignment";
import { ITaskApi } from "../Interfaces/ITaskApi";
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../DataTransferObjects/GeneralApiResult";

export class AssignmentApi extends GeneralApi implements IAssignmentApi{
    private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = urls['inventory-management-system-app'];
    }

    async ListAssignments(): Promise<GeneralApiResult<Assignment[]>> {
        let url = `${this.baseUrl}/${urls['assignments-list']}`;
        let result = await this.GeneralApiCaller<Assignment[]>('GET', url);
        return result;
    }

    async GetAssignment(assignmentID: string): Promise<GeneralApiResult<Assignment>> {
        let url = `${this.baseUrl}/${urls['assignment-get']}/${assignmentID}`;
        let result = await this.GeneralApiCaller<Assignment>('GET', url);
        return result;
        
    }

    async CreateAssignment(assignment: Assignment): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['assignment-create']}`;
        let result = await this.GeneralApiCaller<boolean>('POST', url, assignment);
        return result;
    }

    async UpdateAssignment(assignment: Assignment): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['assignment-update']}`;
        let result = await this.GeneralApiCaller<boolean>('PUT', url, assignment);
        return result;
    }

    async DeleteAssignment(assignmentID: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['assignment-delete']}/${assignmentID}`;
        let result = await this.GeneralApiCaller<boolean>('DELETE', url);
        return result;
    }

}