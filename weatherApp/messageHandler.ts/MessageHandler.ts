import chalk from "chalk";

export class MessageHandler {
    public failure(message: any): void {
        console.log(chalk.redBright(`\n***\n ERROR: ${message} \n***\n`));
    }

    public success(message: any): void {
        console.log(chalk.greenBright(`\n***\n SUCCESS: ${message} \n***\n`));
    }
}
