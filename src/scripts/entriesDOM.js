import makeJournalEntryComponent from "./entryComponent.js"


const renderJournalEntries = (allEntries) => {
    const entryContainer = document.querySelector(".entryLog"); 
    allEntries.forEach(entry => {  
    entryContainer.innerHTML += makeJournalEntryComponent(entry);
    })
}


export default renderJournalEntries