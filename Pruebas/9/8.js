const cat = {
    name : 'Bertie',
    breed : 'Cymric',
    color : 'white',
    greeting: function() {  
    console.log(`Hello, said ${this.name} the ${this.breed}.`);
    }
  }
  
  cat.greeting();
  
  const cat2 = {
    name : 'Topollo',
    breed : 'Cymric',
    color : 'black',
    greeting: function() {  
    console.log(`Hello, said ${this.name} the ${this.breed}.`);
    }
  }

  cat2.greeting();