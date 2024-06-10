// 공통 컴포넌트
function toggleClassList(target, className) {
  target.classList.toggle(className);
}

function addClassList(target, className) {
  target.classList.add(className);
}

function removeClassList(target, className) {
  target.classList.remove(className);
}
function removeEmojis(text) {
  const emojiRegex = /[^0-9a-zA-Zㄱ-힣\s!@#$%^&*(),.?/":{}|<>]/g;
  return text.replace(emojiRegex, "");
}
// 변수
const AreaOpenBtn = document.querySelector(".area");
const AreaBox = document.querySelector(".AreaBox");
const AreaCloseBtn = document.querySelector(".AreaClose");
const AreaTagBox = document.querySelector(".AreaTag");
const buttons = document.querySelectorAll(".AreaTag button");
const completeButton = document.querySelector(".AreaBtn .Btn");
const inputField = document.querySelector("#area");
const FreeTextBoxOpen = document.querySelector("#free");
AreaOpenBtn.addEventListener("click", () => {
  removeClassList(AreaBox, "hidden");
});
AreaCloseBtn.addEventListener("click", () => {
  addClassList(AreaBox, "hidden");
});
FreeTextBoxOpen.addEventListener("click", () => {
  removeClassList(AreaBox, "hidden");
});
FreeTextBoxOpen.addEventListener("click", () => {
  addClassList(AreaBox, "hidden");
});

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    buttons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
  });
});

completeButton.addEventListener("click", function () {
  const activeButton = document.querySelector(".AreaTag button.active");
  if (activeButton) {
    inputField.value = activeButton.textContent;
    addClassList(AreaBox, "hidden");
  }
});
const radioButtons = document.querySelectorAll('.time input[type="radio"]');
const freeTimeInput = document.querySelector("#free-time");

radioButtons.forEach((radio) => {
  radio.addEventListener("change", function () {
    if (this.id === "free") {
      freeTimeInput.classList.remove("hidden");
    }
  });
});

freeTimeInput.addEventListener("input", function () {
  this.value = removeEmojis(this.value);
});

const textareas = document.querySelectorAll(".textarea-box textarea");

textareas.forEach((textarea) => {
  const charCountSpan = textarea.nextElementSibling.querySelector("span");

  textarea.addEventListener("input", function () {
    const charCount = textarea.value.length;
    charCountSpan.textContent = charCount;

    textarea.value = removeEmojis(textarea.value);
  });
});
function validateForm() {
  const areaInput = document.getElementById("area");
  const nameInput = document.getElementById("name");
  const numberInput = document.getElementById("number");
  const radioButtons = document.querySelectorAll('.time input[type="radio"]');
  const userDataCheckbox = document.querySelector(
    '.UserDataCheck input[type="checkbox"]'
  );
  console.log(areaInput.parentNode.parentNode.querySelector("strong"));
  if (areaInput.value === "") {
    alert(
      `${
        areaInput.parentNode.parentNode.querySelector("strong").ariaLabel
      }는 필수 입력란입니다.`
    );
    return false;
  }

  if (nameInput.value === "") {
    alert(
      `${
        nameInput.parentNode.parentNode.querySelector("strong").ariaLabel
      }는 필수 입력란입니다.`
    );
    return false;
  }

  if (numberInput.value === "") {
    alert(
      `${
        numberInput.parentNode.parentNode.querySelector("strong").ariaLabel
      }는 필수 입력란입니다.`
    );
    return false;
  }

  let timeChecked = false;
  radioButtons.forEach((radio) => {
    if (radio.checked) {
      timeChecked = true;
    }
  });
  if (!timeChecked) {
    alert("담당자 통화 가능한 시간은 필수 입력란입니다.");
    return false;
  }
  if (!userDataCheckbox.checked) {
    alert("개인정보 수집 및 이용동의는 필수입니다.");
    return false;
  }

  return true;
}
function toggleButtonState() {
  const areaInput = document.getElementById("area");
  const nameInput = document.getElementById("name");
  const numberInput = document.getElementById("number");
  const radioButtons = document.querySelectorAll('.time input[type="radio"]');
  const userDataCheckbox = document.querySelector(
    '.UserDataCheck input[type="checkbox"]'
  );
  const submitButton = document.querySelector(".btn_submit");

  const isAreaValid = areaInput.value.trim() !== "";
  const isNameValid = nameInput.value.trim() !== "";
  const isNumberValid = numberInput.value.trim() !== "";
  const isTimeChecked = Array.from(radioButtons).some((radio) => radio.checked);
  const isCheckboxChecked = userDataCheckbox.checked;

  if (
    isAreaValid &&
    isNameValid &&
    isNumberValid &&
    isTimeChecked &&
    isCheckboxChecked
  ) {
    submitButton.classList.remove("active");
    submitButton.type = "submit";
  } else {
    submitButton.type = "button";
    submitButton.classList.add("active");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.querySelector(".btn_submit");

  toggleButtonState();

  document
    .querySelectorAll(
      ".forms-group input, .UserDataCheck input[type='checkbox']"
    )
    .forEach((input) => {
      input.addEventListener("input", toggleButtonState);
    });

  document.querySelectorAll('.time input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", toggleButtonState);
  });

  submitButton.addEventListener("click", function (event) {
    if (validateForm()) {
      alert("제출되었습니다!");
    }
  });
});
