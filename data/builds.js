/*
  THE BUILD BOARD — data file.

  Students (well, their AI coding tools) add themselves here with a pull request.
  One entry per shipped project. Keep it honest: real first names, real live URLs.

  ENTRY SCHEMA — copy the template below, fill it in, add it to the TOP of the array:
  {
    name:     "Project Name",                  // required
    blurb:    "One sentence on what it does.", // required, keep it under ~90 chars
    builder:  "FirstName",                     // required — REAL first name, no handles
    major:    "MIS",                           // your major (students)
    year:     "27",                            // grad year, two digits (students)
    role:     null,                            // faculty/staff use this instead of major+year
    days:     "9 days",                        // how long it took ("one night", "2 weeks"...)
    tool:     "Claude Code",                   // the AI tool you built with
    live:     "https://your-project.vercel.app", // required — live URL or it didn't happen
    code:     "https://github.com/you/repo",   // optional
    shot:     "shots/your-project.png",        // optional — add the image in the same PR
                                               // (see shots/README.md); omit for a generated pattern
    semester: "Fall '26",                      // when you shipped it
    seed:     false,                           // leave false; true marks faculty seed entries
    self:     false                            // leave false; true is reserved for this site itself
  }
*/

var SITE = {
  // The Board page uses this to generate the "get on the board" instructions.
  repoUrl: "https://github.com/khc-5010/BuildSomething",
  email: "khc5010@psu.edu"
};

var BUILDS = [
  {
    name: "Build Something!",
    blurb: "This site. The launch pad launched itself. Yes, that counts.",
    builder: "Mr. C",
    major: null,
    year: null,
    role: "Faculty",
    days: "one day",
    tool: "Claude Code",
    live: null,   // self entry — resolves to wherever the site is running
    code: null,   // self entry — resolves to SITE.repoUrl once it's set
    shot: "shots/build-something.png",
    semester: "Fall '26",
    seed: true,
    self: true
  },
  {
    name: "Alum Line",
    blurb: "Behrend alumni post jobs; current students actually see them.",
    builder: "Mr. C",
    major: null,
    year: null,
    role: "Faculty",
    days: null,
    tool: "Claude Code",
    live: "https://alum-line.vercel.app",
    code: null,
    shot: "shots/alum-line.png",
    semester: null,
    seed: true,
    self: false
  }
];
