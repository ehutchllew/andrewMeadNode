import { AxiosResponse } from "axios";
import { AbstractService, IRequestConfig } from "./service.model";

export class Service extends AbstractService<any> {
    public async getAPI(endpoint: string): Promise<AxiosResponse> {
        const request: IRequestConfig<any> = {
            method: "GET",
            url: endpoint
        };
        try {
            const response: AxiosResponse<any> = await this.execute(request);
            return response;
        } catch (error) {
            throw error;
        }
    }
}
