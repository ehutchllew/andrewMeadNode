import axios from "axios";

export async function forecast(address) {
    const addressUrl: string = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZWh1dGNobGxldyIsImEiOiJjankwZDk1cTIwMXh4M21xZjd0bWlyNjZlIn0.pfureZcF0b1A7JXqDNBmEw&limit=1`;

    const place = await axios({ method: "get", url: addressUrl });
    if (!place.data.features.length) throw console.log("NO RESULTS");

    const [lng, lat]: string[] = place.data.features[0].center;
    const geoCodeUrl: string = createGeoCodeUrl([lat, lng])();

    const weather = await axios({ method: "get", url: geoCodeUrl });
    return {
        location: place,
        weather,
    };
}

export function geocode([lat, lng]: string[]) {
    const geoCodeUrl: string = createGeoCodeUrl([lat, lng])();
    axios({
        method: "get",
        url: geoCodeUrl,
    })
        .then((resp) => console.log("GEOCODE RESP: \n", resp))
        .catch((err) => console.log("GEOCODE ERR: \n", err));
}

function createGeoCodeUrl([lat, lng]: string[]): () => string {
    return function () {
        return `https://api.darksky.net/forecast/01a311714b4f26391e170bec6be4070a/${lat},${lng}`;
    };
}
