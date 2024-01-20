<script lang="ts">
import MonacoEditor from './lib/MonacoEditor.vue';
import { defineComponent } from 'vue';
import { debounce } from './utils/debounce';
import * as yaml from 'js-yaml';
import * as js2xml from 'xml2js';

export interface Props {
  errors?: string[];
  options: Record<string, any>;
  value: string;
  onEdit: Function;
  onFileChanged: Function;
  cleanContent: Function;
  iconSize: string;
  onValidate: Function;
  copyContentToClipBoard: Function;
  setEditorPosition: Function;
  setNextSelectErrorPosition: Function;
  setPrevSelectErrorPosition: Function;
  pasteClipBoar: Function;
  formatJSON: Function;
  getFormatTopTip: Function;
  getMinifyTopTip: Function;
  getToYMLTopTip: Function;
  JSONToYML: Function;
  JSONToXML: Function;
  minifyJSON: Function;
  toggleYMLDialog: Function;
  toggleXMLDialog: Function;
  copyXLMContentToClipboard: Function;
  isEmpty: boolean;
  isValidJson: boolean;
  iconIndicatorSize;
  curError?: Number;
  selectedMarker?: Object;
  isYMLModalActive: boolean;
  isYAMLContentCopied: boolean;
  isXMLModalActive: boolean;
  isXMLContentCopied: boolean;
}

export default defineComponent<Props>({
  components: {
    MonacoEditor,
  },
  methods: {
    onEdit(event) {
      this.isEmpty = event.length === 0;
    },
    onValidate(errors, markers) {
      const debounceErrorCheck = debounce(() => {
        this.errors = errors;
        this.errorMarkers = markers;
        this.isValidJson = !(errors.length > 0);

        if (this.isValidJson) {
          this.curError = null;
        } else {
          this.curError = 0;
        }
      }, 500);
      debounceErrorCheck();
    },
    setNextSelectErrorPosition() {
      if (this.curError !== null && this.curError < this.errors.length) {
        if (this.curError >= 0 && this.curError + 1 < this.errors.length) {
          this.curError += 1;
        }

        this.selectedMarker = this.errorMarkers[this.curError];
      }
    },
    setPrevSelectErrorPosition() {
      if (this.curError !== null && this.curError < this.errors.length) {
        if (this.curError >= 1) {
          this.curError -= 1;
        }
      }

      this.selectedMarker = this.errorMarkers[this.curError];
    },
    getFormatTopTip() {
      if (!this.isValidJson || this.isEmpty) {
        return 'Format or beautify the JSON (disabled)';
      }
      return 'Format or beautify the JSON';
    },
    getMinifyTopTip() {
      if (!this.isValidJson || this.isEmpty) {
        return 'Minify the JSON (disabled)';
      }
      return 'Minify the JSON';
    },
    getToYMLTopTip() {
      if (!this.isValidJson || this.isEmpty) {
        return 'Convert the JSON to YAML (disabled)';
      }
      return 'Convert the JSON to YAML';
    },
    cleanContent() {
      this.value = '';
    },
    toggleYMLDialog() {
      this.isYMLModalActive = !this.isYMLModalActive;
      this.isYAMLContentCopied = false;
    },
    toggleXMLDialog() {
      this.isXMLModalActive = !this.isXMLModalActive;
      this.isXMLContentCopied = false;
    },
    copyContentToClipBoard() {
      navigator.clipboard.writeText(this.value);
    },
    pasteClipBoar() {
      navigator.clipboard.readText().then((text) => {
        this.value = text;
        if (this.value.length > 0) {
            this.isEmpty = false;
          }
      });
    },
    formatJSON() {
      this.value = JSON.stringify(JSON.parse(this.value), null, 2);
    },
    minifyJSON() {
      this.value = JSON.stringify(JSON.parse(this.value));
    },
    JSONToYML() {
      const ymlString = yaml.dump(JSON.parse(this.value));
      return ymlString;
    },
    JSONToXML() {
      const builder = new js2xml.Builder();
      return builder.buildObject(JSON.parse(this.value));
    },
    copyYAMLContentToClipboard() {
      navigator.clipboard.writeText(yaml.dump(JSON.parse(this.value)));
      this.isYAMLContentCopied = true;
    },
    copyXLMContentToClipboard() {
      const builder = new js2xml.Builder();
      const xmlString = builder.buildObject(JSON.parse(this.value));
      navigator.clipboard.writeText(xmlString);
      this.isXMLContentCopied = true;
    },
    onFileChanged(event: Event) {
      const file = (event?.target as unknown as HTMLInputElement)
        .files[0] as any;
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const fileContent = fileReader.result as string;
          this.value = fileContent;
          if (this.value.length > 0) {
            this.isEmpty = false;
          }
        };
        fileReader.readAsText(file);
      }
    },
  },
  data() {
    return {
      options: {
        colorDecorators: true,
        lineHeight: 24,
        tabSize: 2,
      },
      errors: [],
      value: '',
      iconSize: 'x-large',
      file: null,
      content: null,
      files: [],
      isEmpty: true,
      errorMarkers: [],
      isValidJson: true,
      iconIndicatorSize: 'large',
      selectedMarker: null,
      curError: -1,
      isYMLModalActive: false,
      isYAMLContentCopied: false,
      isXMLModalActive: false,
      isXMLContentCopied: false,
    };
  },
});
</script>
<template>
  <!-- YAML Modal -->
  <template>
    <div class="text-center">
      <v-dialog v-model="isYMLModalActive" activator="parent" width="500">
        <v-card class="mx-auto" min-width="500">
          <v-card-title class="pt-4"> YAML from JSON </v-card-title>
          <v-card-text>
            <textarea disabled :value="JSONToYML()" class="textarea-style"></textarea>
          </v-card-text>

          <v-card-actions class="dialog-actions">
            <v-btn color="primary" variant="elevated" @click="isYMLModalActive = false">Close</v-btn>
            <v-btn color="primary" variant="elevated" @click="copyYAMLContentToClipboard">{{ isYAMLContentCopied ?
              'Copied' : 'Copy' }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>

  <!-- XML Modal -->
  <template>
    <div class="text-center">
      <v-dialog v-model="isXMLModalActive" activator="parent" width="500">
        <v-card class="mx-auto" min-width="500">
          <v-card-title class="pt-4"> XML from JSON </v-card-title>
          <v-card-text>
            <textarea disabled :value="JSONToXML()" class="textarea-style"></textarea>
          </v-card-text>
          <v-card-actions class="dialog-actions">
            <v-btn color="primary" variant="elevated" @click="isXMLModalActive = false">Close</v-btn>
            <v-btn color="primary" variant="elevated" @click="copyXLMContentToClipboard">{{ isXMLContentCopied ? 'Copied'
              : 'Copy' }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>

  <h2>JSON Pro</h2>
  <div class="editor-box">
    <v-toolbar style="padding-top: 1rem">
      <div v-if="isEmpty" class="validator-state-message">
        Please enter, copy or upload your JSON.
      </div>

      <div v-if="!isEmpty && isValidJson" class="validator-state-message">
        <v-icon :size="iconIndicatorSize" color="green-darken-2">mdi-check-circle-outline</v-icon><span
          class="correct-text">Valid JSON</span>
      </div>
      <!-- Error v-toolbar -->
      <div v-if="!isEmpty && !isValidJson" class="validator-state-message">
        <v-icon :size="iconIndicatorSize" color="deep-orange-accent-3">mdi-alert-circle-outline</v-icon><span
          class="incorrect-text">{{ errors.length }} {{ errors.length === 1 ? 'error' : 'errors' }} in
          JSON</span>

        <v-btn icon @click="setNextSelectErrorPosition">
          <v-icon :size="iconSize">mdi-arrow-down-drop-circle-outline</v-icon>
          <v-tooltip activator="parent" location="bottom">Go to next error position</v-tooltip>
        </v-btn>

        <v-btn icon @click="setPrevSelectErrorPosition">
          <v-icon :size="iconSize">mdi-arrow-up-drop-circle-outline</v-icon>
          <v-tooltip activator="parent" location="bottom">Go to previous error position</v-tooltip>
        </v-btn>
        <span class="error-message">{{ errors[this.curError] }}</span>
      </div>
    </v-toolbar>

    <v-toolbar style="padding-left: 20px; padding-right: 20px">
      <v-toolbar-items>
        <v-file-input multiple label="File input" prepend-icon="mdi-upload" @change="onFileChanged"
          style="position: relative; top: -5px"></v-file-input>
        <v-tooltip activator="parent" location="bottom">Upload a JSON file</v-tooltip>
        <v-btn icon @click="pasteClipBoar" style="position: relative; left: -40px">
          <v-icon :size="iconSize">mdi-content-paste</v-icon>
          <v-tooltip activator="parent" location="bottom">Paste content in clipboard to editor</v-tooltip>
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-tooltip location="bottom" :text="getFormatTopTip()">
          <template v-slot:activator="{ props }">
            <v-btn style="
                height: 40px;
                text-transform: none;
                position: relative;
                top: 10px;
                margin-right: 10px;
                width: 0px;
              " v-bind="props" color="primary" variant="flat" :disabled="!isValidJson || isEmpty" @click="formatJSON">
              Prettify
            </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip location="bottom" :text="getMinifyTopTip()">
          <template v-slot:activator="{ props }">
            <v-btn style="
                height: 40px;
                text-transform: none;
                position: relative;
                top: 10px;
                margin-right: 10px;
                width: 0px;
              " v-bind="props" color="primary" variant="flat" :disabled="!isValidJson || isEmpty" @click="minifyJSON">
              Minify
            </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip location="bottom" :text="getToYMLTopTip()">
          <template v-slot:activator="{ props }">
            <v-btn style="
                height: 40px;
                text-transform: none;
                position: relative;
                top: 10px;
                margin-right: 10px;
                width: 0px;
              " v-bind="props" color="primary" variant="flat" :disabled="!isValidJson || isEmpty"
              @click="toggleYMLDialog">YAML</v-btn>
          </template>
        </v-tooltip>

        <v-tooltip location="bottom" :text="getToYMLTopTip()">
          <template v-slot:activator="{ props }">
            <v-btn style="
                height: 40px;
                text-transform: none;
                position: relative;
                top: 10px;
              " v-bind="props" color="primary" variant="flat" :disabled="!isValidJson || isEmpty"
              @click="toggleXMLDialog">
              XML
            </v-btn>
          </template>
        </v-tooltip>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn icon @click="copyContentToClipBoard">
          <v-icon :size="iconSize">mdi-content-copy</v-icon>
          <v-tooltip activator="parent" location="bottom">Copy content to clipboard</v-tooltip>
        </v-btn>

        <v-btn icon @click="cleanContent" color="#ff3d00">
          <v-icon :size="iconSize">mdi-delete-empty</v-icon>
          <v-tooltip activator="parent" location="bottom">Remove all the content</v-tooltip>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div>
      <MonacoEditor theme="vs" :options="options" language="json" :height="400" v-model:value="value"
        v-model:errorMarker="selectedMarker" @change="onEdit" @onValidate="onValidate"></MonacoEditor>
    </div>
  </div>
  <h2>About JSON Pro</h2>
  <p>
    JSON Pro is the most convenient tool used to locate the errors in a complex
    JSON. The error navigation bring your to the target error location
    automatically. This tool also solves the other daily JSON operations, such
    as prettifying, minifying and format converting. Additionally, the editor
    will use the in-memory cache to provide the basic auto-completion.
  </p>
  <h2>About JSON</h2>
  <p>
    JSON, the abbreviation of JavaScript Object Notation, is a widely-used format in modern data transportation. JSON is
    originally derived from the JavaScript programming language,
    but it is supported by many languages including Python, Ruby, PHP,
    and Java.
  </p>
  <p>
    To learn more about JSON, please review the following links:
  <div style="margin-left: 20px;">    <ul>
      <li>
        <a href="https://www.json.org/json-en.html">JSON org</a>
      </li>
      <li>
        <a href="https://en.wikipedia.org/wiki/JSON">Wikipedia JSON</a>
      </li>

      <li>
        <a href="https://www.w3schools.com/js/js_json_intro.asp">W3C JSON</a>
      </li>
    </ul></div>

  </p>
</template>
<style scoped>
.editor-box {
  border-style: solid;
  border-width: 1px;
  border-color: black;
}

::v-deep .v-input__control {
  display: none;
}

.right-margin {
  margin-left: 20px;
}

::v-deep .v-input__prepend {
  font-size: 28px;
  margin-top: 16px;
}

.validator-state-message {
  margin-left: 1.5rem;
  font-weight: 600;
  font-size: 22px;
}

.correct-text {
  position: relative;
  top: 2px;
  font-size: 22px;
  margin-left: 8px;
  color: #388e3c !important;
}

.incorrect-text {
  position: relative;
  top: 2px;
  font-size: 22px;
  margin-left: 8px;
  color: #ff3d00 !important;
  padding-right: 2rem;
  height: 4rem;
}

.error-message {
  font-size: 18px;
  font-weight: 400;
}

.paste-icon-adjust {
  display: table-cell;
  position: relative;
  top: -10px;
}

.textarea-style {
  height: 20rem;

  border-style: solid;
  border-width: 1px;
  padding-left: 1rem;
  padding-right: 1rem;

  font-size: 16px;
  width: 100%;
}

.dialog-actions {
  margin: 10px;
  padding-bottom: 20px;
}

.dialog-btn {
  height: 40px;
  text-transform: none;
  position: relative;
  top: 10px;
}

a:link {
  color: blue;
}

/* visited link */
a:visited {
  color: orange;
}
</style>
