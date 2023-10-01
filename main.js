const courseName = document.querySelector('#courseName');
const courseCategory = document.querySelector('#courseCategory');
const coursePrice = document.querySelector('#coursePrice');
const courseDescription = document.querySelector('#courseDescription');
const courseCapacity = document.querySelector('#courseCapacity');
const inputs = document.querySelectorAll('.inputs');

const addBtn = document.querySelector('#click');
const clearBtn = document.querySelector('#resetbtn');

const courses = [];

addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    addCourse();
    clearInputs();
    displayData();
});

clearBtn.addEventListener('click', clearInputs);

function addCourse() {
    let course = {
        name: courseName.value,
        category: courseCategory.value,
        price: coursePrice.value,
        description: courseDescription.value,
        capacity: courseCapacity.value,
    };
    courses.push(course);
    console.log(courses);
}

function clearInputs() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
    console.log('sfhbzfh');
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
        </tr>
        `;
    }
    document.getElementById('data').innerHTML = result;
}