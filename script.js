

let myLibrary = [];


var table = document.getElementById('table');
const addBtn = document.getElementById('addBtn');
const library_form = document.getElementById('library_form');
const body = document.getElementById('body');
const library_btn = document.getElementById('library_btn');
const books_info = document.getElementById('books_info');
const pages_info = document.getElementById('pages_info');
const read_info = document.getElementById('read_info');
const unread_info = document.getElementById('unread_info')
const register_btn = document.getElementById('register_btn');
const bodyCenter = document.getElementById('bodyCenter');

let change_mode = false;
let modify_btn_info;
let book;

class Book {
  constructor(title, author, pages, published, acquired, status, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.published = published;
    this.acquired = acquired;
    this.status = status;
  }

  addBookToLibrary() {
    const book = new Book(this.title, this.author, this.pages, this.published, this.acquired, this.status) 
    myLibrary.push(book);
  }

  update_library() {

   function update_info () {

      let total   = 0;
      let pages   = 0;
      let read    = 0;
      let unread  = 0;
  
      // Loop through Books
      myLibrary.forEach(book => {
  
              // Total Books
              total++;
  
              // Total Pages
              pages += parseFloat(book.pages);
  
              if (book.status) {
                  // Read Books
                  read++;
              } else {
                  // Unread Books
                  unread++;
              }
      });
  
      books_info.innerText = total;
      pages_info.innerText = pages;
      read_info.innerText = read;
      unread_info.innerText = unread;
  
    }

    let rowCount = table.rows.length;
      for (var i = rowCount - 1; i > 1; i--) {
          table.deleteRow(i);
      }
  
    for (let i = 0; i <= myLibrary.length; i++) {
      update_info();
  
      table.insertRow(1);
      var row = table.insertRow(1);
  
      
      //attributes add on data
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var cell5 = row.insertCell(5);
      var cell6 = row.insertCell(6);
      var cell7 = row.insertCell(7);
  
      // Fill cells with data
      if (myLibrary.length - i > 0 ) {
        cell0.innerHTML = myLibrary.length - i;
      }
      cell1.innerHTML = myLibrary[i].title;
      cell2.innerHTML = myLibrary[i].author;
      cell3.innerHTML = myLibrary[i].pages;
      cell4.innerHTML = myLibrary[i].published;
      cell5.innerHTML = myLibrary[i].acquired;
      cell6.innerHTML = myLibrary[i].status;
  
      // Add button delete 
      let delete_btn = document.createElement("button");
      delete_btn.className = 'btn btn-primary'
      delete_btn.innerHTML = "Delete";
      delete_btn.value = myLibrary[i].title;
      cell7.appendChild(delete_btn)
  
      // Function to 
      delete_btn.addEventListener('click', () => {
        const removeIndex = myLibrary.findIndex( item => item.title == delete_btn.value);
  
          
          // remove object
          myLibrary.splice( removeIndex, 1 );
          book.update_library();
        })
      
  
      // Add button modify 
      let modify_btn = document.createElement("button");
      modify_btn.className = 'btn btn-primary ms-2'
      modify_btn.innerHTML = "Modify";
      modify_btn_info = myLibrary[i].title;
      cell7.appendChild(modify_btn);
  
      modify_btn.addEventListener('click', () => {
        change_mode = true;
        library_form.setAttribute('style', 'display:block');
        bodyCenter.setAttribute('style', 'visibility: hidden');
      })
  
  
    }
    update_info();
  }
}

library_btn.addEventListener('click', () => {
  library_form.setAttribute('style', 'display:block');
  bodyCenter.setAttribute('style', 'visibility: hidden');
})

addBtn.addEventListener('click', () => {

  if (library_form.checkValidity() == true) {

    // Set page default design
    library_form.setAttribute('style', 'visibility: hidden');
    body.setAttribute('style', 'visibility: visible');

    if (change_mode == false) {

      // Add book to array
      // Book.addBookToLibrary(
      //   library_form.elements['title'].value,
      //   library_form.elements['author'].value,
      //   library_form.elements['pages'].value,
      //   library_form.elements['published'].value,
      //   library_form.elements['acquired'].value,
      //   library_form.elements['status'].value,
      // )
      book = new Book(
        library_form.elements['title'].value,
        library_form.elements['author'].value,
        library_form.elements['pages'].value,
        library_form.elements['published'].value,
        library_form.elements['acquired'].value,
        library_form.elements['status'].value,
      // )
      )

      book.addBookToLibrary()
    }

    if (change_mode == true) {

      // Change mode > add this to object
      const modifyIndex = myLibrary.findIndex( item => item.title == modify_btn_info);



      // NEED THE RIGHT INDEX
      myLibrary[modifyIndex].title = library_form.elements['title'].value;
      myLibrary[modifyIndex].author = library_form.elements['author'].value;
      myLibrary[modifyIndex].pages = library_form.elements['pages'].value;
      myLibrary[modifyIndex].published = library_form.elements['published'].value;
      myLibrary[modifyIndex].acquired = library_form.elements['acquired'].value;
      myLibrary[modifyIndex].status = library_form.elements['status'].value;


    }
    library_form.elements['title'].value = null;
    library_form.elements['author'].value = null;
    library_form.elements['pages'].value = null;
    library_form.elements['published'].value = null;
    library_form.elements['acquired'].value = null;

    change_mode = false;
    book.update_library();
    
  }
});

//Additional register form
const mail = document.getElementById('mail');
const mailError = mail.nextElementSibling;
const password = document.getElementById('password');
const passwordError = password.nextElementSibling;
const password_confirmation = document.getElementById('passwordConfirmation');
const password_confirmationError = password_confirmation.nextElementSibling;
const form = document.getElementById('register_form');

register_btn.addEventListener('click', () => {
  register_form.setAttribute('style', 'display:block');
  bodyCenter.setAttribute('style', 'display: none');
}); 

//Form validation
const mailRegExp =
  /^[A-Za-z0-9]+[@][A-Za-z0-9]+.com$/;

const passwordRegExp = 
  /^[A-Za-z0-9]{10,15}$/;

mail.addEventListener('input', () => {
  if (mailRegExp.test(mail.value)) {
    mail.className = 'valid';
    mailError.textContent = '';
    mailError.className = 'error'
  } else {
    mail.className = 'invalid';
    mailError.textContent = 'Invalid form'
  }
});

password.addEventListener('input', () => {
  if (passwordRegExp.test(password.value)) {
    password.className = 'valid';
    passwordError.textContent = '';
    passwordError.className = 'error'
  } else {
    password.className = 'invalid';
    passwordError.textContent = 'Invalid form'
  }
})

password_confirmation.addEventListener('input', () => {
  if (password.value == password_confirmation.value) {
    password_confirmation.className = 'valid';
    password_confirmationError.textContent = '';
    password_confirmationError.className = 'error'
  } else {
    password_confirmation.className = 'invalid';
    password_confirmationError.textContent = 'Password not matching'
  }
});

form.addEventListener('submit', (event) => {
  if (!mailRegExp.test(mail.value) || passwordRegExp.test(password.value) || password.value == password_confirmation.value) {
    event.preventDefault();
  }

})




