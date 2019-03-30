class Bio{
  constructor(name, age){
    this.name = name;
    this.age = age;
  }

  aboutMe(){
    console.log(`Hi, my name is ${this.name} and i'm ${this.age} years old!`);
  }
}

export default Bio;