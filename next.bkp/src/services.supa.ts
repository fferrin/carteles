
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eihhytoogvkxmwvhjego.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpaGh5dG9vZ3ZreG13dmhqZWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ5NjI3MzUsImV4cCI6MTk5MDUzODczNX0.Uc26yAZzKU8uCAwbXISq-4ImwMoa1Or1e3-dNlrRCDk"
const supabase = createClient(supabaseUrl, supabaseKey)

interface Location {
    lat: number
    lon: number
}

async function getBoards() {
    const { data, error } = await supabase.from('boards').select();
    if (error) console.error("Error getting boards:", error);
    return data;
}

async function getBoardById(boardId: string) {
    const { data, error } = await supabase.from('boards').select().eq('id', boardId);
    if (error) console.error(`Error getting board with ID ${boardId}:`, error);
    return data;
}

async function getBoardsCloseTo(location: Location) {
    const loc = {
        lat: 40.807313,
        long: -73.946713,
    }
    const { data, error } = await supabase.rpc('nearby_boards', loc).limit(20);
    if (error) console.error(`Error getting boards close to ${loc}:`, error);
    console.log("DATITA:", data);
    return data;
}

async function getCompanies() {
    const { data, error } = await supabase.from('companies').select();
    if (error) console.error("Error getting companies:", error);
    return data;
}

async function createBoard(companyId: string, location: Location) {
    const loc = {
        lat: 40.807313,
        long: -73.946713,
    }
    const { error } = await supabase
        .from('boards')
        .insert({ companyId, location: `POINT(${loc.long} ${loc.lat})` })
    console.log(error);
}

async function createCompany(companyName: string) {
    const { error } = await supabase
        .from('companies')
        .insert({ name: companyName })
    console.log(error);
}

export default getBoards();