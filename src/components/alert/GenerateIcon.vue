<template>
  <fragment>
    <div v-if="iconType === 'success'" class="bcgov-success-color">
      <component v-bind:is="icon" />
    </div>
    <div v-if="iconType === 'warning'" class="bcgov-warning-color">
      <component v-bind:is="icon" />
    </div>
    <div v-if="iconType === 'info'">
      <component v-bind:is="icon" />
    </div>
    <div v-if="iconType === 'error'" class="bcgov-error-color">
      <component v-bind:is="icon" />
    </div>
  </fragment>
</template>

<script>
  import { Fragment } from "vue-fragment";
  import "./Alert.css";

  export default {
    name: "GenerateIcon",
    components: { Fragment },
    props: {
      icon: {
        type: Object,
        required: true,
      },
      iconType: {
        type: String,
        required: true,
      },
    }
  }
</script>
