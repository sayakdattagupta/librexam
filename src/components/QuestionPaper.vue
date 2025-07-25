<template>
  <div
    v-if="showPreview"
    class="modal-overlay"
    @click.self="emit('update:showPreview', false)"
  >
    <div class="modal-content">
      <div
        style="display: flex; justify-content: space-between; margin-top: 1rem"
      >
        <button @click="downloadAsPdf" style="margin: 0">Download</button>
        <button
          @click="emit('update:showPreview', false)"
          class="close-btn"
          style="margin: 0"
        >
          X
        </button>
      </div>

      <div ref="pdfContainer" class="pdf-preview">
        <div>
          <h1 style="text-align: center">{{ test.title }}</h1>
          <p style="text-align: center">{{ test.description }}</p>
          <p style="text-align: center">
            Author: {{ test.author }} | Duration: {{ test.duration / 60 }} min
          </p>
        </div>

        <div
          v-for="(subject, sIdx) in test.subjects"
          :key="sIdx"
          style="margin-top: 2em"
        >
          <h2 style="text-align: center; font-size: 2rem">
            {{ subject.name }}
          </h2>

          <div
            v-for="(section, secIdx) in subject.sections"
            :key="secIdx"
            style="margin-top: 1em"
          >
            <h3 style="text-align: center; font-size: 1.8rem">
              {{ section.name }}
            </h3>

            <div
              v-for="(q, qIdx) in section.questions"
              :key="qIdx"
              class="question-block"
              style="margin-bottom: 2em"
            >
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 1rem;
                  align-items: center;
                  font-size: 1.5rem;
                "
              >
                Question No. {{ qIdx + 1 }}
                <div style="font-size: 1rem">
                  {{ q.type }} +{{ section.posM }}/-{{ section.negM }}
                </div>
              </div>

              <latexText :text="q.text" />

              <div v-if="q.image">
                <img
                  :src="q.image"
                  crossorigin="anonymous"
                  style="display: block; margin: 0.5em auto; max-width: 100%"
                />
              </div>

              <template v-if="q.type === 'SMCQ' || q.type === 'MMCQ'">
                <ul style="margin-top: 1em; list-style: none; padding-left: 0">
                  <li
                    v-for="(opt, i) in q.options"
                    :key="i"
                    style="
                      display: flex;
                      gap: 1rem;
                      margin-bottom: 0.5rem;
                      font-size: 1.25rem;
                    "
                  >
                    {{ String.fromCharCode(65 + i) }}. <latexText :text="opt" />
                  </li>
                </ul>
              </template>
            </div>
          </div>
        </div>

        <p style="margin-top: 4em">
          This document has been generated by LibrExam. Check out
          https://librexam.vercel.app or
          https://github.com/sayakdattagupta/librexam to learn more.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTestState } from "../stores/testState";
import latexText from "./latexText.vue";
import { ref, onMounted } from "vue";

const props = defineProps({
  showPreview: Boolean,
});

const emit = defineEmits(["update:showPreview"]);

const testState = useTestState();
const test = testState.testData;

import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

const pdfContainer = ref(null);

import { nextTick } from "vue";

async function downloadAsPdf() {
  const node = pdfContainer.value;
  if (!node) return;

  node.classList.add("exporting");

  await nextTick();

  try {
    const dataUrl = await toJpeg(node, {
      cacheBust: true,
      quality: 1.0,
      pixelRatio: 1.5,
      skipFonts: true,
    });

    const img = new Image();
    img.src = dataUrl;

    img.onload = () => {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [img.width, img.height],
      });

      pdf.setFont("helvetica");
      pdf.addImage(img, "JPEG", 0, 0, img.width, img.height);
      pdf.save(`librexam-${test.title}.pdf`);
    };
  } catch (err) {
    console.error("Download failed:", err);
  } finally {
    node.classList.remove("exporting");
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  background: white;
  max-height: 90vh;
  width: 50vw;
  overflow: auto;
  padding: 2em;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.close-btn {
  color: black;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

@media (max-width: 900px) {
  .modal-content {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }
}

.pdf-preview {
  width: 100%;
  font-family: "Georgia", serif;
  color: black;
  background-color: white;
}

.exporting {
  padding: 2em;
  width: 1024px;
}

img {
  break-inside: avoid;
  page-break-inside: avoid;
}

.question-block,
h2,
h3,
ul,
p {
  break-inside: avoid;
  page-break-inside: avoid;
}

p,
li {
  overflow-wrap: break-word;
  word-break: normal;
}
</style>
