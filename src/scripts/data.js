// This file fetches the data from the JSON database file entries.json


const entriesUrl = "http://localhost:8088/entries"


const API = {
    getJournalEntries () {
        return fetch(entriesUrl)
            .then(response => response.json())
    }
}
// fetch(entriesUrl) // Fetch from the API
//     .then(fetchedEntries => fetchedEntries.json())  // Parse as JSON
//     .then(entries => {
//         renderJournalEntries(entries)
//     })