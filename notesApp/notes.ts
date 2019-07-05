import chalk from "chalk";
import fs from "fs";
import { INote } from "./models/notes";

class Notes {
	private allNotes: INote[];
	private isDirty: boolean = true;
	constructor(private readonly notesPath: string) {
		this.allNotes = this.loadNotes();
		this.notesPath = notesPath;
	}

	public addNote({ body, title }: INote): void {
		/* Attn: Check out feature/notes-using-map for alt
		 * implementation using Map over Array.
		 */
		this.allNotes = this.loadNotes();

		if (this.findNote(title)) {
			console.error(
				chalk.redBright(
					`***\nNote with title: "${title}", already exists!\n***`
				)
			);
			return;
		}

		this.allNotes.push({ body, title });

		this.saveNotes(this.allNotes);

		console.log(
			chalk.greenBright(
				`***\nNote with title: "${title}", was successfully added!\n***`
			)
		);
	}

	public listNotes(): void {
		this.allNotes = this.loadNotes();
		console.log(chalk.magentaBright("***\nListing Your Notes:\n***"));
		for (const note of this.allNotes) {
			console.log(
				chalk.green("*Title: "),
				chalk.yellow(note.title) + "; ",
				chalk.green("*Body: "),
				chalk.yellow(note.body) + "\n"
			);
		}
	}

	public readNote(title: string): void {
		const foundNote: INote = this.findNote(title);
		if (!foundNote) {
			console.error(
				chalk.redBright(
					`***\nNote with title: "${title}", does not exist!\n***`
				)
			);
			return;
		}

		console.log(chalk.greenBright(`***\n We found your note: \n***`));
		console.log(
			chalk.green("*Title: "),
			chalk.yellow(foundNote.title) + "; ",
			chalk.green("*Body: "),
			chalk.yellow(foundNote.body) + "\n"
		);
	}

	public removeNote(title: string): void {
		this.allNotes = this.loadNotes();

		const foundNote: INote = this.findNote(title);
		if (!foundNote) {
			console.error(
				chalk.redBright(
					`***\nNote with title: "${title}", does not exist!\n***`
				)
			);
			return;
		}

		const newAllNotes: INote[] = this.allNotes.filter(
			note => note.title !== title
		);

		this.saveNotes(newAllNotes);

		console.log(
			chalk.greenBright(
				`***\nNote with title: "${title}", was successfully removed!\n***`
			)
		);
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
