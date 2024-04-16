let info = {
    name: 'RATM',
    nationality: 'USA',
    genre: 'Rock',
    members: 4,
    formed: 1990,
    split: false,
    albums: [
        { name: "Rage Against the Machine ", release: 1992 },
        { name: "Evil Empire", release: 1996 }
    ],

}
let bandInfo = `The band known ${info.name} based in ${info.nationality} is a very powerful ${info.genre} band.
 They have ${info.members} members and they start their career in ${info.formed} 
 with the first album ${info.albums[0].name} release in ${info.albums[0].release}  `

 console.log(bandInfo);