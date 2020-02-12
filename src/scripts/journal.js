import localAPIManager from "./data.js"
import renderJournalEntries from "./entriesDOM.js"
import eventListenerEntryHandler from "./eventsJournal.js"
// Finds and adds event listener to submit button





localAPIManager.getJournalEntries().then(renderJournalEntries)
eventListenerEntryHandler.submitBtnAddEventListener()
eventListenerEntryHandler.radioButtonAddEventListener()
eventListenerEntryHandler.journalEntryButtonsAddEventListener()
eventListenerEntryHandler.searchFunctionEnterAddEventListener()

