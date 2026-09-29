const name1 = document.getElementById('name');
const email = document.getElementById('email');
const branch = document.getElementById('branch');
const year = document.getElementById('year');
const studentList = document.getElementById('studentList');
const submit = document.getElementById('submit');

let editRow = null;
let students = JSON.parse(localStorage.getItem("students")) || [];


function display() {
    studentList.innerHTML="";

    students.forEach((student) => {

        const tableRow = document.createElement('tr');
       
        tableRow.dataset.id = student.id;

        const tableHeadName = document.createElement('th');
        const tableHeadEmail = document.createElement('th');
        const tableHeadBranch = document.createElement('th');
        const tableHeadYear = document.createElement('th');
        const tableHeadbutton = document.createElement('th');

        const edit = document.createElement('button');
        const del = document.createElement('button');


        tableHeadName.textContent = student.name1;
        tableHeadEmail.textContent = student.email;
        tableHeadBranch.textContent = student.branch;
        tableHeadYear.textContent = student.year;

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


        // del.addEventListener('click', (e) => {
        //     const idx = arr.findIndex(
        //         (task) => task.id == newList.dataset.id
        //     );

        //     if (idx !== -1) {
        //         arr.splice(idx, 1);
        //     }

        //     tableRow.remove();
        // });


        del.addEventListener('click', (e) => {

            e.stopPropagation();

            const idx = students.findIndex(
                (student) => student.id == tableRow.dataset.id
            );

            if (idx !== -1) {
                students.splice(idx, 1);
            }

            localStorage.setItem(
                "students",
                JSON.stringify(students)
            );

            tableRow.remove();
        });


        edit.addEventListener('click', (e) => {

            name1.value = student.name1;
            email.value = student.email;
            branch.value = student.branch;
            year.value = student.year;

            editRow = tableRow;

            console.log(editRow);
        });

    });
}


submit.addEventListener('click', (event) => {

    event.preventDefault();

    


    if (
        name1.value.trim() === "" ||
        email.value.trim() === "" ||
        branch.value.trim() === "" ||
        year.value.trim() === ""
    ) {
        return;
    }


    if (editRow !== null) {

        const idx = students.findIndex(
            (student) => student.id == editRow.dataset.id
        );

        if (idx !== -1) {
    students[idx].name1 = name1.value;
    students[idx].email = email.value;
    students[idx].branch = branch.value;
    students[idx].year = year.value;
}

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        display();

        editRow = null;

        return;
    }


    let student = {
        id: Date.now(),
        name1: name1.value,
        email: email.value,
        branch: branch.value,
        year: year.value
    };


    students.push(student);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    display();


    name1.value = "";
    email.value = "";
    branch.value = "";
    year.value = "";

});


display();