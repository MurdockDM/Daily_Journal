const renderJournalEntries = (allEntries) => {
    const entryContainer = document.querySelector(".entryLog"); 
    allEntries.forEach(entry => {  
    entryContainer.innerHTML += makeJournalEntryComponent(entry);
    })
}