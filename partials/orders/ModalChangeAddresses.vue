<template>
  <b-modal visible center title="Change Addresses" @close="$emit('close')">
    <section v-loading="$fetchState.pending" class="bgg1 p4x bdrmd">
      <h3>Delivery Address</h3>
      <div class="r">
        <div class="md:c6">
          <b-form-item
            label="Country"
            :error="$validationMessage('country', $v.deliveryAddress.country)"
          >
            <b-select v-model="deliveryAddress.country">
              <b-option
                v-for="country in refData.countries"
                :key="country.key"
                :label="country.value"
                :value="country.key"
              ></b-option>
            </b-select>
          </b-form-item>
        </div>
        <div class="md:c6">
          <b-form-item
            label="State"
            :error="$validationMessage('state', $v.deliveryAddress.state)"
          >
            <b-select
              v-model="deliveryAddress.state"
              value-key="key"
              @change="handleDStatesChange"
            >
              <b-option
                v-for="state in refData.states"
                :key="state.key"
                :label="state.value"
                :value="state"
              ></b-option>
            </b-select>
          </b-form-item>
        </div>
        <div class="md:c6">
          <b-form-item
            label="City"
            :error="$validationMessage('city', $v.deliveryAddress.city)"
          >
            <b-select
              v-model="deliveryAddress.city"
              v-loading="dCityLoading"
              b-loading-icon="loading"
              value-key="key"
            >
              <b-option
                v-for="city in refData.dCities"
                :key="city.key"
                :label="city.value"
                :value="city"
              ></b-option>
            </b-select>
          </b-form-item>
        </div>
        <div class="c6 md:c3">
          <b-form-item
            label="Zip code"
            :error="$validationMessage('zip', $v.deliveryAddress.zip)"
          >
            <b-input
              v-model="deliveryAddress.zip"
              maxlength="8"
              @keypress="handleZipKeyPress($event)"
              @paste.prevent
            ></b-input>
          </b-form-item>
        </div>
        <div class="c12">
          <b-form-item
            label="Address"
            :error="$validationMessage('address1', $v.deliveryAddress.address1)"
          >
            <b-input
              v-model="deliveryAddress.address1"
              placeholder="Enter address"
            ></b-input>
          </b-form-item>
        </div>
        <div class="md:c6">
          <b-form-item
            label="Phone"
            :error="$validationMessage('phone', $v.deliveryAddress.phone)"
          >
            <b-phone-input
              placeholder="Enter phone number"
              :input-options="{ maxlength: 12 }"
              :auto-default-country="false"
              :only-countries="['US']"
              :value="deliveryAddress.phone"
              @change="(v) => (deliveryAddress.phone = v)"
            ></b-phone-input>
          </b-form-item>
        </div>
      </div>
    </section>

    <section v-loading="$fetchState.pending" class="bgg1 p4x bdrmd mt4x">
      <div class="df fcsb">
        <h3>Billing Address</h3>
        <b-switch
          v-model="isSameAsDeliveryAddress"
          active-text="Same as delivery address"
        />
      </div>

      <div v-if="!isSameAsDeliveryAddress" class="r">
        <div class="md:c6">
          <b-form-item
            label="Country"
            :error="$validationMessage('country', $v.billingAddress.country)"
          >
            <b-select v-model="billingAddress.country">
              <b-option
                v-for="country in refData.countries"
                :key="country.key"
                :label="country.value"
                :value="country.key"
              ></b-option>
            </b-select>
          </b-form-item>
        </div>
        <div class="md:c6">
          <b-form-item
            label="State"
            :error="$validationMessage('state', $v.billingAddress.state)"
          >
            <b-select
              v-model="billingAddress.state"
              value-key="key"
              @change="handleBStatesChange"
            >
              <b-option
                v-for="state in refData.states"
                :key="state.key"
                :label="state.value"
                :value="state"
              ></b-option>
            </b-select>
          </b-form-item>
        </div>
        <div class="md:c6">
          <b-form-item
            label="City"
            :error="$validationMessage('city', $v.billingAddress.city)"
          >
            <b-select
              v-model="billingAddress.city"
              v-loading="bCityLoading"
              b-loading-icon="loading"
              value-key="key"
            >
              <b-option
                v-for="city in refData.bCities"
                :key="city.key"
                :label="city.value"
                :value="city"
              ></b-option>
            </b-select>
          </b-form-item>
        </div>
        <div class="md:c3">
          <b-form-item
            label="Zip code"
            :error="$validationMessage('zip', $v.billingAddress.zip)"
          >
            <b-input
              v-model="billingAddress.zip"
              maxlength="8"
              @keypress="handleZipKeyPress($event)"
              @paste.prevent
            ></b-input>
          </b-form-item>
        </div>
        <div class="c12">
          <b-form-item
            label="Address"
            :error="$validationMessage('address1', $v.billingAddress.address1)"
          >
            <b-input
              v-model="billingAddress.address1"
              placeholder="Enter address"
            ></b-input>
          </b-form-item>
        </div>
        <div class="md:c6">
          <b-form-item
            label="Phone"
            :error="$validationMessage('phone', $v.billingAddress.phone)"
          >
            <b-phone-input
              placeholder="Enter phone number"
              :input-options="{ maxlength: 12 }"
              :auto-default-country="false"
              :only-countries="['US']"
              :value="billingAddress.phone"
              @change="(v) => (billingAddress.phone = v)"
            ></b-phone-input>
          </b-form-item>
        </div>
      </div>
    </section>
    <div class="r rsm mt6x">
      <div class="ca">
        <b-button secondary @click.prevent="handleReset"
          >Reset to default</b-button
        >
      </div>
      <div class="c"></div>
      <div class="ca">
        <b-button @click.prevent="$emit('close')">Cancel</b-button>
      </div>
      <div class="ca">
        <b-button primary @click.prevent="handleSubmit">Save changes</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { cloneDeep, isEqual } from 'lodash'
import Vue from 'vue'
import { mapState } from 'vuex'
import { required, maxLength, numeric } from 'vuelidate/lib/validators'
import {
  AddressObject,
  Country,
  LocationLv1,
  LocationLv2,
} from '~/models/common'
export default Vue.extend({
  name: 'ModalChangeAddresses',
  props: {
    data: {
      type: Object,
      default() {
        return {
          deliveryAddress: {},
          billingAddress: {},
        }
      },
    },
  },
  validations(): any {
    const deliveryAddress = {
      firstName: {
        required,
        maxLength: maxLength(50),
      },
      lastName: {
        required,
        maxLength: maxLength(50),
      },
      companyName: {
        required,
        maxLength: maxLength(100),
      },
      phone: {
        required,
      },
      address1: {
        required,
        maxLength: maxLength(200),
      },
      country: {
        required,
      },
      city: {
        required,
        maxLength: maxLength(100),
      },
      state: {
        required,
        maxLength: maxLength(50),
      },
      zip: {
        required,
        numeric,
      },
    }

    return this.isSameAsDeliveryAddress
      ? {
          deliveryAddress,
        }
      : {
          deliveryAddress,
          billingAddress: cloneDeep(deliveryAddress),
        }
  },
  data() {
    return {
      deliveryAddress: {
        address1: '',
        country: '',
        state: {
          key: '',
          value: '',
        },
        city: {
          key: '',
          value: '',
        },
        zip: '',
        phone: '',
      },
      billingAddress: {
        address1: '',
        country: '',
        state: {
          key: '',
          value: '',
        },
        city: {
          key: '',
          value: '',
        },
        zip: '',
        phone: '',
      },
      isSameAsDeliveryAddress: false,
      bCityLoading: false,
      dCityLoading: false,
      refData: {
        countries: [],
        states: [],
        dCities: [],
        bCities: [],
      },
    } as {
      deliveryAddress: AddressObject
      billingAddress: AddressObject
      isSameAsDeliveryAddress: boolean
      bCityLoading: boolean
      dCityLoading: boolean
      refData: {
        countries: Country[]
        states: LocationLv1[]
        dCities: LocationLv2[]
        bCities: LocationLv2[]
      }
    }
  },
  async fetch() {
    const { country, state: dState } = this.deliveryAddress
    const { state: bState } = this.billingAddress

    if (isEqual(this.deliveryAddress, this.billingAddress)) {
      this.isSameAsDeliveryAddress = true
    }

    this.refData.countries = await this.$services.common.getCountries()
    this.refData.states = await this.$services.common.getLocationLv1s({
      CountryCode: country || 'US',
    })
    this.refData.dCities = await this.$services.common.getLocationLv3s({
      Level1Code: dState.key,
    })
    this.refData.bCities = await this.$services.common.getLocationLv3s({
      Level1Code: bState.key,
    })
  },
  fetchOnServer: false,
  computed: {
    ...mapState('account', ['franchisee']),
  },
  created() {
    this.deliveryAddress = cloneDeep(this.data.deliveryAddress)
    this.billingAddress = cloneDeep(this.data.billingAddress)
  },
  methods: {
    handleSubmit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const payload = {
          deliveryAddress: this.deliveryAddress,
          billingAddress: this.isSameAsDeliveryAddress
            ? this.deliveryAddress
            : this.billingAddress,
        }

        this.$emit('submit', payload)
      }
    },
    handleReset() {
      const payload = {
        deliveryAddress: this.franchisee.data.deliveryInformation,
        billingAddress: this.franchisee.data.billingInformation,
      }

      this.$emit('submit', payload)
    },
    // async handleIsSameAsDeliveryAddressChange(value: boolean) {
    //   if (value) {
    //     this.billingAddress = cloneDeep(this.deliveryAddress)
    //     this.refData.bCities = await this.$services.common.getLocationLv3s({
    //       Level1Code: this.billingAddress.state,
    //     })
    //   }
    // },
    async handleDStatesChange(value: { key: string; value: string }) {
      this.dCityLoading = true
      this.deliveryAddress.city = {
        key: '',
        value: '',
      }
      this.refData.dCities = await this.$services.common.getLocationLv3s({
        Level1Code: value.key,
      })
      this.dCityLoading = false
    },
    async handleBStatesChange(value: { key: string; value: string }) {
      this.bCityLoading = true
      this.billingAddress.city = {
        key: '',
        value: '',
      }
      this.refData.bCities = await this.$services.common.getLocationLv3s({
        Level1Code: value.key,
      })
      this.bCityLoading = false
    },
    handleZipKeyPress(e: KeyboardEvent) {
      const acceptedKeys = [...Array(10).keys()].map((i) => i.toString())

      if (!acceptedKeys.includes(e.key)) {
        e.preventDefault()
      }
    },
  },
})
</script>
