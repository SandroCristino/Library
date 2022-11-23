
let myLibrary = [];


var table = document.getElementById('table');
const addBtn = document.getElementById('addBtn');
const library_form = document.getElementById('library_form');
const body = document.getElementById('body');
const test = document.getElementById('test');
const library_btn = document.getElementById('library_btn');
const books_info = document.getElementById('books_info');
const pages_info = document.getElementById('pages_info');
const read_info = document.getElementById('read_info');
const unread_info = document.getElementById('unread_info')

let change_mode = false;
let modify_btn_info;

function Book(title, author, pages, published, acquired, status, id) {
  this.title = title
  this.author = author
  this.pages = pages
  this.published = published
  this.acquired = acquired
  this.status = status  
}

library_btn.addEventListener('click', () => {
  library_form.setAttribute('style', 'visibility: visible');
  body.setAttribute('style', 'visibility: hidden');
})

function addBookToLibrary(title, author, pages, published, acquired, status) {
  const book = new Book(title, author, pages, published, acquired, status) 
  myLibrary.push(book);
}


addBtn.addEventListener('click', () => {

  if (library_form.checkValidity() == true) {

    // Set page default design
    library_form.setAttribute('style', 'visibility: hidden');
    body.setAttribute('style', 'visibility: visible');

    if (change_mode == false) {

      // Add book to array
      addBookToLibrary(
        library_form.elements['title'].value,
        library_form.elements['author'].value,
        library_form.elements['pages'].value,
        library_form.elements['published'].value,
        library_form.elements['acquired'].value,
        library_form.elements['status'].value,
      )
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
    update_library();
    
  }
})


function update_library() {

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
        update_library();
      })
    

    // Add button modify 
    let modify_btn = document.createElement("button");
    modify_btn.className = 'btn btn-primary ms-2'
    modify_btn.innerHTML = "Modify";
    modify_btn_info = myLibrary[i].title;
    cell7.appendChild(modify_btn);

    modify_btn.addEventListener('click', () => {
      change_mode = true;
      library_form.setAttribute('style', 'visibility: visible');
      body.setAttribute('style', 'visibility: hidden');
    })


  }
  update_info();
}

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
