import { AxiosResponse } from "axios";
import { AbstractService } from "./service.model";

export class Service extends AbstractService<any> {
	public async getGeocode(endpoint: string): Promise<AxiosResponse> {
		const response: AxiosResponse<any> = await this.execute(endpoint);
		console.log(response.data.features);
		return response;
	}
}
