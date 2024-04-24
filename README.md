# Political Leaning Assessment Tool

This is my first attempt at building **Stupid Software**.

## Running the App

To run the app, execute the following command:

```bash
npm run dev
```

## App Composition

The app is composed of 2 views:

- `index`
- `results`

## Features

- There is a simple route that tracks information. Note that the information is not persisted; the "database" is on line 7 of the `vote.ts` file.
- The `index` view is optimized for mobile use. Users can drag whatever is in the middle to a section of the compass, which counts as casting a vote.
- The vote average is displayed on the `results` page.

## Realtime Updates

- The idea is to have the `results` page update in "realtime". For practical purposes, the page polls every 5 seconds.
