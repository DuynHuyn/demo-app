<template>
  <div v-loading="loading">
    <div v-if="url" class="bgg2 bdrmd p4x">
      <div class="r rxs fic">
        <div class="ca">
          <b-icon name="document" size="20" class="db"></b-icon>
        </div>
        <div class="c">
          <p class="tssm fw6 wbba">{{ name }}</p>
        </div>
        <div class="ca">
          <b-button-icon
            xsmall
            ghost
            name="close"
            @click.prevent="handleDelete"
          />
        </div>
      </div>
    </div>
    <div
      v-else
      class="bgg2 cg6 hv:bgp1 bddsh hv:cp4 bdrsm p4x df fic fcc csp ovh tsa025s"
      @click.prevent="triggerUpload"
    >
      <p v-if="uploadMessage" class="mr2x">{{ uploadMessage }}</p>
      <b-icon name="share" :size="20"></b-icon>
    </div>
    <input
      ref="fileInput"
      type="file"
      accept="*/*"
      class="dn"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CommonDocumentUploader',
  props: {
    docId: {
      type: String,
      default: '',
    },
    docUrl: {
      type: String,
      default: '',
    },
    docName: { type: String, default: '' },
    uploadMessage: { type: String, default: '' },
    maxSize: {
      type: Number,
      default: 40 * 1024 * 1024,
    },
    private: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      id: '',
      url: '',
      loading: false,
      acceptedTypes: [
        'image/webp	',
        'image/png',
        'image/jpeg',
        'application/pdf',
      ],
    }
  },
  computed: {
    name(): string {
      return this.url.split('/').slice(-1).join('')
    },
  },
  watch: {
    docUrl(value) {
      this.url = value
    },
    docId(value) {
      this.id = value
    },
  },
  created() {
    this.url = this.docUrl
    this.id = this.docId
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
        formData.append('key', Date.now() + file.name)
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
        this.url = snapshot.url
        this.id = snapshot.id
        this.$message.error('Something went wrong!')
      } finally {
        this.loading = false
        this.$emit('loading', false)
      }

      this.$emit('change', { id: this.id, url: this.url })
    },
    handleDelete() {
      // Delete remote file logic if backend supported
      this.$emit('delete', { id: this.id, url: this.url })
    },
  },
})
</script>
