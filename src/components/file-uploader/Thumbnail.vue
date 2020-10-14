<template>
  <div class="thumbnail-container">
    <img :src="imageObject.fileContent" alt="Image Thumbnail" tabindex="0" :class="thumbnailClass">
    <div class="action-strip text-center">
      <a href="javascript:void(0)" @click="deleteImage($event)" class='text-danger' tabindex="0">Remove</a>
    </div>
  </div>
</template>

<script>
import './Thumbnail.css';

export default {
  props: {
    imageObject: {
      type: Object
    }
  },
  data: () => {
    return {
      scaledWidth: 300
    }
  },
  mounted() {
    const scaledWidthString = (180 * this.imageObject.naturalWidth / this.imageObject.naturalHeight).toFixed(0);
    this.scaledWidth = parseInt(scaledWidthString, 10);

    if (this.scaledWidth > 250) {
      this.scaledWidth = 250;
    } else if (this.scaledWidth < 30) {
      this.scaledWidth = 100;
    }

    if (isNaN(this.scaledWidth)) {
      this.scaledWidth = 300;
    }
  },
  computed: {
    thumbnailClass() {
      if (this.scaledWidth <= 300) {
        return 'image-thumbnail';
      } else {
        return 'image-thumbnail-width-priority';
      }
    }
  },
  methods: {
    deleteImage(evt) {
      console.log('ThumbnailComponent:Delete from thumbnail: %o', evt);
      console.log('ThumbnailComponent:imageObject:', JSON.stringify(this.imageObject, null, 2));
      this.$emit('delete', this.imageObject);
    }
  }
}
</script>
