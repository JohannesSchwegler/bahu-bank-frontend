<template>
  <div>
    <h1>Chatbot</h1>
    <p>Text</p>
    <p>{{ content }}</p>
    <div>Response: {{ responseMessage }}</div>
    <button @click="sendAjax">Send request</button>
    <ChatBox :userMessages="userInput" />
  </div>
</template>

<script>
import ChatBox from "./ChatBox.vue";
import axios, { AxiosInstance } from "axios";
export default {
  components: {
    ChatBox,
  },
  data() {
    return {
      userInput: [],
      recognition: null,
      content: "",
      responseMessage: "",
    };
  },
  mounted() {
    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.start();
      this.initRecognition();
    } catch (error) {
      new Error(error);
    }
  },

  methods: {
    async sendAjax() {
      const message = this.content;
      const data = {
        message: { content: message, type: "text" },
        ["conversation_id"]: "1234567891",
      };

      axios
        .post("https://api.cai.tools.sap/build/v1/dialog", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.VUE_APP_TOKEN,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          this.responseMessage = data.results.messages[0].content;
        })
        .catch((error) => {
          console.log(error);
          new Error(error);
        });
    },
    initRecognition() {
      this.recognition.onstart = function() {
        console.log("started");
      };

      this.recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        const mobileRepeatBug =
          current == 1 && transcript == event.results[0][0].transcript;
        if (!mobileRepeatBug) {
          this.userInput.push(transcript);
          this.content += transcript;
        }
      };
    },
  },
  beforeDestroy() {
    //this.recognition.stop();
  },
};
</script>

<style lang="scss" scoped></style>
