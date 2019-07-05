import yargs from "yargs";

export interface INotesOptions {
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

const read: INotesOptions = {
	title: add.title,
};

const remove: INotesOptions = {
	title: add.title,
};

export { add, read, remove };
