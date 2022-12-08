const formSelector = document.querySelector("#form-image");
const spinner = document.querySelector(".spinner");

formSelector.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  document.querySelector(".msg").innerHTML = "";
  document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    alert("Please enter a prompt");
    return;
  }

  generateImageRequest(prompt, size);

  //console.log(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();
    const response = await fetch(`/openai/generateimage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, size }),
    });
    if (!response.ok) {
      hideSpinner();
      throw new Error("Image could not be generated");
    }

    const data = await response.json();
    // console.log(data);
    document.querySelector("#image").src = data.data;
    hideSpinner();
  } catch (error) {
    document.querySelector(".msg").innerHTML = error;
  }
}

function showSpinner() {
  spinner.classList.add("show");
}

function hideSpinner() {
  spinner.classList.remove("show");
}
