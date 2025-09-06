// display synonyms using array
const createElement = (arr) => {
  const htmlElements = arr.map(
    (item) =>
      `<span class="btn text-sm font-medium bg-[#EDF7FF] px-3 py-1 rounded-sm">${item}</span>`
  );
  return htmlElements.join(" ");
};
// loading status
const loadingStatus = (status) => {
  if (status === true) {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");

    document.getElementById("loading").classList.add("hidden");
  }
};
const loadingStatusModal = (status) => {
  if (status === true) {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("word_modal").classList.add("hidden");
  } else {
    document.getElementById("word_modal").classList.remove("hidden");
    document.getElementById("loading").classList.add("hidden");
  }
};

// loadLesson();
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
};
// load words by level
const loadLevelWord = (id) => {
  loadingStatus(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      // console.log(clickBtn);
      displayLevelWord(data.data);
    });
};
const loadWordDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWordDetail(data.data));
};
// {
//     "id": 3,
//     "level": 2,
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস"
// }
// display word detail in modal
const displayWordDetail = (word) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `<h2 class="text-2xl font-bold mb-2">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${
    word.pronunciation
  })
            </h2>
            <h3 class="text-lg font-semibold">Meaning</h3>
            <span class="font-bangla text-sm font-medium ">${
              word.meaning ? word.meaning : "অর্থ যুক্ত করা হয় নি"
            }</span>
            <h3 class="text-lg font-semibold mt-5">Example</h3>
            <p class="text-sm font-medium mb-5 ">
              ${word.sentence ? word.sentence : "Example যুক্ত করা হয় নি"}
            </p>
            <p class="font-bangla mb-1 font-semibold">সমার্থক শব্দ গুলো</p>
            <div class="flex flex-wrap gap-2">
              ${
                createElement(word.synonyms)
                  ? createElement(word.synonyms)
                  : "সমার্থক শব্দ নাই"
              }
            </div>`;
  loadingStatusModal(false);
  document.getElementById("word_modal").showModal();
};
// display words by level
const displayLevelWord = (words) => {
  console.log(words);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length === 0) {
    wordContainer.innerHTML = ` <div class="text-center col-span-3 space-y-3 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <img class ="mx-auto w-20 md:w-40" src="./assets/alert-error.png" alt="no data found" />
    <h1 class="text-sm text-[#79716B] font-medium font-bangla">
           এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </h1>
          <p class="text-3xl font-semibold font-bangla">নেক্সট Lesson এ যান</p>
        </div>`;
  }
  words.forEach((word) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="p-10 bg-white rounded-xl shadow-md text-center space-y-2">
          <h2 class="text-lg font-bold">${
            word.word ? word.word : "শব্দ যুক্ত করা হয় নি"
          }</h2>
          <p class="text-xl font-semibold">Meaning/ Pronounciation</p>
          <div class="text-xl font-medium font-bangla">
            "${word.meaning ? word.meaning : "অথ যুক্ত করা হয় নি"} / ${
      word.pronunciation ? word.pronunciation : "অনুবাদ যুক্ত করা হয় নি"
    }"
          </div>
          <div class="flex justify-between items-center">
            <button onclick="loadWordDetail(${
              word.id
            })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>`;
    wordContainer.append(div);
  });
  loadingStatus(false);
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
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no} </button>
    `;
    // 5. append to the container
    levelContainer.append(div);
  }
};
loadLesson();
