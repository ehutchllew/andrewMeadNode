import yargs from "yargs";

export interface IGeoOptions {
	[key: string]: yargs.Options;
}

export const latLng: IGeoOptions = {
	latLng: {
		alias: ["l", "ll"],
		demandOption: true,
		describe: "Input a latitude and longitude",
		type: "array",
	},
};

export const address: IGeoOptions = {
	address: {
		alias: "a",
		demandOption: true,
		describe: "Input address",
		type: "array",
	},
};
