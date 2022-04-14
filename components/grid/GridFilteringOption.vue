<template>
  <div
    class="por csp bgg2 hv:bgg3 fc:bgg4 tsa025s"
    :class="[rounded ? 'bdrmax' : 'bdrmd']"
    @click="handleClick"
  >
    <div class="df py2x pl3x pr2x ovh tsmd por z1 pten">
      <div v-if="label" class="pr1x tw6">
        <slot name="label">{{ label }}:</slot>
      </div>
      <div>
        <slot name="value">{{ displayValue }}</slot>
      </div>
      <div class="pl1x">
        <b-icon name="action-down" size="12"></b-icon>
      </div>
    </div>
    <b-select
      v-if="['single'].includes(type)"
      ref="picker"
      v-model="value"
      class="w100p poa z0 t0x l0x op0p"
      @change="handleChange"
    >
      <b-option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      />
    </b-select>
    <b-select
      v-if="['multiple'].includes(type)"
      ref="picker"
      v-model="values"
      class="w100p poa z0 t0x l0x op0p"
      @change="handleChange"
    >
      <b-option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      />
    </b-select>
    <b-date-picker
      v-if="['daterange'].includes(type)"
      ref="picker"
      v-model="values"
      align="right"
      :type="type"
      :picker-options="pickerOptions"
      value-format="MM/dd/yyyy"
      class="w100p poa z0 t0x l0x op0p vih"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { isEqual } from 'lodash'
import { format } from 'date-fns'

export default Vue.extend({
  name: 'GridFilteringOption',
  props: {
    initialValue: {
      type: [String, Array, Number, Boolean],
      default: '',
    },
    type: {
      type: String,
      default: 'single',
    },
    field: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default() {
        return []
      },
    },
    label: {
      type: String,
      default: '',
    },
    width: {
      type: [Number, String],
      default: 120,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const disabledDate = (date: any) =>
      format(date, 'yyyy-MM-dd') > format(new Date(), 'yyyy-MM-dd')

    return {
      value: '',
      values: [],
      pickerOptions: { disabledDate },
    } as {
      value: any
      values: any
      pickerOptions: any
    }
  },
  computed: {
    displayValue(): string {
      const _options = this.options as { label: string; value: any }[]

      if (this.type === 'multiple') {
        return this.values
          .map((i: string) => _options.find((o) => o.value === i)?.label)
          .join(', ')
      }

      if (this.type === 'daterange') {
        const _label = _options.find((i) => isEqual(i.value, this.values))
          ?.label as string
        return _label || this.values.join(' - ')
      }

      if (this.type === 'single') {
        return _options.find((i) => i.value === this.value)?.label as string
      }

      return this.value
    },
  },
  created() {
    switch (this.type) {
      case 'radio':
        break
      case 'checkbox':
      case 'daterange':
        break
      default:
        break
    }

    if (['radio', 'single'].includes(this.type)) {
      this.value = this.initialValue
    }

    if (['daterange', 'checkbox', 'multiple'].includes(this.type)) {
      this.values = this.initialValue
    }

    if (this.type === 'daterange') {
      this.pickerOptions.shortcuts = this.options.map((i: any) => ({
        text: i.label,
        onClick(picker: any) {
          picker.$emit('pick', i.value)
        },
      }))
    }
  },
  methods: {
    handleClick() {
      if (this.type === 'daterange') {
        const _picker = this.$refs.picker as any
        _picker && _picker.focus()
      }
    },
    handleChange(value: string | string[]) {
      if (this.type === 'daterange') {
        ;(value as string[]).sort()
      }
      this.$emit('change', { field: this.field, value })
    },
  },
})
</script>
