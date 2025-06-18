<template>
  <div v-html="renderedHtml"></div>
</template>

<script>
import katex from "katex";

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    renderedHtml() {
      return this.parseAndRender(this.text);
    },
  },
  methods: {
    parseAndRender(text) {
      const displayMathRegex = /\$\$([^$]+)\$\$/g;
      const inlineMathRegex = /\$([^$]+)\$/g;

      const escapeHtml = (str) =>
        str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");

      let replaced = text.replace(displayMathRegex, (match, math) => {
        try {
          return katex.renderToString(math, {
            displayMode: true,
            throwOnError: false,
          });
        } catch {
          return escapeHtml(match);
        }
      });

      replaced = replaced.replace(inlineMathRegex, (match, math) => {
        try {
          return katex.renderToString(math, {
            displayMode: false,
            throwOnError: false,
          });
        } catch {
          return escapeHtml(match);
        }
      });

      replaced = replaced.replace(/\n/g, "<br>");

      return replaced;
    },
  },
};
</script>
