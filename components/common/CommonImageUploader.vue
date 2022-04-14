<template>
  <div>
    <div
      v-if="url"
      v-loading="loading"
      class="pos-relative bd-rds-sm ov-hidden"
      :style="`width: ${width}px; height: ${height}px;`"
    >
      <img
        :src="url"
        rounded
        width="size"
        class="object-fit-cover w-100p h-100p"
      />
      <b-button-icon
        small
        name="delete"
        class="pos-absolute t-2x r-2x"
        @click.prevent="handleDelete"
      ></b-button-icon>
    </div>
    <div
      v-else
      v-loading="loading"
      class="
        bg-grey-2
        bd-rds-sm
        d-flex
        items-center
        content-center
        clickable
        ov-hidden
      "
      :style="`width: ${width}px; height: ${height}px`"
      @click.prevent="triggerUpload"
    >
      <b-icon name="camera" :size="32" class="c-grey-6"></b-icon>
    </div>
    <input
      ref="fileInput"
      type="file"
      :accept="acceptedTypes.join(',')"
      class="d-none"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CommonImageUploader',
  props: {
    width: {
      type: Number,
      default: 108,
    },
    height: {
      type: Number,
      default: 108,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    imageId: {
      type: String,
      default: '',
    },
    maxSize: {
      type: Number,
      default: 4 * 1024 * 1024,
    },
    private: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: '',
      url: '',
      loading: false,
      acceptedTypes: [
        'image/webp	',
        'image/svg+xml',
        'image/png',
        'image/jpeg',
        'image/gif',
      ],
    }
  },
  watch: {
    imageUrl(value) {
      this.url = value
    },
    imageId(value) {
      this.id = value
    },
  },
  created() {
    this.url = this.imageUrl
    this.id = this.imageId
  },
  methods: {
    triggerUpload() {
      const el = this.$refs.fileInput as Element

      if (this.loading) {
        this.$message('Please waiting for upload complete!')
      } else {
        el.dispatchEvent(new MouseEvent('click'))
      }
    },
    async handleChange(event: any) {
      const snapshot = { id: this.id, url: this.url }
      const formData = new FormData()
      const file = event.target.files[0]

      if (!this.acceptedTypes.includes(file.type)) {
        this.$message('File type does not accept!')
        return false
      } else if (file.size >= this.maxSize) {
        this.$message('File size exceed limit!')
        return false
      } else {
        formData.append('file', file)
        formData.append('key', file.name + file.lastModified)
      }

      try {
        let result

        this.loading = true
        this.$emit('loading', true)
        this.url = ''
        this.id = ''

        if (this.private) {
          result = await this.$services.file.uploadPrivateFile(formData)
        } else {
          result = await this.$services.file.uploadFile(formData)
        }

        this.url = result.fileUrl
        this.id = result.id
      } catch (e) {
        this.id = snapshot.id
        this.url = snapshot.url
        this.$message.error('Something went wrong!')
      } finally {
        this.loading = false
        this.$emit('loading', false)
      }

      this.$emit('change', { id: this.id, url: this.url })
    },
    handleDelete() {
      this.$emit('delete', { id: this.id, url: this.url })
    },
  },
})
</script>
