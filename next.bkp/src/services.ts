import { generateRandomNumber } from "@/utils";

interface Location {
    lat: number
    lng: number
}

const dbHost = "http://localhost:3001"

const dbClient = {
    getBoards: () => fetch(`${dbHost}/boards/`)
      .then(boards => boards.json())
      .then(boards => boards.map(b => ({...b, distance: generateRandomNumber(0.0, 100.0)}))),
    createBoard: (name: string, location: Location) => fetch( `${dbHost}/boards/`, {
        // method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, location})
    }),
    createCompany: (name: string) => fetch( `${dbHost}/companies/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    }),
    getLoggedUser: () => fetch(`${dbHost}/users/me`)
      .then(user => user.json())
}
const getBoards = () => dbClient.getBoards()
const createBoard = (name: string, location: Location) => dbClient.createBoard(name, location)
const filterByDistance = (distance: number) => {
    return dbClient.getBoards()
      .then(boards => boards.filter(b => b.distance <= distance))
}
const createCompany = (name: string) => dbClient.createCompany(name)
const getLoggedUser = () => dbClient.getLoggedUser()

// async function getBoardById(boardId: string) {
//     const { data, error } = await supabase.from('boards').select().eq('id', boardId);
//     if (error) console.error(`Error getting board with ID ${boardId}:`, error);
//     return data;
// }
//
// async function getBoardsCloseTo(location: Location) {
//     const loc = {
//         lat: 40.807313,
//         long: -73.946713,
//     }
//     const { data, error } = await supabase.rpc('nearby_boards', loc).limit(20);
//     if (error) console.error(`Error getting boards close to ${loc}:`, error);
//     console.log("DATITA:", data);
//     return data;
// }
//
// async function getCompanies() {
//     const { data, error } = await supabase.from('companies').select();
//     if (error) console.error("Error getting companies:", error);
//     return data;
// }
//
// async function createBoard(companyId: string, location: Location) {
//     const loc = {
//         lat: 40.807313,
//         long: -73.946713,
//     }
//     const { error } = await supabase
//         .from('boards')
//         .insert({ companyId, location: `POINT(${loc.long} ${loc.lat})` })
//     console.log(error);
// }
//
// async function createCompany(companyName: string) {
//     const { error } = await supabase
//         .from('companies')
//         .insert({ name: companyName })
//     console.log(error);
// }

export  {
    getBoards,
    createBoard,
    filterByDistance,
    createCompany,
    getLoggedUser,
};