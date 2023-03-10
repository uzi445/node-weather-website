console.log(`Client side js is loaded`);

const wForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");

wForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "loading...";
  messageTwo.textContent = "";
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((d) => {
        if (d.error) {
          return (messageOne.textContent = d.error);
        } else {
          messageOne.textContent = `${d.location}`;
          messageTwo.textContent = `${d.forecast}`;
        }
      });
    }
  );
});
