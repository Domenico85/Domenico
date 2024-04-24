function Player(name,nickname,role){
    this.name = name;
    this.nickname = nickname;
    this.role = role;
    this.info = function(){
        return `Name: ${this.name}\nNickname: ${this.nickname}\nRole: ${this.role}`;
    }
}

const player1 = new Player ('Dome', 'Maalk', 'Mage');
const player2 = new Player ('Francesco', 'Ciccio', 'Warlock');

console.log(player1.info());
console.log(player2.info());