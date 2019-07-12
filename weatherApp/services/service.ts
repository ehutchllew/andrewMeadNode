import { AxiosResponse } from "axios";
import { AbstractService, IRequestConfig } from "./service.model";

export class Service extends AbstractService<any> {
	public async getGeocode(endpoint: string): Promise<AxiosResponse> {
		const request: IRequestConfig<any> = {
			method: "GET",
			url: endpoint,
		};
		const response: AxiosResponse<any> = await this.execute(request);
		console.log(response.data.features);
		return response;
	}
}
