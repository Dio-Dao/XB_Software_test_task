const obj = {
  tagList: [],
  readOnly: '',

  //----------- getter to get the list of tags

  get tags() {
    return this.tagList
  },

  //----------- setter to set the new list of tags

  set tags(value) {
    this.tagList = value
    this.out(this.tagList)
    this.addtoLocalStorage()
  },
  //----------- method for adding one tag

  addNewtag: function () {
    const buttonAdd = document.querySelector(".btn-add");
    buttonAdd.onclick = () => {
      if (!this.readOnly) {
        let tag = document.querySelector(".tag_form-input");
        if (tag.innerText) {
          let temp = {
            tag: tag.innerText,
          };
          this.tagList.push(temp)
          this.out(this.tagList)
          this.addtoLocalStorage()
          tag.innerText = ''
        }
      }
    }
  },
  out: function (x) {
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
  },

  //----------- method for adding the list of tags to LocalStorage

  addtoLocalStorage: function () {
    localStorage.setItem("tag", JSON.stringify(this.tagList));
    localStorage.setItem("readonly", JSON.stringify(this.readOnly));
  },

  //----------- method for readonly mode

  disabled: function () {
    const readOnlyCheckBox = document.querySelector(".readonly_checkbox")
    readOnlyCheckBox.onchange = () => {
      this.readOnly = !this.readOnly
      this.addtoLocalStorage()
    }
  },

  //----------- method for deleting one tag

  delete_btn: function () {
    document.querySelector('.out').onclick = (e) => {
      if (!this.readOnly) {
        if (e.target.className != 'small_btn tag_delete') return
        let tag = e.target.closest('.tag')
        if (confirm("Are you shure?")) {
          this.tagList.splice(tag.getAttribute('data-value'), 1)
          this.addtoLocalStorage()
          this.out(this.tagList)
        }
      }
    }
  },

  //----------- method for deleting all tags

  newList: function () {
    const buttonReset = document.querySelector(".btn-reset");
    buttonReset.onclick = () => {
      if (!this.readOnly) {
        if (confirm("Are you shure? Current list will be deleted.")) {
          this.tagList = [];
          localStorage.clear();
          this.out(this.tagList)
        }
      }
    }
  },

  //----------- method for reading from LocalStorage

  load: function () {
    const readOnlyCheckBox = document.querySelector(".readonly_checkbox")
    if (localStorage.getItem("readonly")) {
      obj.readOnly = JSON.parse(localStorage.getItem("readonly"));
      readOnlyCheckBox.checked = obj.readOnly
    }
    else {
      obj.readOnly = false
      readOnlyCheckBox.checked = obj.readOnly
    }
    if (localStorage.getItem("tag")) {
      obj.tagList = JSON.parse(localStorage.getItem("tag"));
      obj.out(obj.tagList);
    }
    this.addNewtag();
    this.delete_btn();
    this.disabled();
    this.newList();
  }
}
obj.load()
