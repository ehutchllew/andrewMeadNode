class ErrorHandler {
	private static _message: string;

	static get message(): string {
		return this._message;
	}

	static set message(errorMessage: string) {
		this._message = errorMessage;
	}
}
