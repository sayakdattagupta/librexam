## [LibrExam](https://librexam.vercel.app)

![logo](./public/librexamTyped.svg)<br>
is a powerful, fully static, and (optionally) decentralised test and quizzing engine - powered by Vue.js. 

![screens](./screenshots/screen1.jpg)

The project is very much WIP and still alpha.

Also, check out the [repo](https://github.com/librexam/testRepo) where I am hosting the sample tests.

## Philosophy

I realize this project might not exactly be 'libre', hence, to avoid any potential feuds, I have used a creative naming scheme (LibrE).

All tests and quizzes are typed out in JSON, making distribution incredibly easy.

A collection of tests can be hosted in a repo, and can be indexed, with the index link being shared - effectively allowing decentralised hosting of tests.

Even though images for questions currently need to be hosted (using a service like ImgBB, for example), then linked separately - A feature where each test JSON is bundled into a zip together with its own assets folder might be implemented - thus practically making the entire thing decentralised.

### Why Vercel?

To boost early-adoption of the software while minimizing investment of resources from my behalf.

## Features

Test browsing (indexed repos),<br>
Ability to manage multiple tests (paused or submitted),<br>
Supports SMCQ, MMCQ and Numerical questions,<br>
Supports marking questions for review, <br>
Ability to load images for questions,<br>
KaTeX support,<br>
A dark theme/light theme toggle,<br>
A rudimentary results page<br>

### To be done

A more advanced results page, <br>
Ability to track user stats, <br>
A better UI (....), <br>
Code optimization, <br>
A functioning WYSIWYG test maker _(maybe...)_, <br>
Bundling tests into zips, along with their images _(maybe...)_,<br>
Audio support

## LICENSE

[AGPLv3](LICENSE) - Free to use, modify, and share. However, Source code must be disclosed if deployed publicly.
