<template>
  <div>
    <h2>How to create and share your own tests for LibrExam</h2>

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
              "options": ["9.8 m/s²", "10 m/s²", "9.6 m/s²", "8.9 m/s²"],
              "answer": 0
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
        <a href="https://imgbb.com" target="_blank">ImgBB</a> (or your prefered
        platform; Or, just host it yourself). Use the "Direct Link" from the
        Embed Codes tab, and include it in the <code>image</code> field of a
        question:
        <pre><code>"image": "https://i.ibb.co/example/image.png"</code></pre>
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
          <li>Create a public GitHub repository (or anything else, really).</li>
          <li>Add your test JSON files.</li>
          <li>
            Add a root-level <code>index.json</code> like this:
            <pre><code>[
  {
    "name": "Physics Full Test",
    "author": "Your Name",
    "description": "Mechanics and thermodynamics.",
    "file": "https://raw.githubusercontent.com/your-username/your-repo/main/physics.json"
  }
]</code></pre>
          </li>
          <li>
            Then paste your repo URL into LibrExam’s “Load from Repository”
            input. It will fetch and index your tests automatically.
          </li>
        </ol>
      </li>
    </ol>

    <p>Thats about it.</p>
  </div>
</template>
<script setup></script>
<style scoped>
pre {
  background-color: var(--color-alt);
  padding: 1rem;
  overflow-x: auto;
  color: var(--color-r);
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
