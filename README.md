# Build Something!

The one-stop launch pad for Penn State Behrend students who keep getting told to
"build something." Send a student the link; they leave with a project idea made
of their own life, a kickoff prompt that turns their AI coding tool into a
mentor, a quest log to finish the build, and a public Build Board to land on.

**Live funnel:** landing → intake (or the Idea Machine) → kickoff prompt →
quest log → Build Board → demo for Mr. C.

## The evergreen architecture

- **The site never calls an AI.** No API keys, no bills, no model names to
  update. All intelligence leaves the site as copy-paste prompts that run in
  whatever AI coding tool the student already has.
- **No build step, no frameworks, no dependencies.** Plain HTML/CSS/JS. Open
  `index.html` in a browser and the whole thing works, `file://` included.
- **No accounts, no database.** Student progress (dossier, quests, URLs) lives
  in their browser's localStorage. The only shared state is the Build Board,
  which is a file in this repo.
- **One page is allowed to age:** `setup.html` names current tools
  (Claude Code, Codex, Cursor) and says so out loud. Everything else speaks in
  capabilities, not brand names.

## Structure

```
index.html      landing / game-start menu
intake.html     6-question interview → builds the "dossier" (localStorage)
machine.html    the Idea Machine — WHO × PAIN × TWIST slot machine
                (dossier answers get spliced into the reels when present)
prompt.html     assembles the kickoff prompt from dossier + combo, copy button
quests.html     6-quest log, panic button ("I'M STUCK" rescue prompt)
debrief.html    THE DEBRIEF — post-ship prompt: resume bullets, LinkedIn
                post, 90-second demo script, interviewed out of the student
board.html      the Build Board + "get on the board" PR instructions
setup.html      tool setup (the only page that may go stale)
css/style.css   the whole design system (Penn State navy + Pugh-blue phosphor)
js/app.js       shared helpers (storage, clipboard, board thumbnails, SW reg)
data/builds.js  THE BUILD BOARD DATA — students PR into this file
shots/          board-card screenshots (added via the same PR as the entry)
manifest.json   PWA manifest — the site installs to phone home screens
sw.js           service worker (network-first, so merged PRs show instantly)
icons/          app icons (any + maskable + apple-touch)
design/         the original mockups (design canvas artboards)
tools/serve.js  dev-only local preview: `node tools/serve.js` → localhost:4173
```

## Deploy (one time, ~5 minutes)

1. Create a GitHub repo and push this folder.
2. In `data/builds.js`, set `SITE.repoUrl` to the repo's URL — the Board page
   uses it to generate students' PR instructions.
3. Import the repo at vercel.com → framework preset "Other" → deploy. Done.
   Every merged PR redeploys the site automatically.

## Running the Board (the only ongoing job)

Students' AIs open pull requests that add one entry to `BUILDS` in
`data/builds.js`. To moderate, read the diff and check:

- real first name (no handles — site policy), reasonable blurb
- the `live` URL loads and is actually their project
- entry added to the **top** of the array, nothing else touched

- if the PR includes a screenshot: it's in `shots/`, reasonably sized
  (~800px wide, under ~300 KB), and the entry's `shot` path matches

Merge = it's on the Board = Vercel redeploys. That's the whole workflow.
Entries emailed via the fallback link: paste them in yourself using the schema
at the top of `data/builds.js`.

To seed more of your own builds, add entries with `role: "Faculty"` and
`seed: true`. The site itself is on the Board as a `self: true` entry — its
LIVE link resolves to wherever the site is running, and its CODE link picks up
`SITE.repoUrl` automatically once you set it.

## Tuning it later

- Idea Machine wordbanks: the `WHO` / `PAIN` / `TWIST` arrays in `machine.html`.
- Intake questions: the `STEPS` config in `intake.html`.
- Kickoff prompt rules: the `buildPrompt()` template in `prompt.html`.
- Debrief prompt: the `buildDebrief()` template in `debrief.html`.
- Quests: the `QUESTS` config in `quests.html`.
- Demo email: `SITE.email` in `data/builds.js`.
- If you ever change precached files, bump the `CACHE` name in `sw.js`
  (e.g. `bs-v1.6`) so installed phones pick up the new set.
