export default function () {
  const titles = [
    "FRONTEND DEVELOPER",
    "BACKEND DEVELOPER",
    "FULLSTACK DEVELOPER",
  ];
  const introHeader = document.querySelector("#intro h2");
  var index = 0;
  setInterval(() => {
    if (index > 2) index = 0;
    introHeader.style.opacity = "1";
    setTimeout(() => {
      introHeader.style.opacity = "0";
    }, 1100);
    introHeader.textContent = titles[index];
    index++;
  }, 1600);
}
