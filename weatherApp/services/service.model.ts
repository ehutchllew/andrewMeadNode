import axios, { AxiosResponse } from "axios";

export abstract class AbstractService<T> {
	public abstract getGeocode(param: string): Promise<AxiosResponse<T>>;

	protected execute(endpoint: string): Promise<AxiosResponse<T>> {
		return axios.get(endpoint);
	}
}
