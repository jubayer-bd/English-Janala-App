const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

// load words by level
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

// display words by level
const displayLevelWord = (words) => {
  console.log(words);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  words.forEach((word) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="p-10 bg-white rounded-xl shadow-md text-center space-y-2">
          <h2 class="text-lg font-bold">${word.word}</h2>
          <p class="text-xl font-semibold">Meaning/ Pronounciation</p>
          <div class="text-xl font-medium font-bangla">
            "${word.meaning} / ${word.pronunciation}"
          </div>
          <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>`;
    wordContainer.append(div);
  });
};
const displayLesson = (lessons) => {
  //   1. get the container and empty it
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2. get into every lesson
  for (let lesson of lessons) {
    // 3. create an element
    const div = document.createElement("div");
    // 4. set the innerHTML
    div.innerHTML = `
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no} </button>
    `;
    // 5. append to the container
    levelContainer.append(div);
  }
};
loadLesson();
