import yargs, { Arguments as Yarguments } from "yargs";
import * as CommandOptions from "./commandOptions";
import { IWeather } from "./models/weather";
import { AbstractService, Service } from "./services";

const ServiceExecutor: AbstractService<any> = new Service();

const { _: command }: { _: string[] } = yargs
	.command(
		"geo",
		"Get weather at geolocation.",
		CommandOptions.latLng,
		handleRequestGeolocation
	)
	.command(
		"place",
		"Get weather at place",
		CommandOptions.address,
		handleRequestPlace
	).argv;

function handleRequestGeolocation(argv: Yarguments<IWeather>) {
	const geoCodeUrl: string = createGeoCodeUrl(argv.latLng)();
	ServiceExecutor.getAPI(geoCodeUrl).then(weatherServiceCallback);
}

async function handleRequestPlace(argv: Yarguments<IWeather>) {
	const encodedAddress: string = argv.address.join("%20");

	const addressUrl: string = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiZWh1dGNobGxldyIsImEiOiJjankwZDk1cTIwMXh4M21xZjd0bWlyNjZlIn0.pfureZcF0b1A7JXqDNBmEw&limit=2`;

	const place = await ServiceExecutor.getAPI(addressUrl);
	const [lng, lat]: string[] = place.data.features[0].center;
	const geoCodeUrl: string = createGeoCodeUrl([lat, lng])();

	ServiceExecutor.getAPI(geoCodeUrl).then(weatherServiceCallback);
}

function createGeoCodeUrl([lat, lng]: string[]): () => string {
	return function() {
		return `https://api.darksky.net/forecast/01a311714b4f26391e170bec6be4070a/${lat},${lng}`;
	};
}
/**
 * TODO: Instead of weatherServiceCallback, I'm going to create
 * a class that has success and error methods that format string params(see catch block of service.ts)
 */
function weatherServiceCallback(response: any): void {
	console.log(response.data.currently);
}
