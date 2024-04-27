function User(name, birthday){
    this.name = name;
    this.birthday = birthday;

    Object.defineProperty(this, "age",{
        get(){
            let todayYear = new Date().getFullYear();
            return todayYear - this.birthday.getFullYear();
        },
        set(value){
            let now = new Date();
            let yearOfBirth = now.getFullYear() - value;
            this.birthday = new Date(yearOfBirth, now.getMonth(), now.getDate())
        }
    });
}

let dome = new User ("Dome", new Date(1985, 9, 3));

console.log( dome.birthday);
console.log( dome.age );