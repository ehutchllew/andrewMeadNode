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
		const allNotes: INote[] = this.loadNotes();

		allNotes.push({ body, title });

		this.saveNotes(allNotes);
	}

	public getNotes(): string {
		return "Your notes...";
	}

	private loadNotes(): INote[] {
		try {
			const dataBuffer: Buffer = fs.readFileSync(this.notesPath);

			const data: any = JSON.parse(dataBuffer.toString());

			return data;
		} catch (error) {
			console.warn(error);
			return [];
		}
	}

	private saveNotes(allNotes: INote[]): void {
		fs.writeFileSync(this.notesPath, JSON.stringify(allNotes));
	}
}

export { Notes };
