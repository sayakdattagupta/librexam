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

![screens](./screenshots/screen1.jpg)

The project is very much WIP and still alpha.

## Philosophy

Mock tests are an integral part of a students life. This app allows students to interact with community contributed tests.

All tests and quizzes are typed out in JSON, making distribution incredibly easy.

A collection of tests can be hosted in a repo, and can be indexed, with the index link being shared - effectively allowing decentralised hosting of tests.

![screens](./screenshots/screen2.jpg)

Even though images for questions currently need to be hosted (using a service like ImgBB, for example), then linked separately - A feature where each test JSON is bundled into a zip together with its own assets folder might be implemented - thus practically making the entire thing decentralised.

### Why Vercel?

To boost early-adoption of the software while minimizing investment of resources from my behalf.

## Features

- Test browsing (indexed repos)
- Ability to manage multiple tests (paused or submitted)
- Supports SMCQ, MMCQ and Numerical questions
- Supports marking questions for review
- Ability to load images for questions
- KaTeX support
- A dark theme/light theme toggle
- A rudimentary results page

### To be done

- A more advanced results page
- Ability to track user stats
- A better UI (....)
- Code optimization
- A functioning WYSIWYG test maker _(maybe...)_
- Bundling tests into zips, along with their images _(maybe...)_
- Audio support

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
