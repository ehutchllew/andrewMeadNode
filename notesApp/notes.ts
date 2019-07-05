import fs from "fs";
import { INote } from "./models/notes";

class Notes {
	constructor(private readonly notesPath: string) {
		this.notesPath = notesPath;
	}

	public addNote({ body, title }: INote): void {
		/* TODO: Instead of array, make a map and assign
		 * the key as the title to check for duplicates.
		 */
		const allNotes: Map<string, string> = this.loadNotes();

		if (allNotes.get(title)) {
			console.error("A note with that title already exists");
			return;
		}

		allNotes.set(title, body);

		this.saveNotes(allNotes);
	}

	public getNotes(): string {
		return "Your notes...";
	}

	private loadNotes(): Map<string, string> {
		try {
			const dataBuffer: Buffer = fs.readFileSync(this.notesPath);

			const dataParsed: any = JSON.parse(dataBuffer.toString());

			const dataMap: Map<string, string> = new Map(
				Object.entries(dataParsed)
			);

			return dataMap;
		} catch (error) {
			console.warn("**ERROR RETRIEVING NOTES**\n", error);
			return new Map();
		}
	}

	private saveNotes(allNotes: Map<string, string>): void {
		const allNotesEntries: IterableIterator<
			[string, string]
		> = allNotes.entries();

		let allNotesObject: IMapToObject = {};

		for (const [title, body] of allNotesEntries) {
			allNotesObject[title] = body;
		}

		fs.writeFileSync(this.notesPath, JSON.stringify(allNotesObject));
	}
}

interface IMapToObject {
	[key: string]: string;
}

export { Notes };
