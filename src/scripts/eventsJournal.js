import localAPIManager from "./data.js"
import renderJournalEntries from "./entriesDOM.js";


const updateJournalFields = journalEntryID => {

    const hiddenEntryID = document.querySelector("#hiddenJournalEntryId");
    const journalEntryDate = document.body.querySelector("#journalDate");
    const journalEntryConcepts = document.body.querySelector("#conceptsCovered");
    const journalEntryText = document.body.querySelector("#journalEntry");
    const journalEntryMoodChoice = document.body.querySelector("#moodChoice");



    localAPIManager.pullJournalEntryForEdits(journalEntryID)
        .then(journalEntry => {
            console.log(journalEntry)
            hiddenEntryID.value = journalEntry.id
            journalEntryDate.value = journalEntry.dateEntered
            journalEntryConcepts.value = journalEntry.concepts
            journalEntryText.value = journalEntry.personalEntry
            journalEntryMoodChoice.value = journalEntry.mood
        });
}







const eventListenerEntryHandler = {
    submitBtnAddEventListener() {
        const submitJournalEntryBtn = document.getElementById("journalSubmitBtn");

        submitJournalEntryBtn.addEventListener("click", () => {
            const journalEntryDate = document.body.querySelector("#journalDate").value;
            const journalEntryConcepts = document.body.querySelector("#conceptsCovered").value;
            const journalEntryText = document.body.querySelector("#journalEntry").value;
            const journalEntryMoodChoice = document.body.querySelector("#moodChoice").value

            if (journalEntryDate == false || journalEntryConcepts == false || journalEntryText == false) {
                alert("Please make sure all fields are completed");
            } else {
                const newJournalEntry = {
                    dateEntered: journalEntryDate,
                    concepts: journalEntryConcepts,
                    personalEntry: journalEntryText,
                    mood: journalEntryMoodChoice
                }
                localAPIManager.saveJournalEntry(newJournalEntry)
                    .then(() => { localAPIManager.getJournalEntries(renderJournalEntries) })

            }

        })
    },
    radioButtonAddEventListener() {
        const radioButtons = document.getElementsByName("moodFilter");
        radioButtons.forEach(el => {
            el.addEventListener("click", (event) => {
                const moodFilterSelected = document.getElementById(`${event.target.id}`).id

                localAPIManager.getJournalEntriesbyMood(moodFilterSelected)
                    .then(renderJournalEntries)
            })
        })
    },
    journalEntryButtonsAddEventListener() {
        const entryContainer = document.querySelector(".entryLog")
        entryContainer.addEventListener("click", () => {
            if (event.target.id.startsWith("deleteEntry-")) {
                const entryToDelete = event.target.id.split("-")[1]

                localAPIManager.deleteJournalEntry(entryToDelete)
                    .then(localAPIManager.getJournalEntries)
                    .then(renderJournalEntries)
            } else if (event.target.id.startsWith("editEntry-")) {
                const entryToEdit = event.target.id.split("-")[1]

                updateJournalFields(entryToEdit);
            }
        })
    }
}

export default eventListenerEntryHandler

