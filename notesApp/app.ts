import yargs from "yargs";
import * as NoteOptions from "./notesCommandOptions";

const { _: command }: { _: string[] } = yargs
	.command("add", "Adding a new note!!!", NoteOptions.add, handleAddNote)
	.command(
		"remove",
		"Removing specific note",
		NoteOptions.remove,
		handleRemoveNote
	).argv;

function handleAddNote(argv?: yargs.Arguments): void {
	console.log("ADD NOTE: \n", argv);
}

function handleRemoveNote(argv?: yargs.Arguments): void {
	console.log("REMOVE NOTE: \n", argv);
}

// switch (command) {
// 	case "add":
// 		console.log(chalk.green("Adding a note!"));
// 		break;
// 	case "remove":
// 		console.log(chalk.red("Removing a note!"));
// 		break;
// 	default:
// 		console.log("Please input appropriate command.");
// }
