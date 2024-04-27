# Political Leaning Assessment Tool

This is my first attempt at building **Stupid Software**.

## Running the App

To run the app, execute the following command:

```bash
npm run dev
```

## WTF?

so the whole idea is to make a fun and gimmicky tool to do comedy with. the idea is the following:

The app is composed of 2 views:

- `index`
- `results`

first of all host the app somewhere.

the results page should be setup to be cast behind the speaker in a screen or though a video projector, and it shows a political compass with a symbol in the origin, middle, (0,0), etc.

the index page should be visited by users on their phones or whatever device they want to visit it in. within it, they'll see the same thing the results page shows but with a catch, they can drag the symbol in the middle to wherever in the compass and that movement vector will be cast as a vote and an average will be displayed in the results page.

## What is this, what the fuck is this

- There is a simple route that tracks "voting" data. Note that the information is not persisted; the "database" is on line 7 of the `vote.ts` file.
- When viewing `index`, Users can drag whatever is in the middle to a section of the compass, which counts as casting a vote.
- Vote average is displayed on the `results` page.
- This allows the users to express their thoughts on the political leanings of the speaker.

## Realtime Updates

- The idea is to have the `results` page update in "realtime". For practical purposes, the page polls every 5 seconds.
