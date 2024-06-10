// 변수
const AreaOpenBtn = document.querySelector(".area");
const AreaBox = document.querySelector(".AreaBox");
const AreaCloseBtn = document.querySelector(".AreaClose");
const AreaTagBox = document.querySelector(".AreaTag");
const buttons = document.querySelectorAll(".AreaTag button");
const completeButton = document.querySelector(".AreaBtn .Btn");
const inputField = document.querySelector("#area");
const timeInput = document.querySelectorAll('.time input[type="radio"]');
const freeTimeInput = document.querySelector("#free-time");
const nameInput = document.querySelector("#name");
const textareas = document.querySelectorAll(".textarea-box textarea");
const submitButton = document.querySelector(".btn_submit");
const areaInput = document.getElementById("area");
const numberInput = document.getElementById("number");
const userDataCheckbox = document.querySelector(
  '.UserDataCheck input[type="checkbox"]'
);

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
// 지역선택 버튼 클릭 시 이벤트 핸들러
function handleAreaOpen() {
  removeClassList(AreaBox, "hidden");
  AreaOpenBtn.style.backgroundImage = `url('assets/images/arrow-top.png')`;
}

// 지역선택 닫기 버튼 클릭 시 이벤트 핸들러
function handleAreaClose() {
  addClassList(AreaBox, "hidden");
  AreaOpenBtn.style.backgroundImage = "url('assets/images/arrow-bottom.png')";
}
// 특정 버튼 활성화 함수
function activateButton(buttons, activeButton) {
  buttons.forEach((btn) => btn.classList.remove("active"));
  activeButton.classList.add("active");
}
// 지역선택 완료 버튼 클릭 시 이벤트 핸들러
function handleAreaComplete() {
  const activeButton = document.querySelector(".AreaTag button.active");
  if (activeButton) {
    inputField.value = activeButton.textContent;
    addClassList(AreaBox, "hidden");
  }
}

// 특정 라디오 버튼 변경 시 이벤트 핸들러
function handleRadioChange() {
  if (this.id === "free") {
    freeTimeInput.classList.remove("hidden");
  }
}

// 유효성 검사 함수
function validateForm() {
  if (areaInput.value === "") {
    alert(
      `${
        areaInput.parentNode.parentNode.querySelector("strong").ariaLabel
      }은 필수 입력란입니다.`
    );
    return false;
  }

  if (nameInput.value === "") {
    alert(
      `${
        nameInput.parentNode.parentNode.querySelector("strong").ariaLabel
      }은 필수 입력란입니다.`
    );
    return false;
  }

  if (numberInput.value === "") {
    alert(
      `${
        numberInput.parentNode.parentNode.querySelector("strong").ariaLabel
      }은 필수 입력란입니다.`
    );
    return false;
  }

  let timeChecked = false;
  timeInput.forEach((radio) => {
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
// 입점신청 버튼 활성화/비활성화
function toggleButtonState() {
  const isAreaValid = areaInput.value.trim() !== "";
  const isNameValid = nameInput.value.trim() !== "";
  const isNumberValid = numberInput.value.trim() !== "";
  const isTimeChecked = Array.from(timeInput).some((radio) => radio.checked);
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
// 특정 textarea 입력 시 이벤트 핸들러
function handleTextareaInput(textarea) {
  const charCountSpan = textarea.nextElementSibling.querySelector("span");
  const charCount = textarea.value.length;
  if (textarea.value.length) {
    textarea.style.borderColor = "black";
    charCountSpan.parentNode.style.borderColor = "black";
  } else {
    textarea.style.borderColor = "#ddd";
    charCountSpan.parentNode.style.borderColor = "#ddd";
  }
  charCountSpan.textContent = charCount;
  textarea.value = removeEmojis(textarea.value);
}
// 지역선택 버튼 이벤트 등록
AreaOpenBtn.addEventListener("click", handleAreaOpen);
AreaCloseBtn.addEventListener("click", handleAreaClose);

// 지역선택 버튼 이벤트 등록
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    activateButton(buttons, this);
  });
});
// 지역선택 완료 버튼 이벤트 등록
completeButton.addEventListener("click", handleAreaComplete);

// 라디오 버튼 이벤트 등록
timeInput.forEach((radio) => {
  radio.addEventListener("change", handleRadioChange);
});

freeTimeInput.addEventListener("input", function () {
  this.value = removeEmojis(this.value);
});
nameInput.addEventListener("input", function () {
  this.value = removeEmojis(this.value);
});

// textarea 이벤트 등록
textareas.forEach((textarea) => {
  textarea.addEventListener("input", function () {
    handleTextareaInput(textarea);
  });
});

toggleButtonState();

document
  .querySelectorAll(".forms-group input, .UserDataCheck input[type='checkbox']")
  .forEach((input) => {
    input.addEventListener("input", toggleButtonState);
  });

document.querySelectorAll('.time input[type="radio"]').forEach((radio) => {
  radio.addEventListener("change", toggleButtonState);
});
// 입점신청 버튼 클릭 이벤트
submitButton.addEventListener("click", function (event) {
  if (!validateForm()) {
    event.preventDefault(); // 유효성 검사 실패 시 제출 방지
  } else {
    alert("제출되었습니다!");
  }
});
