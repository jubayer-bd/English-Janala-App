const createElement = (arr) => {
  const htmlElements = arr.map((item) => `<span class="btn">${item}</span>`);
  console.log(htmlElements.join(" "));
};
const numbers = [1, 2, 3, 4, 5];
createElement(numbers);