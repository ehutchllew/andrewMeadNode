import fs from "fs";
import { INote } from "./models/notes";

class Notes {
	private allNotes: INote[];
	private isDirty: boolean = true;
	constructor(private readonly notesPath: string) {
		this.notesPath = notesPath;
	}

	public addNote({ body, title }: INote): void {
		/* Attn: Check out feature/notes-using-map for alt
		 * implementation using Map over Array.
		 */
		this.allNotes = this.loadNotes();

		if (this.findNote(title)) {
			console.error("A note with that title already exists.");
			return;
		}

		this.allNotes.push({ body, title });

		this.saveNotes(this.allNotes);
	}

	public getNotes(): string {
		return "Your notes...";
	}

	public removeNote(title: string): void {
		this.allNotes = this.loadNotes();

		const foundNote: INote = this.findNote(title);
		if (!foundNote) {
			console.error("A note with that title does not exist.");
			return;
		}

		const newAllNotes: INote[] = this.allNotes.filter(
			note => note.title !== title
		);

		this.saveNotes(newAllNotes);
	}

	private findNote(title: string): INote {
		return this.allNotes.find(note => note.title === title);
	}

	private loadNotes(): INote[] {
		if (!this.isDirty) {
			this.isDirty = false;
			return this.allNotes;
		}

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

		this.isDirty = true;
	}
}

export { Notes };
