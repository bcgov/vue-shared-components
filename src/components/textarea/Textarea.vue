<template>
  <div>
    <div v-if="label" class="bcgov-input-label">
      <label v-bind:for="id">{{ label }}</label>
      {{ asterisk }}&nbsp;
    </div>
    <textarea
      v-bind:id="id"
      class="bcgov-text-input"
      rows="8"
      cols="60"
      @change="$emit('textarea-change')"
    />
  </div>
</template>

<script>
  import "./Textarea.css";

  export default {
    name: "Textarea",
    props: {
      isRequired: {
        type: Boolean,
        required: false,
        default: false,
      },
      id: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: false,
        default: "",
      },
    },
    data() {
      return {
        asterisk: this.isRequired
          ? <span id="asterisk" className="mandatory">*</span>
          : ""
      }
    }
  }
</script>
