import yargs, { Arguments as Yarguments } from "yargs";
import * as NoteOptions from "./notesCommandOptions";

const { _: command }: { _: string[] } = yargs
	.command("add", "Adding a new note!!!", NoteOptions.add, handleAddNote)
	.command(
		"remove",
		"Removing specific note",
		NoteOptions.remove,
		handleRemoveNote
	).argv;

function handleAddNote(argv?: Yarguments): void {
	console.log("ADD NOTE: \n", argv);
}

function handleRemoveNote(argv?: Yarguments): void {
	console.log("REMOVE NOTE: \n", argv);
}
