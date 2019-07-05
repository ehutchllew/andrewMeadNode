import fs from "fs";
import { INote } from "./models/notes";

class Notes {
	constructor(private readonly notesPath: string) {
		this.notesPath = notesPath;
	}

	public addNote({ body, title }: INote): void {
		/* Attn: Check out feature/notes-using-map for alt
		 *	implementation using Map over Array.
		 */
		const allNotes: INote[] = this.loadNotes();
		if (allNotes.find(item => item.title === title)) {
			console.error("A note with that title already exists.");
			return;
		}

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
