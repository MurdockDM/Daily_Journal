import makeJournalEntryComponent from "./entryComponent.js"


const renderJournalEntries = (allEntries) => {
    const entryContainer = document.querySelector(".entryLog"); 
    entryContainer.innerHTML = ""
    allEntries.forEach(entry => {  
    entryContainer.innerHTML += makeJournalEntryComponent(entry);
    })
}


export default renderJournalEntries