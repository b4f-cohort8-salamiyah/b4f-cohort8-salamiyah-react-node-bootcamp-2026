# Session 4 Homework — Majed Hmoud

## Acceptance scenarios

- **A:** Save an opportunity, reload, and confirm it is still saved.
- **B:** View several opportunities, return to Opportunities, reload, and confirm the same history and order.
- **C:** Remove an entry and reload Opportunities; it stays removed. Clear the history and reload Opportunities; it stays empty. A valid detail page records its own opportunity when loaded, so use the list page for this empty-history check.
- **D:** With at least two unsaved recently viewed entries visible, click Save all, then reload. Both stay saved and the note disappears. Existing saved entries must remain saved.
- **E:** Redux alone stores data in memory, so recently viewed entries would be lost when the page reloads. Our store.subscribe callback writes the entries to localStorage after each dispatch, allowing them to survive a reload. Rehydration means reading those stored entries, parsing the JSON, and using the resulting array as the slice’s initial state. Only saved IDs and recently viewed entries persist because we explicitly load and save those values; notifications and temporary UI state, such as loading and error flags, still reset.
- Run `npm run build` and `npm run lint` inside `client/`.
