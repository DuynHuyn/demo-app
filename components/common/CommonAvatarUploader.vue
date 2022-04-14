<template>
  <div v-loading="loading">
    <div v-if="url" class="pos-relative">
      <b-avatar :src="url" rounded :size="size"></b-avatar>
      <b-button-icon
        rounded
        name="camera"
        class="pos-absolute r-0x b-0x"
        @click.prevent="triggerUpload"
      ></b-button-icon>
    </div>
    <div
      v-else
      class="bg-grey-2 bd-rds-max d-flex items-center content-center clickable"
      :style="`width: ${size}px; height: ${size}px`"
      @click.prevent="triggerUpload"
    >
      <b-icon name="camera" :size="32" class="c-grey-6"></b-icon>
    </div>
    <input ref="fileInput" type="file" class="d-none" @change="handleChange" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CommonImageUploader from './CommonImageUploader.vue'

export default Vue.extend({
  name: 'CommonAvatarUploader',
  extends: CommonImageUploader,
  props: {
    size: {
      type: Number,
      default: 80,
    },
  },
})
</script>
