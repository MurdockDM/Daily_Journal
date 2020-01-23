

const makeJournalEntryComponent = (journalEntry) => {
    // Create your own HTML structure for a journal entry
    return `<section class="eachEntry offset__right">
                <h1 class="font__bold large__font">${journalEntry.concepts}</h1>
                <article>${journalEntry.personalEntry}</article>
                <article>${journalEntry.dateEntered}</article>
            </section>`
}



const renderJournalEntries = (allEntries) => {
    const entryContainer = document.querySelector(".entryLog"); 
    allEntries.forEach(entry => {  
    entryContainer.innerHTML += makeJournalEntryComponent(entry);
    })
}

const entriesUrl = "http://localhost:8088/entries"

fetch(entriesUrl) // Fetch from the API
    .then(fetchedEntries => fetchedEntries.json())  // Parse as JSON
    .then(entries => {
        renderJournalEntries(entries)
    })
    