import { AxiosError, AxiosResponse } from "axios";
import chalk from "chalk";
import { AbstractService, IRequestConfig } from "./service.model";

export class Service extends AbstractService<any> {
	public async getAPI(endpoint: string): Promise<AxiosResponse> {
		const request: IRequestConfig<any> = {
			method: "GET",
			url: endpoint,
		};
		try {
			const response: AxiosResponse<any> = await this.execute(request);
			return response;
		} catch (error) {
			const { response }: AxiosError = error;
			/**
			 * TODO: Need to throw error here.
			 */
			console.log(
				chalk.redBright(
					`*** ERROR: ${response.status} ***\n*** REASON: ${
						response.data.message
					} ***`
				)
			);
		}
	}
}
