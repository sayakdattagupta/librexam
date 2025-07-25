<div align="center">
    <img src="./public/librexamTyped.svg" alt="logo" />
</div>

<p align="center">
    <a href="https://librexam.vercel.app">
      <img src="https://img.shields.io/badge/Vercel-Deployed-brightgreen?logo=vercel" />
    </a>
    <a href="https://github.com/sayakdattagupta/librexam/graphs/contributors">
      <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/sayakdattagupta/librexam" />
    </a>
    <a href="https://github.com/sayakdattagupta/librexam/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/sayakdattagupta/librexam?color=0088ff" />
    </a>
    <a href="https://github.com/sayakdattagupta/librexam/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/sayakdattagupta/librexam?color=0088ff" />
    </a>
</p>

is a powerful, fully static, and (optionally) decentralised test and quizzing engine - powered by Vue.js.

![screens](./screenshots/screen2.jpg)

**NOTE: LibrExam is alpha software and is considered unstable. While users testing and providing usage information is highly appreciated, please use at your own risk.**

## Philosophy

This app allows users to interact with community contributed tests.

All tests and quizzes are typed out in JSON, making distribution incredibly easy.

A collection of tests can be hosted in a repo and indexed - this repo, once tagged/given the topic of "librexam-test", gets automatically indexed into a central list of repos - effectively allowing decentralised hosting of tests. Aditionally, JSON files for individual tests can be loaded manually.

![screens](./screenshots/screen1.jpg)

Even though images for questions currently need to be hosted (using a service like ImgBB, for example), then linked separately - A feature where each test JSON is bundled into a zip together with its own assets folder might be implemented - thus practically making the entire thing decentralised.

## Features

- Test browsing (indexed repos) - all repos tagged with 'librexam-test' are indexed automatically.
- Ability to manage multiple tests (paused or submitted)
- Ability to preview tests as a psuedo-"question paper" or download them as PDFs (via jsPdf and html-to-image)
- Supports SMCQ, MMCQ and Numerical questions.
- Supports marking questions for review.
- Ability to load images for questions and/or their solutions.
- KaTeX/Math support.
- A dark theme/light theme toggle.
- A rudimentary results page.

![screens](./screenshots/screen3.jpg)

### To be done

- A more advanced results/stats page.
- Ability to track user stats across multiple tests.
- Ironing out bugs and optimizing code.
- A functioning WYSIWYG test maker _(maybe...)_
- Bundling tests into zips, along with their images _(maybe...)_
- Audio support.
- Expansions into "quizzing" territory - user-hosted gameroooms like Kahoot! _(maybe...)_

## Contribution

### Prerequisites

- Node.js
- npm
- git

### Instructions

1. Clone the `main` branch <br>
   `git clone https://github.com/sayakdattagupta/librexam.git`
2. Install dependencies <br>
   `npm install`
3. Run `npm run dev`

### Guidelines

(Firstly, the obvious: Don't make any breaking changes.)

This project uses the `prettier` code format. Make sure to run

`npx prettier --write .`

from the root before making a pull request.

## LICENSE

[AGPLv3](LICENSE) - Free to use, modify, and share. However, Source code must be disclosed if deployed publicly.
