


const localAPIManager = {
    getJournalEntries() {
        const baseURL = "http://localhost:8088"
        return fetch(`${baseURL}/entries`)
            .then(response => response.json())
        },
    getJournalEntriesbyMood(moodFilteredFor) {
        const baseURL = "http://localhost:8088"
        return fetch(`${baseURL}/entries?mood=${moodFilteredFor}`)
            .then(response => response.json())
        },    
    saveJournalEntry(newJournalEntry) {
        return fetch("http://localhost:8088/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJournalEntry)
        });
    },
    deleteJournalEntry (entryID) {
        return fetch(`http://localhost:8088/entries/${entryID}`, {
            method: "DELETE"
        })
            .then(response => response.json())
    }
    
}



export default localAPIManager