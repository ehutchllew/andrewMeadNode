import fs from "fs";
import yargs, { Arguments as Yarguments } from "yargs";
import { INote } from "./models/notes";
import { Notes } from "./notes";
import * as NoteOptions from "./notesCommandOptions";

const NoteCommands: Notes = new Notes("notesApp/data/notes.json");

const { _: command }: { _: string[] } = yargs
	.command("add", "Adding a new note!!!", NoteOptions.add, handleAddNote)
	.command(
		"remove",
		"Removing specific note",
		NoteOptions.remove,
		handleRemoveNote
	).argv;

function handleAddNote(argv?: Yarguments<INote>): void {
	// console.log("ADD NOTE: \n", argv);
	const noteObject: INote = {
		body: argv.body,
		title: argv.title,
	};
	NoteCommands.addNote(noteObject);
}

function handleRemoveNote(argv?: Yarguments): void {
	console.log("REMOVE NOTE: \n", argv);
}
