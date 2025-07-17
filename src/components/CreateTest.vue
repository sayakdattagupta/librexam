<template>
  <div class="container" style="padding-top: 0">
    <h2><b>How to create and share your own tests for LibrExam</b></h2>

    <ol>
      <li>
        <strong>Understand the Test Format:</strong> Each test must be a valid
        JSON file with the following structure:
        <pre><code>{
  "title": "Sample Test",
  "duration": 1800,
  "author": "Your Name",
  "description": "A mock test covering Physics fundamentals",
  "subjects": [
    {
      "name": "Physics",
      "sections": [
        {
          "name": "Section 1",
          "posM": 4,
          "negM": 1,
          "questions": [
            {
              "type": "SMCQ",
              "text": "What is the acceleration due to gravity on Earth?",
              "image": "", //question image
              "options": ["9.8 m/s²", "10 m/s²", "9.6 m/s²", "8.9 m/s²"],
              "answer": 0
              "solution": "The acceleration due to gravity is 9.8",
              "simage": "" //solution image
            },
            {
              "type": "MMCQ",
              "text": "Which of these are scalar quantities?",
              "options": ["Speed", "Velocity", "Distance", "Displacement"],
              "answer": [0, 2]
            },
            {
              "type": "NUM",
              "text": "What is 2 + 2?",
              "answer": 4
            }
          ]
        }
      ]
    }
  ]
}</code></pre>
        <p>Note:</p>
        <ul>
          <li><code>duration</code> is in seconds (1800 = 30 minutes).</li>
          <li>
            Each <code>subject</code> can contain multiple
            <code>sections</code>.
          </li>
          <li>
            <code>posM</code> and <code>negM</code> denote positive and negative
            marks for each question.
          </li>
          <li>
            Each section has questions of type <code>SMCQ</code>,
            <code>MMCQ</code>, or <code>NUM</code>.
          </li>
          <li>
            Each question has a <code>solution</code> and a
            <code>simage</code> field. Both are optional to fill in. If both
            don't exist, it will show up as "No Solution Provided."
          </li>
        </ul>
      </li>

      <li>
        <strong>Math Support with KaTeX:</strong> LibreTest comes bundled with
        KaTeX support for the question text and the options; Use KaTeX to render
        math:
        <ul>
          <li>
            <code>$...$</code> for inline math (e.g., <code>$F = ma$</code>).
          </li>
          <li><code>$$...$$</code> for display equations.</li>
        </ul>
      </li>

      <li>
        <strong>Adding Images:</strong> Host images on
        <a href="https://imgbb.com" target="_blank">ImgBB</a> (or any platform
        of your choice; or, just use your own server). You must use a
        <strong>direct image link</strong> — that is, the actual image URL that
        opens only the image when you right-click and choose
        <em>“Open image in new tab.”</em>
        For example:
        <pre><code>"image": "https://i.ibb.co/yourimage.png"</code></pre>
        <p>
          Avoid using preview pages or sharing links — those won’t work. The
          link must end in an image extension like <code>.png</code>,
          <code>.jpg</code>, or <code>.gif</code>.
        </p>
      </li>

      <li>
        <strong>Explore Sample Tests:</strong> See real examples at
        <a href="https://github.com/librexam/testRepo" target="_blank"
          >github.com/librexam/testRepo</a
        >.
      </li>

      <li>
        <strong>Publishing Your Tests:</strong>
        <ol>
          <li>
            Create a public GitHub repository (or any other hosting method).
          </li>
          <li>
            Add your test JSON files to a folder (e.g. <code>tests/</code>).
          </li>
          <li>
            Add a root-level <code>index.json</code> file like this:
            <pre><code>[
  {
    "name": "Sample Test",
    "filename": "test1.json",
    "author": "Sayak",
    "duration": 3600,
    "tags": ["physics","mathematics"],
    "description": "A sample Physics, Maths test",
    "url": "https://raw.githubusercontent.com/librexam/testRepo/main/tests/test1.json"
  },
  {
    "name": "Sample Test 2",
    "filename": "test2.json",
     ......
    "url": "https://raw.githubusercontent.com/librexam/testRepo/main/tests/test2.json"
  }
]</code></pre>
          </li>
          <li>
            Then in your repo options, add the topic <code>librexam-test</code>.
            It will index your tests automatically/within 5-10 minutes of
            upload.
          </li>
        </ol>
      </li>
    </ol>

    <p>That's about it.</p>
  </div>
</template>

<script setup></script>

<style scoped>
pre {
  background-color: var(--color-s);
  padding: 1rem;
  overflow-x: auto;
  color: var(--color-t);
  font-size: 0.9em;
}
ul {
  list-style-type: disc;
  margin-left: 1rem;
}
li {
  margin-top: 0.5em;
}
</style>
