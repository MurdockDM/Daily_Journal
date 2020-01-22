


/*
    Purpose: To create, and return, a string template that
    represents a single journal entry object as HTML

    Arguments: journalEntry (object)
*/
const makeJournalEntryComponent = (journalEntry) => {
    // Create your own HTML structure for a journal entry
    return `<section class="eachEntry offset__right">
                <h1 class="font__bold large__font">${journalEntry.concepts}</h1>
                <article>${journalEntry.personalEntry}</article>
                <article>${journalEntry.dateEntered}</article>
            </section>`
}


const entryContainer = document.querySelector(".entryLog")

/*
    Purpose: To render all journal entries to the DOM

    Arguments: entries (array of objects)
*/
const renderJournalEntries = (arrayOfObjects) => {
    for (let i = 0; i < arrayOfObjects.length; i++){
        entryContainer.innerHTML += makeJournalEntryComponent(arrayOfObjects[i])
    }
}

// Invoke the render function
renderJournalEntries(journalEntries);