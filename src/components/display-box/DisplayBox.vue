<template>
  <div class="bcgov-display-box" v-bind:class="styling">
    <div v-if="icon" class="bcgov-display-icon">
      <component v-bind:is="icon" />
    </div>
    <div class="bcgov-display-right-element">
      <component v-bind:is="element"></component>
    </div>
  </div>
</template>

<script>
  import "./DisplayBox.css";

  export default {
    name: "DisplayBox",
    props: {
      styling: {
        type: String,
        required: false,
        default: "",
      },
      icon: {
        type: Object,
        required: false,
        default: null,
      },
      element: {
        type: Object,
        required: true,
      },
    }
  }
</script>
