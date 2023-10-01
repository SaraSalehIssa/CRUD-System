const courseName = document.querySelector('#courseName');
const courseCategory = document.querySelector('#courseCategory');
const coursePrice = document.querySelector('#coursePrice');
const courseDescription = document.querySelector('#courseDescription');
const courseCapacity = document.querySelector('#courseCapacity');
const inputs = document.querySelectorAll('.inputs');

const addBtn = document.querySelector('#click');
const clearBtn = document.querySelector('#resetbtn');
const deleteBtn = document.querySelector('#deleteBtn');

const courses = [];

addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    addCourse();
    clearInputs();
    displayData();
});

clearBtn.addEventListener('click', clearInputs);

deleteBtn.addEventListener('click', function () {
    courses.length = 0;
    displayData();
});

function addCourse() {
    let course = {
        name: courseName.value,
        category: courseCategory.value,
        price: coursePrice.value,
        description: courseDescription.value,
        capacity: courseCapacity.value,
    };
    courses.push(course);
}

function clearInputs() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function displayData() {
    let result = ``;
    for (let i = 0; i < courses.length; i++) {
        result += `
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].description}</td>
            <td>${courses[i].capacity}</td>
            <td><button class="btn btn-outline-info">update</button></td>
            <td><button class="btn btn-outline-danger" onclick='deleteCourse(${i})'>delete</button></td>
        </tr>
        `;
    }
    document.getElementById('data').innerHTML = result;
}

function deleteCourse(index) {
    courses.splice(index,1);
    displayData();
}