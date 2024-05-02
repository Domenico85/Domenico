let selectedToDoId;
const storedEntries = JSON.parse(localStorage.getItem('entries'));
let entries = storedEntries || [];
const form = document.querySelector('form');

function saveEntries() {
    localStorage.setItem('entries', JSON.stringify(entries));
}

function loadEntries() {
    document.querySelectorAll('.day:not(.example)').forEach(e =>{ console.log(e); e.remove()} )
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

function addNewDaytoDOM(day) {
    //create box of new Day
    const wrapper = document.createElement('div');
    wrapper.id = "day-" + day.id
    wrapper.id = id;
    const newDayBox = document.createElement('div');
    newDayBox.classList.add('day');
    const pTag = document.createElement('p');
    pTag.innerText = day.title
    newDayBox.appendChild(pTag)
    const optionsDiv = document.createElement('div');;
    optionsDiv.classList.add('options');
    newDayBox.appendChild(optionsDiv);
   
    //create button details
    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('details-btn');
    detailsBtn.setAttribute('data-id', id);
    detailsBtn.innerHTML = 'Details';
    detailsBtn.addEventListener('click', function () {
        const id = wrapper.id;
        const dayId = id.split('-')[1];
        const day = getDayFromId(dayId);
        console.log(day)
        showDetails();
        overlay.style.zIndex = '1';
    });
    optionsDiv.appendChild(detailsBtn);
   
    function getDayFromId(dayId) {
        return entries.find(day => day.id === parseInt(dayId));
    }


    //create edit button & functions
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
    
    //create delete button & function
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<img src=\"img/delete.svg"\ width=\"20px\""alt=\"edit\">';
    deleteBtn.addEventListener('click', function () {
        
        entries = entries.filter(entry => entry.id !== day.id);
        
        saveEntries();
        
        
        newDayBox.remove();
    });
    optionsDiv.appendChild(deleteBtn)

    //final functions
    const detailsDiv = createDayDetails(day);
    wrapper.appendChild(newDayBox)
    wrapper.appendChild(detailsDiv)
    
    document.querySelector('#to-do-list').appendChild(wrapper)
    
}
function createDayDetails(day) {
    const dayDetails = document.createElement('div');
    dayDetails.classList.add('details-day');

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

    return dayDetails
    // document.querySelector('#to-do-list').appendChild(dayDetails);
}

function showDetails(){
    const btnDetails = document.querySelector(".details-btn");
    console.log('Showing deatils', btnDetails)
    const showOverlay = document.querySelector('.overlay');
    btnDetails.addEventListener('click', function(){
        const details = document.querySelector('.details-day');
        console.log(details)
        details.classList.add('active');
        showOverlay.style.zIndex = '1';
    });
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


let btnFormAppear = document.querySelector(".new-task button");
btnFormAppear.addEventListener('click', function () {
    selectedToDoId = null
    form.style.display = 'block'
})

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


