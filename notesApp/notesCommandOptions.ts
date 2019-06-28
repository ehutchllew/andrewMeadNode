import yargs from "yargs";

interface INotesOptions {
	[key: string]: yargs.Options;
}

const add: INotesOptions = {
	body: {
		alias: "b",
		demandOption: true,
		describe: "Add a body to the note.",
		type: "string",
	},
	title: {
		alias: "t",
		demandOption: true,
		describe: "Note Title.",
		type: "string",
	},
};

const remove: INotesOptions = {
	id: {
		demandOption: true,
		describe: "Remove note with matching ID.",
		type: "number",
	},
};

export { add, remove };
