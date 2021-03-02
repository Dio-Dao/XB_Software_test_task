const tagList = () => {
  // ---------------------------- Readonly mode
  const readOnlyCheckBox = document.querySelector(".readonly_checkbox")
  let readOnly

  const disabled = () => {
    readOnly = !readOnly
    addtoLocalStorage()
  }
  readOnlyCheckBox.addEventListener('change', disabled)

  if (localStorage.getItem("readonly")) {
    readOnly = JSON.parse(localStorage.getItem("readonly"));
    readOnlyCheckBox.checked = readOnly
  }
  else {
    readOnly = false
    readOnlyCheckBox.checked = readOnly
  }

  // ---------------------------- Add new tag

  const buttonAdd = document.querySelector(".btn-add");
  let tagList = [];

  if (localStorage.getItem("tag")) {
    tagList = JSON.parse(localStorage.getItem("tag"));
    out(tagList);
  }

  buttonAdd.addEventListener("click", addtag);
  function addtag() {
    if (!readOnly) {
      let tag = document.querySelector(".tag_form-input");
      console.log(tag.value)
      if (tag.innerText) {
        let temp = {
          tag: tag.innerText,
        };
        tagList.push(temp);
        addtoLocalStorage();
        out(tagList);
        tag.innerText = ''
      }
    }
  }
  function out(x) {
    let out = document.querySelector(".out");
    out.innerHTML = "";
    for (let key in x) {
      out.insertAdjacentHTML(
        "afterbegin",
        `<div class='tag'  data-value="${key}">
       <div class="small_btn tag_delete"></div>
        <div class="tag_field" data-value="${key}">${x[key].tag}</div><div>`
      );
    }
  }
  // ---------------------------- Add to the LocalStorage

  function addtoLocalStorage() {
    localStorage.setItem("tag", JSON.stringify(tagList));
    localStorage.setItem("readonly", JSON.stringify(readOnly));
  }

  // ---------------------------- Delete button

  document.querySelector('.out').onclick = (e) => {
    if (!readOnly) {
      if (e.target.className != 'small_btn tag_delete') return
      let tag = e.target.closest('.tag')

      if (confirm("Are you shure?")) {
        tagList.splice(tag.getAttribute('data-value'), 1)
        addtoLocalStorage()
        out(tagList)
      }
    }
  }

  // ---------------------------- New list

  const buttonReset = document.querySelector(".btn-reset");
  buttonReset.onclick = () => {
    if (!readOnly) {
      if (confirm("Are you shure? Current list will be deleted.")) {
        tagList = [];
        localStorage.clear();
        out(tagList)
      }
    }
  }
}
tagList();