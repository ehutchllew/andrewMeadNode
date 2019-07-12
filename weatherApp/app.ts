import { AbstractService, Service } from "./services";
const geoCodeUrl: string =
	"https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZWh1dGNobGxldyIsImEiOiJjankwZDk1cTIwMXh4M21xZjd0bWlyNjZlIn0.pfureZcF0b1A7JXqDNBmEw&limit=2";
const weatherUrl: string =
	"https://api.darksky.net/forecast/01a311714b4f26391e170bec6be4070a/37.8267,-122.4233";

const ServiceExecutor: AbstractService<any> = new Service();

ServiceExecutor.getGeocode(geoCodeUrl);
