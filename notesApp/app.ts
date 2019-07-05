import yargs, { Arguments as Yarguments } from "yargs";
import { INote } from "./models/notes";
import { Notes } from "./notes";
import * as NoteOptions from "./notesCommandOptions";

const NoteCommands: Notes = new Notes("notesApp/data/notes.json");

const { _: command }: { _: string[] } = yargs
	.command(
		"add",
		"Adding a new note!!! You're welcome.",
		NoteOptions.add,
		handleAddNote
	)
	.command(
		"remove",
		"Removing specific note",
		NoteOptions.remove,
		handleRemoveNote
	)
	.command("list", "Listing all your notes.", {}, handleListAllNotes)
	.command(
		"read",
		"Read a specific note.",
		NoteOptions.read,
		handleReadNote
	).argv;

function handleAddNote(argv?: Yarguments<INote>): void {
	const noteObject: INote = {
		body: argv.body,
		title: argv.title,
	};
	NoteCommands.addNote(noteObject);
}

function handleListAllNotes(argv?: Yarguments<INote>): void {
	NoteCommands.listNotes();
}

function handleReadNote(argv?: Yarguments<INote>): void {
	NoteCommands.readNote(argv.title);
}

function handleRemoveNote(argv?: Yarguments<INote>): void {
	NoteCommands.removeNote(argv.title);
}
