const makeJournalEntryComponent = (journalEntry) => {
    return `<section class="eachEntry offset__right">
                <h1 class="font__bold large__font">${journalEntry.concepts}</h1>
                <article>${journalEntry.personalEntry}</article>
                <article>${journalEntry.dateEntered}</article>
                <button id="deleteEntry-${journalEntry.id}">
                Delete Entry
                </button>
            </section>`
}


export default makeJournalEntryComponent
