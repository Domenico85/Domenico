function MyDay(day){

    this.title = day.title;
    this.description = day.description;
    this.dueDate = day.dueDate;
    this.priority = day.priority;
    this.notes = day.notes;
    this.checklist = day.checklist;
    this.info = function () {
        return `Title: ${this.title}
        \nDescription: ${this.description}
        \ndueDate: ${this.dueDate}
        \nPriority: ${this.priority}
        \nNotes: ${this.notes}
        \nCheckList: ${this.checklist}`;
    }
}
const form= document.querySelector('form');
form.addEventListener('submit', function(event){
        event.preventDefault();
        
        const data = new FormData(form);
        const dayEntry = {}
        // console.log(data)
        for (const [name,value] of data) {
            dayEntry[name] = value
        }
        const day  = new MyDay(dayEntry)
        console.log(day)
        addNewDaytoDOM(day);

})
function addNewDaytoDOM(day){
    const newDayBox = document.createElement('div');
    newDayBox.classList.add('day');
    newDayBox.innerText = `${day.title} ${day.description}` 

    document.querySelector('#to-do-list').appendChild(newDayBox)
    
}


let checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        let name = this.name;
        let otherCheckboxes = document.querySelectorAll('input[name="' + name + '"]');
        
        otherCheckboxes.forEach(function(otherCheckbox) {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        });
    });
});


