# 1. 필수 입력

### 필수값 모두 입력
```
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
```
- 필수 값 
  - 지역 (areaInput)
  - 업체명  (nameInput)
  - 담당자 전화번호 (numberInput)
  - 담당자 통화가능한 시간 (timeInput)
  - 개인정보 수집 및 이용동의 (userDataCheckbox)
  - 
이렇게 변수명을 지정하고 각자 value 및 checked를 확인해서 입점신청 버튼을 활성화/비활성화를 하였습니다

### 필수값 모두 입력 안함

```
function validateForm() {
  const areaInput = document.getElementById("area");
  const nameInput = document.getElementById("name");
  const numberInput = document.getElementById("number");
  const timeInput = document.querySelectorAll('.time input[type="radio"]');
  const userDataCheckbox = document.querySelector(
    '.UserDataCheck input[type="checkbox"]'
  );
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
```
validateForm 컴포넌트를 사용해서 입력 또는 체크 안한 필수 항목들에 대해서 alert가 나오도록 작업하였습니다.

또한 입점신청 버튼 활성화/비활성화를 구분하기 위해 active를 추가하여 조건에 충족되지 않을 시 회색으로 표시되도록 하였습니다

# 2. 지역

```
function handleAreaOpen() {
  removeClassList(AreaBox, "hidden");
  AreaOpenBtn.style.backgroundImage = `url('assets/images/arrow-top.png')`;
}

// 지역선택 닫기 버튼 클릭 시 이벤트 핸들러
function handleAreaClose() {
  addClassList(AreaBox, "hidden");
  AreaOpenBtn.style.backgroundImage = "url('assets/images/arrow-bottom.png')";
}
```

```
// 지역선택 버튼 이벤트 등록
AreaOpenBtn.addEventListener("click", handleAreaOpen);
AreaCloseBtn.addEventListener("click", handleAreaClose);
```
지역 부분을 클릭 시 레이어 출력이 가능하도록 작업하였습니다.

컴포넌트로 개발하고 클릭 이벤트 발생 시 불러오도록 하였습니다.

# 3. 업체명
```
nameInput.addEventListener("input", function () {
  this.value = removeEmojis(this.value);
});
```
글자수 제한은 input에 maxlength="12" 와 같이 입력하였습니다 
removeEmojis에는 특수문자 숫자 한글 영어 로만 입력이 가능하도록 작업하였습니다

# 4. 업체명
input에 type을 number로 지정하여 숫자 외 다른 값 입력 시 자동삭제 되도록 하였습니다

# 5. 업체명
input에 type을 radio를 설정하여 제공해주신 코딩테스트 이미지와 동일하게 개발하였습니다.

# 5-1. 업체명
```
freeTimeInput.addEventListener("input", function () {
  this.value = removeEmojis(this.value);
});
```
특수 문자와 관련된 부분은 removeEmojis를 사용하였습니다.
```
function handleRadioChange() {
  if (this.id === "free") {
    freeTimeInput.classList.remove("hidden");
  }
}
```
직접 입력 체크시 필드 출력은 hidden에 display none을 없애도록 하여 화면에 출력 될 수 있도록 하였습니다

# 6. 문의내용

문의 내용은 maxlength를 사용하여 글자수를 제한하였습니다

```
function handleTextareaInput(textarea) {
  const charCountSpan = textarea.nextElementSibling.querySelector("span");
  const charCount = textarea.value.length;
  charCountSpan.textContent = charCount;
  textarea.value = removeEmojis(textarea.value);
}
```
```
textareas.forEach((textarea) => {
  textarea.addEventListener("input", function () {
    handleTextareaInput(textarea);
  });
});
```

removeEmojis를 사용하여 이모지 사용을 제한하고 제공해주신 이미지에 글자수를 세아리는 부분이 있어 span을 사용하고 length를 사용하여 입력한 값에 따라 그 길이만큼 숫자가 변하도록 하였습니다.

# 7.경로
중복 선택이 가능하도록 개발하였습니다

```
textareas.forEach((textarea) => {
  textarea.addEventListener("input", function () {
    handleTextareaInput(textarea);
  });
});
```
textarea 태그를 사용하였고 위와 같은 컴포넌트를 사용하였습니다.

# 8.약관 동의
기본값이 checked로 되있도록 하였습니다
