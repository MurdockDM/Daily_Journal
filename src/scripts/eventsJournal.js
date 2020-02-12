import localAPIManager from "./data.js"
import renderJournalEntries from "./entriesDOM.js";
import makeJournalEntryComponent from "./entryComponent.js";


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



const emptyFormFields = () => {
    const hiddenEntryID = document.querySelector("#hiddenJournalEntryId");
    const journalEntryDate = document.body.querySelector("#journalDate");
    const journalEntryConcepts = document.body.querySelector("#conceptsCovered");
    const journalEntryText = document.body.querySelector("#journalEntry");
    const journalEntryMoodChoice = document.body.querySelector("#moodChoice");

    hiddenEntryID.value = "";
    journalEntryDate.value = "";
    journalEntryConcepts = "";
    journalEntryText = "";
    journalEntryMoodChoice = "";


}



const eventListenerEntryHandler = {
    submitBtnAddEventListener() {
        const submitJournalEntryBtn = document.getElementById("journalSubmitBtn");

        submitJournalEntryBtn.addEventListener("click", () => {
            const hiddenEntryID = document.querySelector("#hiddenJournalEntryId").value;
            const journalEntryDate = document.body.querySelector("#journalDate").value;
            const journalEntryConcepts = document.body.querySelector("#conceptsCovered").value;
            const journalEntryText = document.body.querySelector("#journalEntry").value;
            const journalEntryMoodChoice = document.body.querySelector("#moodChoice").value
            const searchInputFormValue = document.querySelector("#searchEntries").value

            const journalEntryChange = {
                dateEntered: journalEntryDate,
                concepts: journalEntryConcepts,
                personalEntry: journalEntryText,
                mood: journalEntryMoodChoice
            }

            if (journalEntryDate == false || journalEntryConcepts == false || journalEntryText == false) {
                alert("Please make sure all fields are completed");
            } else if (hiddenEntryID != "") {
                journalEntryChange.id = parseInt(hiddenEntryID)
                localAPIManager.updateJournalEntry(journalEntryChange)
                    .then(() => {
                        localAPIManager.getJournalEntries()
                            .then(renderJournalEntries)
                            .then(emptyFormFields)
                    })
            } else if (searchInputFormValue =="") {
                localAPIManager.saveJournalEntry(journalEntryChange)
                    .then(() => {
                        localAPIManager.getJournalEntries(renderJournalEntries)
                            .then(emptyFormFields)
                    })
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
    },
    searchFunctionEnterAddEventListener () {
       const HTMLBody = document.querySelector("#searchBoxContainer")
       const searchInputFormValue = document.querySelector("#searchEntries")
       const entryContainer = document.querySelector(".entryLog")
       HTMLBody.addEventListener('keydown', (event) => {
            if (event.keyCode == 13) {
                const searchInfo = searchInputFormValue.value.toLowerCase()
                entryContainer.innerHTML = ""
                const journalEntriesPromise = localAPIManager.getJournalEntries()
                journalEntriesPromise.then(object => {
                    object.forEach(journalEntry => {
                        for (const entryValue of Object.values(journalEntry)) {
                            const searchedEntryComponent = makeJournalEntryComponent(journalEntry)
                            let valueString = JSON.stringify(entryValue).toLowerCase()
                            if (valueString.includes(`${searchInfo}`))
                                return entryContainer.innerHTML += searchedEntryComponent;
                        }
                    })
                })
            }
        });
    }
}

export default eventListenerEntryHandler

