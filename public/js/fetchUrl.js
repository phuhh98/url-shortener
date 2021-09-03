///a script
const urlForm = document.querySelector("#urlForm");
var shortUrl = document.querySelector("#shortUrl");
const originalURL = document.querySelector("#origin");
const clientUrl = new URL(window.location.href);

shortUrl.textContent = `Input url to the box above!`;

urlForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    console.log(`${clientUrl.protocol}://${clientUrl.host}/url`);
    const response = await fetch(`${clientUrl.protocol}//${clientUrl.host}/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `origin=${originalURL.value}`,
    });
    const result = await response.json();
    console.log(result.shortURL);
    if (result.error) {
      shortUrl.textContent = `Invalide URL`;
    } else {
      shortUrl.textContent = result.shortURL;
    }
  } catch (err) {
    console.error(err);
  }
});
