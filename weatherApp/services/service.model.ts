import axios, { AxiosResponse, Method } from "axios";

export abstract class AbstractService<T> {
	public abstract getGeocode(param: string): Promise<AxiosResponse<T>>;

	protected execute({
		method,
		url,
	}: IRequestConfig<{}>): Promise<AxiosResponse<T>> {
		return axios({
			method,
			url,
		});
	}
}

export interface IRequestConfig<T> {
	data?: T;
	method: Method;
	responseType?: string;
	url: string;
}
