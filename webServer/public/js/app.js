console.log("Client side JS file loaded");

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    const locationValue = searchInput.value;
    fetch(`http://localhost:3001/weather?address=${locationValue}`)
        .then((resp) => resp.json())
        .then((json) => {
            if (json.error) {
                messageOne.textContent = "Something went wrong!";
                messageTwo.textContent = json.error;
                return;
            }
            messageOne.textContent = json.location.place_name;
            messageTwo.textContent = `${json.forecast.current.summary} at ${json.forecast.current.temperature} degrees.`;
        })
        .catch((e) => {
            console.log("ERROR: \n", e);
        });
});
