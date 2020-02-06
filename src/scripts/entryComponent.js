const makeJournalEntryComponent = (journalEntry) => {
    return `<section class="eachEntry offset__right">
                <h1 class="font__bold large__font">${journalEntry.concepts}</h1>
                <article>${journalEntry.personalEntry}</article>
                <article>${journalEntry.dateEntered}</article>
                <article id="button__container">    
                    <button id="deleteEntry-${journalEntry.id}">
                    Delete Entry
                    </button>
                    <button id="editEntry-${journalEntry.id}">
                    Update Entry
                    </button>
                </article>    
            </section>`
}


export default makeJournalEntryComponent
