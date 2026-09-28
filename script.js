const name1 = document.getElementById('name');
const email = document.getElementById('email');
const branch = document.getElementById('branch');
const year = document.getElementById('year');
const studentList = document.getElementById('studentList');
const submit = document.getElementById('submit');

let editRow = null;
let students = JSON.parse(localStorage.getItem("students"))||[];


submit.addEventListener('click', (event) => {
    event.preventDefault();

    
    
    localStorage.setItem("students",JSON.stringify(students))
    if (name1.value === "" || email.value.trim() === "" || branch.value.trim() === "" || year.value.trim() === " ") {
        return;
    }

    if (editRow !== null) {
        editRow.children[0].textContent = name1.value;
        editRow.children[1].textContent = email.value;
        editRow.children[2].textContent = branch.value;
        editRow.children[3].textContent = year.value;

        editRow = null;


        return;
    }
    let student = {
        name: name1.value,
        email: email.value,
        branch: branch.value,
        year: year.value
    };
    students.push(student);



    const tableRow = document.createElement('tr');

    const tableHeadName = document.createElement('th');
    const tableHeadEmail = document.createElement('th');
    const tableHeadBranch = document.createElement('th');
    const tableHeadYear = document.createElement('th');
    const tableHeadbutton = document.createElement('th');

    const edit = document.createElement('button');
    const del = document.createElement('button');

    tableHeadName.textContent = name1.value;
    tableHeadEmail.textContent = email.value;
    tableHeadBranch.textContent = branch.value;
    tableHeadYear.textContent = year.value;
    edit.innerHTML = 'EDIT';
    del.innerHTML = 'DELETE';

    tableHeadbutton.appendChild(edit);
    tableHeadbutton.appendChild(del);

    tableRow.appendChild(tableHeadName);
    tableRow.appendChild(tableHeadEmail);
    tableRow.appendChild(tableHeadBranch);
    tableRow.appendChild(tableHeadYear);
    tableRow.appendChild(tableHeadbutton);

    studentList.appendChild(tableRow);
    console.log(studentList);

    del.addEventListener('click', (e) => {
        e.stopPropagation();

        const idx = arr.findIndex(
            (task) => task.id == newList.dataset.id
        );

        if (idx !== -1) {
            arr.splice(idx, 1);
        }

        tableRow.remove();
    })

    edit.addEventListener('click', (e) => {

        name1.value = tableHeadName.textContent;
        email.value = tableHeadEmail.textContent;
        branch.value = tableHeadBranch.textContent;
        year.value = tableHeadYear.textContent;

        editRow = tableRow;
        console.log(editRow)
    });
    
})