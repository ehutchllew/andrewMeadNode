import axios, { AxiosResponse, Method } from "axios";

/**
 * If we wanted to ensure better re-usability, it might make
 * more sense to parameterize each method with `<T>` instead of
 * the entire class.
 *
 * ex: `protected execut<T>({}): Promise<AxiosResponse<T>> {}`
 */
export abstract class AbstractService<T> {
	public abstract getAPI(param: string): Promise<AxiosResponse<T>>;

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
