<template>
  <main>
    <page-header title="Training" />
    <b-card class="mt6x">
      <div class="r mti4x">
        <div class="sm:c6 md:c">
          <b-form-item label="Country">
            <b-select v-model="countryCode">
              <b-option
                v-for="country in countries"
                :key="country.key"
                :value="country.key"
                :label="country.value"
              ></b-option>
            </b-select>
          </b-form-item>
        </div>
        <div class="sm:c6 md:c">
          <b-form-item label="State">
            <b-select
              v-model="stateCode"
              value-key="key"
              @change="handleStateChange"
            >
              <b-option
                v-for="state in states"
                :key="state.key"
                :value="state"
                :label="state.value"
              ></b-option>
            </b-select>
          </b-form-item>
        </div>
        <div class="sm:c6 md:c">
          <b-form-item label="City">
            <b-select
              v-model="cityCode"
              v-loading="cityLoading"
              b-loading-icon="loading"
              value-key="key"
            >
              <b-option
                v-for="city in cities"
                :key="city.key"
                :value="city"
                :label="city.value"
              ></b-option>
            </b-select>
          </b-form-item>
        </div>
        <div class="sm:c6 md:c">
          <b-form-item label="Phone Number">
            <b-phone-input
              :input-options="{ maxlength: 15 }"
              :auto-default-country="false"
              :only-countries="['US']"
              :value="phoneNumber"
              @change="(v) => (phoneNumber = v)"
            />
          </b-form-item>
        </div>
      </div>
    </b-card>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { Country, LocationLv1, LocationLv2 } from '~/models/common'

export default Vue.extend({
  name: 'TrainingPage',
  meta: {
    breadcrumb: 'Training',
  },
  data() {
    return {
      countryCode: '',
      stateCode: '',
      cityCode: '',
      countries: [],
      states: [],
      cities: [],
      cityLoading: false,
      phoneNumber: '',
    } as {
      countryCode: string
      stateCode: string
      cityCode: string
      countries: Country[]
      states: LocationLv1[]
      cities: LocationLv2[]
      cityLoading: boolean
      phoneNumber: string
    }
  },
  async fetch() {
    const countries = await this.$services.common.getCountries()
    const states = await this.$services.common.getLocationLv1s({
      CountryCode: countries[0].code,
    })
    const cities = await this.$services.common.getLocationLv3s({
      Level1Code: states[0].code,
    })

    this.countryCode = countries[0].code
    this.countries = countries
    this.states = states
    this.cities = cities
  },
  head: {
    title: 'Training',
  },
  methods: {
    async handleStateChange(value: string) {
      this.cityLoading = true
      this.cityCode = ''
      this.cities = await this.$services.common.getLocationLv3s({
        Level1Code: value,
      })
      this.cityLoading = false
    },
  },
})
</script>
