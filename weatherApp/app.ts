import axios from "axios";

const url: string =
	"https://api.darksky.net/forecast/01a311714b4f26391e170bec6be4070a/37.8267,-122.4233";

axios.get(url).then(resp => console.log(resp));
