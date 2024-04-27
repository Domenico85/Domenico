string =  "You are tsomla to the last test"

function spinWords(string) {
    let words = string.split(' ');

    for (let i = 0; i < words.length; i++) {
        if (words[i].length >= 5) {
            words[i] = words[i].split('').reverse().join('');
        }
    }

    return words.join(' ');
}


  console.log(spinWords(string));