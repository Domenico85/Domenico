let newEntryForm = true
const storedEntries = JSON.parse(localStorage.getItem('entries'));
let entries = storedEntries || [];

function saveEntries() {
    localStorage.setItem('entries', JSON.stringify(entries));
}

function loadEntries() {
    const storedEntries = JSON.parse(localStorage.getItem('entries'));
    console.log(storedEntries);
    if (storedEntries) {
        entries.length = 0;
        storedEntries.forEach(dayData => {
            const day = new MyDay(dayData);
            entries.push(day);
            addNewDaytoDOM(day);
        })
    }
}

window.addEventListener('load', loadEntries);

function MyDay(day) {
    this.id = Math.floor(Math.random() * 1000);
    this.title = day.title;
    this.description = day.description;
    this.date = day.date;
    this.priority = day.priority;
    this.notes = day.notes;
    this.checklist = day.checklist;
    this.info = function () {
        return `Title: ${this.title}
        \nDescription: ${this.description}
        \ndueDate: ${this.date}
        \nPriority: ${this.priority}
        \nNotes: ${this.notes}
        \nCheckList: ${this.checklist}`;
    }
}
const form = document.querySelector('form');
form.reset();
form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (form.checkValidity()) {
        const data = new FormData(form);
        const dayEntry = {};

        for (const [name, value] of data) {
            dayEntry[name] = value
        }

        const day = new MyDay(dayEntry);

        addNewDaytoDOM(day);
        entries.push(day);
        saveEntries();
        form.reset();

    }else {

        alert("Please fill out the required fields.")
    }

});

function addNewDaytoDOM(day) {
    const newDayBox = document.createElement('div');
    newDayBox.classList.add('day');
    const pTag = document.createElement('p');
    pTag.innerText = day.title
    newDayBox.appendChild(pTag)
    const optionsDiv = document.createElement('div');;
    optionsDiv.classList.add('options');
    newDayBox.appendChild(optionsDiv);
    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('details');
    detailsBtn.innerHTML = 'Details';
    detailsBtn.addEventListener('click', function () {
        showExampleDetails();
        createDayDetails(day);
        overlay.style.zIndex = '1';
    });
    optionsDiv.appendChild(detailsBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = '<img src=\"img/edit.svg"\ width=\"20px\""alt=\"edit\">';
    editBtn.addEventListener('click', editDayOnDOM(day))
    optionsDiv.appendChild(editBtn)

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<img src=\"img/delete.svg"\ width=\"20px\""alt=\"edit\">';
    deleteBtn.addEventListener('click', function () {

        entries = entries.filter(entry => entry.id !== day.id);

        saveEntries();


        newDayBox.remove();
    });
    optionsDiv.appendChild(deleteBtn)


    document.querySelector('#to-do-list').appendChild(newDayBox)

}
function createDayDetails(day) {
    const dayDetails = document.createElement('div');
    dayDetails.classList.add('details-example', 'active');


    const exitButton = document.createElement('h2');
    exitButton.id = 'exit';
    exitButton.innerText = 'X';
    exitButton.addEventListener('click', function () {
        dayDetails.classList.remove('active');
        overlay.style.zIndex = '-1';
    });
    dayDetails.appendChild(exitButton);


    const title = document.createElement('h1');
    title.innerHTML = `<span>${day.title}</span>`;
    dayDetails.appendChild(title);
    const description = document.createElement('h2');
    description.innerHTML = `<span>Description<span>: ${day.description}`
    dayDetails.appendChild(description);
    const dueDate = document.createElement('h2');
    dueDate.innerHTML = `DueDate: ${day.date}`;
    dayDetails.appendChild(dueDate);
    const priority = document.createElement('h2');
    priority.innerHTML = `Priority:  ${day.priority}`
    dayDetails.appendChild(priority);
    const notes = document.createElement('h2');
    notes.innerHTML = `Notes: ${day.notes}`
    dayDetails.appendChild(notes);
    const checklist = document.createElement('h2');
    checklist.innerHTML = `Checklist: ${day.checklist}`;
    dayDetails.appendChild(checklist);



    document.querySelector('#to-do-list').appendChild(dayDetails);
}

function editDayOnDOM(day) {
    const form = document.querySelector('form');
    form.title.value = day.title;
    form.description.value = day.description;
    form.date.value = day.date;
    form.priority.value = day.priority;
    form.notes.value = day.notes;

}


let checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        let name = this.name;
        let otherCheckboxes = document.querySelectorAll('input[name="' + name + '"]');

        otherCheckboxes.forEach(function (otherCheckbox) {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        });
    });
});

function formAppear() {
    let btnFormAppear = document.querySelector(".new-task button");
    btnFormAppear.addEventListener('click', function () {
        let form = document.querySelector('form');
        form.style.display = 'block'
    })
}

formAppear();

function formDisappear() {
    let btnFormDisappear = document.querySelector("form button");
    btnFormDisappear.addEventListener('click', function () {
        let form = document.querySelector('form');
        form.style.display = 'none'
    })
}

formDisappear();


function showExampleDetails() {
    const btnDetails = document.querySelector(".details");
    const showOverlay = document.querySelector('.overlay');
    btnDetails.addEventListener('click', function () {
        const example = document.querySelector('.details-example');
        example.classList.add('active');
        showOverlay.style.zIndex = '1';
    })
}

showExampleDetails();

function closeDetails() {
    console.log('close')
    const example = document.querySelector('.details-example');
    example.classList.remove('active');
    overlay.style.zIndex = '-1'
}
const xButton = document.querySelector('#exit')
xButton.addEventListener('click', closeDetails)

const overlay = document.querySelector('.overlay')

overlay.addEventListener('click', closeDetails)

