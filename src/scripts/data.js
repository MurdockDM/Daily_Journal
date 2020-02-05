


const localAPIManager = {
    getJournalEntries() {
        const baseURL = "http://localhost:8088"
        return fetch(`${baseURL}/entries`)
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
    
}



export default localAPIManager