import { VueConstructor } from 'vue'

type VuelidateField = any
type Vue = any

type ValidationMessageGenerator = (
  field: VuelidateField,
  ...rest: any[]
) => string

interface ValidationMessages {
  [propName: string]: ValidationMessageGenerator
}

/**
 * Options for validation messages
 *
 * @param dirty {Boolean} Require the field to be dirty before returning an error. (default = true)
 * @param first {Number}  Limit the number of error messages that can be returned. (default = 1)
 */
interface VuelidateMessageOptions {
  dirty?: boolean
  first: number
}

const defaultOptions: VuelidateMessageOptions = {
  dirty: true,
  first: 1,
}

/**
 * Return the default validation message generators
 *
 * @param ctx {Vue} The Vue instance
 * @param field {string} The field name defined in i18n's vuelidate.fields
 */
const defaultMessages = function (ctx: any, field: string): ValidationMessages {
  const msgDecorator = (messageKey: string, ...rest: any[]) =>
    ctx.$t
      ? ctx.$t(`vuelidate.messages.${messageKey}`, [
          ctx.$t(`vuelidate.fields.${field}`),
          ...rest,
        ])
      : `The ${field} is invalid`

  return {
    alpha() {
      return msgDecorator('alpha')
    },
    alphaNum() {
      return msgDecorator('alphaNum')
    },
    between({ $params }: { $params: any }) {
      return msgDecorator('between', $params.between.min, $params.between.max)
    },
    containsAlphaAndNum() {
      return msgDecorator('containsAlphaAndNum')
    },
    containsCapital() {
      return msgDecorator('containsCapital')
    },
    containsSpecial() {
      return msgDecorator('containsSpecial')
    },
    email() {
      return msgDecorator('email')
    },
    existed() {
      return msgDecorator('existed')
    },
    integer() {
      return msgDecorator('integer')
    },
    notExisted() {
      return msgDecorator('notExisted')
    },
    numeric() {
      return msgDecorator('numeric')
    },
    minLength({ $params }: { $params: any }) {
      return msgDecorator('minLength', $params.minLength.min)
    },
    minValue({ $params }: { $params: any }) {
      return msgDecorator('minValue', $params.minValue.min)
    },
    maxValue({ $params }: { $params: any }) {
      return msgDecorator('maxValue', $params.maxValue.max)
    },
    maxLength({ $params }: { $params: any }) {
      return msgDecorator('maxLength', $params.maxLength.max)
    },
    required() {
      return msgDecorator('required')
    },
    requiredIf() {
      return msgDecorator('required')
    },
    sameAs({ $params }: { $params: any }) {
      return msgDecorator(
        'sameAs',
        ctx.$t(`vuelidate.fields.${$params.sameAs.eq}`)
      )
    },
    url() {
      return msgDecorator('url')
    },
    ipAddress() {
      return msgDecorator('ipAddress')
    },
    fullName() {
      return msgDecorator('fullName')
    },
    greaterThan({ $params }: { $params: any }) {
      return msgDecorator(
        'greaterThan',
        ctx.$t(`vuelidate.fields.${$params.greaterThan.gt}`)
      )
    },
    lessThan({ $params }: { $params: any }) {
      return msgDecorator(
        'lessThan',
        ctx.$t(`vuelidate.fields.${$params.lessThan.lt}`)
      )
    },
    dateGreaterThan({ $params }: { $params: any }) {
      return msgDecorator(
        'dateGreaterThan',
        ctx.$t(`vuelidate.fields.${$params.dateGreaterThan.gt}`)
      )
    },
    dateGreaterThanOrEqual({ $params }: { $params: any }) {
      return msgDecorator(
        'dateGreaterThan',
        ctx.$t(`vuelidate.fields.${$params.dateGreaterThanOrEqual.gte}`)
      )
    },
    dateLessThan({ $params }: { $params: any }) {
      return msgDecorator(
        'dateLessThan',
        ctx.$t(`vuelidate.fields.${$params.dateLessThan.lt}`)
      )
    },
    dateGreaterThanIf({ $params }: { $params: any }) {
      return msgDecorator(
        'dateGreaterThanIf',
        ctx.$t(`vuelidate.fields.${$params.dateGreaterThanIf.gti}`)
      )
    },
    timeGreaterThanIf({ $params }: { $params: any }) {
      return msgDecorator(
        'timeGreaterThanIf',
        ctx.$t(`vuelidate.fields.${$params.timeGreaterThanIf.gti}`)
      )
    },
    dateGreaterThanToday() {
      return msgDecorator('dateGreaterThanToday')
    },
  }
}

/**
 * Returns a function that accepts a Vuelidate field.
 * The return value of that function is an array of validation messages.
 *
 * @param messages {ValidationMessages}
 * @param opts {VuelidateMessageOptions}
 */
export function validationMessages(
  messages: ValidationMessages = {},
  opts?: VuelidateMessageOptions
): (fieldName: string, field: VuelidateField, ...args: any[]) => string[] {
  return function (this: Vue, fieldName, field, ...args) {
    const _messages: ValidationMessages = {
      ...defaultMessages(this, fieldName),
      ...messages,
    }

    opts = { ...defaultOptions, ...opts }
    if (field.$pending || (opts.dirty && !field.$dirty)) return []
    const isInvalid = (x: string) => x.charAt(0) !== '$' && field[x] === false
    const keys = Object.keys(field).filter(isInvalid).slice(0, opts.first)
    return keys.map((x) => {
      if (!_messages[x]) return 'Invalid'
      return _messages[x].call(this, field, ...args)
    })
  }
}

/**
 * Returns a function that accepts a Vuelidate field.
 * The return value of that function is one validation message (string).
 * An empty string is returned if the field is valid.
 *
 * @param messages {ValidationMessages}
 * @param opts {VuelidateMessageOptions}
 */
export function validationMessage(
  messages: ValidationMessages = {},
  opts?: VuelidateMessageOptions
): (fieldName: string, field: VuelidateField, ...args: any[]) => string {
  const mkMsgs = validationMessages(messages, { ...opts, first: 1 })
  return function (this: Vue, ...args) {
    return mkMsgs.apply(this, args)[0] || ''
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $validationMessage: (
      fieldName: string,
      field: VuelidateField,
      ...args: any[]
    ) => string
    $validationMessages: (
      fieldName: string,
      field: VuelidateField,
      ...args: any[]
    ) => string[]
  }
  interface Context {
    $validationMessage: (
      fieldName: string,
      field: VuelidateField,
      ...args: any[]
    ) => string
    $validationMessages: (
      fieldName: string,
      field: VuelidateField,
      ...args: any[]
    ) => string[]
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $validationMessage: (
      fieldName: string,
      field: VuelidateField,
      ...args: any[]
    ) => string
    $validationMessages: (
      fieldName: string,
      field: VuelidateField,
      ...args: any[]
    ) => string[]
  }
  // Global properties can be declared
  // on the `VueConstructor` interface
  interface VueConstructor {
    $validationMessage: (
      fieldName: string,
      field: VuelidateField,
      ...args: any[]
    ) => string
    $validationMessages: (
      fieldName: string,
      field: VuelidateField,
      ...args: any[]
    ) => string[]
  }
}

export default {
  install(Vue: VueConstructor) {
    Vue.prototype.$validationMessage = validationMessage()
    Vue.prototype.$validationMessages = validationMessages()
  },
}
