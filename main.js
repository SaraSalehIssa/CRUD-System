const courseName = document.querySelector('#courseName');
const courseCategory = document.querySelector('#courseCategory');
const coursePrice = document.querySelector('#coursePrice');
const courseDescription = document.querySelector('#courseDescription');
const courseCapacity = document.querySelector('#courseCapacity');
const inputs = document.querySelectorAll('.inputs');

const addBtn = document.querySelector('#click');
const clearBtn = document.querySelector('#resetbtn');
const deleteBtn = document.querySelector('#deleteBtn');

const search = document.querySelector('#search');

const nameError = document.querySelector('.nameError');

let courses = [];

if (localStorage.getItem('courses') != null) {
    courses = JSON.parse(localStorage.getItem('courses'));
    displayData();
}

courseName.addEventListener('keyup', function (e) {
    let pattern = /^[A-Z][a-z]{2,10}$/;
    if (pattern.test(courseName.value)) {
        if (courseName.classList.contains('is-invalid')) {
            courseName.classList.remove('is-invalid');
            courseName.classList.add('is-valid');
        }

        courseName.classList.add('is-valid');
        nameError.style.cssText = 'display:none';
        addBtn.removeAttribute('disabled');
    }
    else {
        if (courseName.classList.contains('is-valid')) {
            courseName.classList.remove('is-valid');
            courseName.classList.add('is-invalid');
        }

        courseName.classList.add('is-invalid');
        nameError.style.cssText = 'display:block';
        addBtn.setAttribute('disabled', 'disabled');
    }

});

addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    addCourse();
    clearInputs();
    displayData();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your course has been added!',
        showConfirmButton: false,
        timer: 3000
    });
});

clearBtn.addEventListener('click', clearInputs);

deleteBtn.addEventListener('click', function () {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            courses.length = 0;
            displayData();
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your courses has been deleted!',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
});

search.addEventListener('keyup', function (e) {
    let result = ``;
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].name.toLowerCase().includes(e.target.value.toLowerCase()))
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
    localStorage.setItem('courses', JSON.stringify(courses));
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
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1);
            localStorage.setItem('courses', JSON.stringify(courses));
            displayData();
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your courses has been deleted!',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
}