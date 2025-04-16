const buttons = document.querySelectorAll("nav button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentState = button.getAttribute("data-state");

    if (!currentState || currentState === "closed") {
      button.setAttribute("data-state", "opened");
      button.setAttribute("aria-expanded", "true");
    } else {
      button.setAttribute("data-state", "closed");
      button.setAttribute("aria-expanded", "false");
    }
  });
});

function animation(elems) {
  elems.forEach((el) => {
    const elementHeight = el.getBoundingClientRect().top;

    console.log(window.innerHeight / 1.5, elementHeight);

    if (window.innerHeight / 1.5 > elementHeight) {
      el.style.transform = "translateX(0) translateY(0)";
      el.style.opacity = "100";
    }
  });
}

const elements = document.querySelectorAll(".animation");

window.addEventListener("load", (event) => {
  animation(elements);
});

document.addEventListener("scroll", (event) => {
  animation(elements);
});
