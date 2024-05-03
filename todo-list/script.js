// variables
let selectedToDoId;
const storedEntries = JSON.parse(localStorage.getItem('entries'));
let entries = storedEntries || [];
const form = document.querySelector('form');


// function to save data
function saveEntries() {
    localStorage.setItem('entries', JSON.stringify(entries));
}
//function to load the data
function loadEntries() {
    document.querySelectorAll('.day:not(.example)').forEach(e => { console.log(e); e.remove() })
    const storedEntries = JSON.parse(localStorage.getItem('entries'));

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

//array of objects
function MyDay(day) {
    if (day.id) {
        this.id = day.id
    } else {
        this.id = Math.floor(Math.random() * 1000);
    }
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
//submit of the Form
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const data = new FormData(form);
    const dayEntry = {}

    for (const [name, value] of data) {
        dayEntry[name] = value
    }


    if (!selectedToDoId) {
        const day = new MyDay(dayEntry)
        addNewDaytoDOM(day);
        entries.push(day);

    } else {
        dayEntry.id = selectedToDoId
        const updatedDay = new MyDay(dayEntry)

        entries = entries.map((entry) => {
            if (entry.id == selectedToDoId) {
                return updatedDay
            } else {
                return entry
            }
        })

    }

    saveEntries();
    form.reset();
    form.style.display = 'none'
    loadEntries()
})
//function create new div with users data
function addNewDaytoDOM(day) {
    //creation of box
    const wrapper = document.createElement('div');
    wrapper.id = "day-" + day.id
    const newDayBox = document.createElement('div');
    newDayBox.classList.add('day');
    const pTag = document.createElement('p');
    pTag.innerText = day.title
    newDayBox.appendChild(pTag)

    //div with all the buttons
    const optionsDiv = document.createElement('div');;
    optionsDiv.classList.add('options');
    newDayBox.appendChild(optionsDiv);

    //creation & function of the details button
    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('details-btn');
    detailsBtn.innerHTML = 'Details';
    detailsBtn.addEventListener('click', function () {
        showDetails(day.id)
    });
    optionsDiv.appendChild(detailsBtn);

    //creation & function of the edit button
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = '<img src=\"img/edit.svg"\ width=\"20px\""alt=\"edit\">';
    editBtn.addEventListener('click', function () {

        selectedToDoId = day.id
        form.title.value = day.title;
        form.description.value = day.description;
        form.date.value = day.date;
        form.priority.value = day.priority;
        form.notes.value = day.notes;
        form.checklist.value = day.checklist;
        form.style.display = 'block';
        newEntryForm = false;
    });
    optionsDiv.appendChild(editBtn)

    //creation & function of the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<img src=\"img/delete.svg"\ width=\"20px\""alt=\"edit\">';
    deleteBtn.addEventListener('click', function () {

        entries = entries.filter(entry => entry.id !== day.id);

        saveEntries();


        newDayBox.remove();
    });
    optionsDiv.appendChild(deleteBtn)

    //calling function
    const detailsDiv = createDayDetails(day);
    wrapper.appendChild(newDayBox)
    wrapper.appendChild(detailsDiv)

    document.querySelector('#to-do-list').appendChild(wrapper)

}

//Function to create all the data details
function createDayDetails(day) {

    //creation of the details box
    const dayDetails = document.createElement('div');
    dayDetails.classList.add(`details-day`);

    //close button of the details box
    const exitButton = document.createElement('h2');
    exitButton.id = 'exit';
    exitButton.innerText = 'X';
    exitButton.addEventListener('click', function () {
        dayDetails.classList.remove('active');
        overlay.style.zIndex = '-1';
    });
    dayDetails.appendChild(exitButton);

    //data in the details box
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


    dayDetails.id = `details-${day.id}`;
    return dayDetails
    // document.querySelector('#to-do-list').appendChild(dayDetails);
}


//Function to show the details after click of the details button
function showDetails(dayId) {
    const detailsDiv = document.querySelector(`#details-${dayId}`);
    const overlay = document.querySelector('.overlay');

    // Toggle the 'active' class to show or hide the details
    detailsDiv.classList.toggle('active');
    overlay.style.zIndex = detailsDiv.classList.contains('active') ? '1' : '-1';
}
    document.querySelector('.overlay').addEventListener('click', function () {

    document.querySelectorAll('.details-day.active').forEach(function (detail) {
        detail.classList.remove('active');
    });

    this.style.zIndex = '-1';
});




//change the radio input into checkbox for one choice only
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

//creation & function of the "Add New Task" button
let btnFormAppear = document.querySelector(".new-task button");
btnFormAppear.addEventListener('click', function () {
    selectedToDoId = null
    form.style.display = 'block'
})


//function to show ONLY the example

function showExampleDetails() {
    const btnDetails = document.querySelector(".details-btn-example");
    const showOverlay = document.querySelector('.overlay');
    btnDetails.addEventListener('click', function () {
        const example = document.querySelector('.details-example');
        example.classList.add('active');
        showOverlay.style.zIndex = '1';
    })
}

showExampleDetails();


function closeDetails() {
    const example = document.querySelector('.details-example');
    example.classList.remove('active');
    overlay.style.zIndex = '-1'
}
const xButton = document.querySelector('#exit')
xButton.addEventListener('click', closeDetails)

const overlay = document.querySelector('.overlay')

overlay.addEventListener('click', closeDetails)


