<template>
  <main v-loading="$fetchState.pending || loading">
    <page-header title="Franchisee Details" />
    <div class="r">
      <div class="lg:c8">
        <b-card class="mb6x lg:dn">
          <h2>Detail</h2>
          <div class="row">
            <div class="col">
              <b-form-item label="Franchisee Name">
                <b-form-item-text :value="entity.name" />
              </b-form-item>
            </div>
            <div class="col">
              <b-form-item label="Contract Start Date">
                <b-form-item-text :value="entity.contractStartDate | date" />
              </b-form-item>
            </div>
          </div>
        </b-card>
        <b-card>
          <h2>Delivery Address</h2>
          <div class="r">
            <div class="md:c6 lg:c3">
              <b-form-item
                label="First Name"
                :error="
                  $validationMessage(
                    'firstName',
                    $v.entity.deliveryInformation.firstName
                  )
                "
              >
                <b-input
                  v-model="entity.deliveryInformation.firstName"
                  placeholder="Enter your first name"
                />
              </b-form-item>
            </div>

            <div class="md:c6 lg:c3">
              <b-form-item
                label="Last Name"
                :error="
                  $validationMessage(
                    'lastName',
                    $v.entity.deliveryInformation.lastName
                  )
                "
              >
                <b-input
                  v-model="entity.deliveryInformation.lastName"
                  placeholder="Enter your last name"
                />
              </b-form-item>
            </div>
            <div class="c12"></div>
            <div class="md:c6">
              <b-form-item
                label="Company Name"
                info="Please enter N/A if there is no company name"
                :error="
                  $validationMessage(
                    'companyName',
                    $v.entity.deliveryInformation.companyName
                  )
                "
              >
                <b-input
                  v-model="entity.deliveryInformation.companyName"
                  placeholder="Enter your company name"
                />
              </b-form-item>
            </div>
            <div class="md:c6">
              <b-form-item
                label="Phone Number"
                :error="
                  $validationMessage(
                    'phone',
                    $v.entity.deliveryInformation.phone
                  )
                "
              >
                <b-phone-input
                  placeholder="Enter your phone number"
                  :input-options="{ maxlength: 12 }"
                  :auto-default-country="false"
                  :only-countries="['US']"
                  :value="entity.deliveryInformation.phone"
                  @change="(v) => (entity.deliveryInformation.phone = v)"
                />
              </b-form-item>
            </div>
            <div class="sm:c6 md:c">
              <b-form-item
                label="Country"
                :error="
                  $validationMessage(
                    'country',
                    $v.entity.deliveryInformation.country
                  )
                "
              >
                <b-select v-model="entity.deliveryInformation.country">
                  <b-option
                    v-for="country in dCountries"
                    :key="country.key"
                    :value="country.key"
                    :label="country.value"
                  ></b-option>
                </b-select>
              </b-form-item>
            </div>
            <div class="sm:c6 md:c">
              <b-form-item
                label="State"
                :error="
                  $validationMessage(
                    'state',
                    $v.entity.deliveryInformation.state
                  )
                "
              >
                <b-select
                  v-model="entity.deliveryInformation.state"
                  value-key="key"
                  @change="handleDStatesChange"
                >
                  <b-option
                    v-for="state in dStates"
                    :key="state.key"
                    :value="state"
                    :label="state.value"
                  ></b-option>
                </b-select>
              </b-form-item>
            </div>
            <div class="sm:c6 md:c">
              <b-form-item
                label="City"
                :error="
                  $validationMessage('city', $v.entity.deliveryInformation.city)
                "
              >
                <b-select
                  v-model="entity.deliveryInformation.city"
                  v-loading="dCityLoading"
                  b-loading-icon="loading"
                  value-key="key"
                >
                  <b-option
                    v-for="city in dCities"
                    :key="city.key"
                    :value="city"
                    :label="city.value"
                  ></b-option>
                </b-select>
              </b-form-item>
            </div>
            <div class="sm:c6 md:ca md:wmx120">
              <b-form-item
                label="Zip code"
                :error="
                  $validationMessage('zip', $v.entity.deliveryInformation.zip)
                "
              >
                <b-input
                  v-model="entity.deliveryInformation.zip"
                  maxlength="8"
                  @keypress="handleZipKeyPress($event)"
                  @paste.prevent
                />
              </b-form-item>
            </div>
            <div class="c12">
              <b-form-item
                label="Address"
                :error="
                  $validationMessage(
                    'address1',
                    $v.entity.deliveryInformation.address1
                  )
                "
              >
                <b-input
                  v-model="entity.deliveryInformation.address1"
                  placeholder="Enter your address"
                />
              </b-form-item>
            </div>
          </div>
        </b-card>
        <b-card class="mt6x">
          <div class="row items-center">
            <div class="col">
              <h2>Billing Address</h2>
            </div>
            <div class="col-auto">
              <b-switch
                v-model="isSameAsDeliveryAddress"
                active-text="Same as delivery address"
              />
            </div>
          </div>
          <div v-if="!isSameAsDeliveryAddress" class="r">
            <div class="md:c6 lg:c3">
              <b-form-item
                label="First Name"
                :error="
                  $validationMessage(
                    'firstName',
                    $v.entity.billingInformation.firstName
                  )
                "
              >
                <b-input
                  v-model="entity.billingInformation.firstName"
                  placeholder="Enter your first name"
                />
              </b-form-item>
            </div>
            <div class="md:c6 lg:c3">
              <b-form-item
                label="Last Name"
                :error="
                  $validationMessage(
                    'lastName',
                    $v.entity.billingInformation.lastName
                  )
                "
              >
                <b-input
                  v-model="entity.billingInformation.lastName"
                  placeholder="Enter your last name"
                />
              </b-form-item>
            </div>
            <div class="c12"></div>
            <div class="md:c6">
              <b-form-item
                label="Company Name"
                info="Please enter N/A if there is no company name"
                :error="
                  $validationMessage(
                    'companyName',
                    $v.entity.billingInformation.companyName
                  )
                "
              >
                <b-input
                  v-model="entity.billingInformation.companyName"
                  placeholder="Enter your company name"
                />
              </b-form-item>
            </div>
            <div class="md:c6">
              <b-form-item
                label="Phone Number"
                :error="
                  $validationMessage(
                    'phone',
                    $v.entity.billingInformation.phone
                  )
                "
              >
                <b-phone-input
                  placeholder="Enter your phone number"
                  :input-options="{ maxlength: 12 }"
                  :auto-default-country="false"
                  :only-countries="['US']"
                  :value="entity.billingInformation.phone"
                  @change="(v) => (entity.billingInformation.phone = v)"
                />
              </b-form-item>
            </div>
            <div class="sm:c6 md:c">
              <b-form-item
                label="Country"
                :error="
                  $validationMessage(
                    'country',
                    $v.entity.billingInformation.country
                  )
                "
              >
                <b-select v-model="entity.billingInformation.country">
                  <b-option
                    v-for="country in bCountries"
                    :key="country.key"
                    :value="country.key"
                    :label="country.value"
                  ></b-option>
                </b-select>
              </b-form-item>
            </div>
            <div class="sm:c6 md:c">
              <b-form-item
                label="State"
                :error="
                  $validationMessage(
                    'state',
                    $v.entity.billingInformation.state
                  )
                "
              >
                <b-select
                  v-model="entity.billingInformation.state"
                  value-key="key"
                  @change="handleBStatesChange"
                >
                  <b-option
                    v-for="state in bStates"
                    :key="state.key"
                    :value="state"
                    :label="state.value"
                  ></b-option>
                </b-select>
              </b-form-item>
            </div>
            <div class="sm:c6 md:c">
              <b-form-item
                label="City"
                :error="
                  $validationMessage('city', $v.entity.billingInformation.city)
                "
              >
                <b-select
                  v-model="entity.billingInformation.city"
                  v-loading="bCityLoading"
                  b-loading-icon="loading"
                  value-key="key"
                >
                  <b-option
                    v-for="city in bCities"
                    :key="city.key"
                    :value="city"
                    :label="city.value"
                  ></b-option>
                </b-select>
              </b-form-item>
            </div>
            <div class="sm:c6 md:ca md:wmx120">
              <b-form-item
                label="Zip code"
                :error="
                  $validationMessage('zip', $v.entity.billingInformation.zip)
                "
              >
                <b-input
                  v-model="entity.billingInformation.zip"
                  maxlength="8"
                  @keypress="handleZipKeyPress($event)"
                  @paste.prevent
                />
              </b-form-item>
            </div>
            <div class="c12">
              <b-form-item
                label="Address"
                :error="
                  $validationMessage(
                    'address1',
                    $v.entity.billingInformation.address1
                  )
                "
              >
                <b-input
                  v-model="entity.billingInformation.address1"
                  placeholder="Enter your address"
                />
              </b-form-item>
            </div>
          </div>
        </b-card>
      </div>
      <div class="lg:c4">
        <b-card class="dn lg:db">
          <h2>Detail</h2>
          <div class="row">
            <div class="col">
              <b-form-item label="Franchisee Name">
                <b-form-item-text :value="entity.name" />
              </b-form-item>
            </div>
            <div class="col">
              <b-form-item label="Contract Start Date">
                <b-form-item-text :value="entity.contractStartDate | date" />
              </b-form-item>
            </div>
          </div>
        </b-card>
        <div class="r fce">
          <div class="ca lg:c12">
            <b-button
              primary
              class="mt6x w100p"
              :loading="busy"
              @click="handleSubmit"
              >Save Changes</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { required, maxLength, numeric } from 'vuelidate/lib/validators'
import { cloneDeep, isEqual } from 'lodash'
import { FranchiseeObject } from '~/models/account'
import { Country, LocationLv1, LocationLv2 } from '~/models/common'

export default Vue.extend({
  name: 'FranchiseeDetailsPage',
  meta: {
    breadcrumb: 'Franchisee Details',
  },

  data() {
    return {
      busy: false,
      entity: {
        storeInformation: {
          code: '',
          name: '',
        },
        name: '',
        contractStartDate: '',
        billingInformation: {
          firstName: '',
          lastName: '',
          companyName: '',
          phone: '',
          address1: '',
          address2: '',
          city: {
            key: '',
            value: '',
          },
          state: {
            key: '',
            value: '',
          },
          zip: '',
          country: '',
        },
        deliveryInformation: {
          firstName: '',
          lastName: '',
          companyName: '',
          phone: '',
          address1: '',
          address2: '',
          city: {
            key: '',
            value: '',
          },
          state: {
            key: '',
            value: '',
          },
          zip: '',
          country: '',
        },
      },
      dCountries: [],
      dStates: [],
      dCities: [],
      dCityLoading: false,
      bCountries: [],
      bStates: [],
      bCities: [],
      bCityLoading: false,
      isSameAsDeliveryAddress: false,
    } as {
      busy: boolean
      entity: FranchiseeObject
      dCountries: Country[]
      dStates: LocationLv1[]
      dCities: LocationLv2[]
      dCityLoading: boolean
      bCountries: Country[]
      bStates: LocationLv1[]
      bCities: LocationLv2[]
      bCityLoading: boolean
      isSameAsDeliveryAddress: boolean
    }
  },
  async fetch() {
    if (!this.$store.getters['account/isFetched']) {
      try {
        await this.$store.dispatch('account/fetchFranchisee')
      } catch (error) {
        this.$message.error(`${error}`)
      }
    }

    this.entity = cloneDeep(this.$store.state.account.franchisee.data)

    const countries = await this.$services.common.getCountries()
    const states = await this.$services.common.getLocationLv1s({
      CountryCode: this.entity.deliveryInformation.country,
    })
    const dCities = await this.$services.common.getLocationLv3s({
      Level1Code: this.entity.deliveryInformation.state.key,
    })
    const bCities = await this.$services.common.getLocationLv3s({
      Level1Code: this.entity.billingInformation.state.key,
    })

    this.dCountries = countries
    this.dStates = states
    this.dCities = dCities

    this.bCountries = countries
    this.bStates = states
    this.bCities = bCities

    if (
      isEqual(this.entity.deliveryInformation, this.entity.billingInformation)
    ) {
      this.isSameAsDeliveryAddress = true
    }
  },
  validations(): any {
    const deliveryInformation = {
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
          entity: {
            deliveryInformation,
          },
        }
      : {
          entity: {
            deliveryInformation,
            billingInformation: cloneDeep(deliveryInformation),
          },
        }
  },
  head: {
    title: 'Franchisee Details',
  },
  computed: {
    ...mapState('account', ['franchisee']),
  },
  methods: {
    ...mapActions('account', ['fetchFranchisee']),
    async handleSubmit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        try {
          this.busy = true
          await this.$services.account.updateFranchisee({
            deliveryInformation: this.entity.deliveryInformation,
            billingInformation: this.isSameAsDeliveryAddress
              ? this.entity.deliveryInformation
              : this.entity.billingInformation,
          })

          await this.fetchFranchisee()

          this.entity = cloneDeep(this.franchisee.data)
          this.$fetch()

          if (
            isEqual(
              this.entity.deliveryInformation,
              this.entity.billingInformation
            )
          ) {
            this.isSameAsDeliveryAddress = true
          }
        } catch (error) {
          this.$message.error(`${error}`)
        } finally {
          this.busy = false
        }
      }
    },
    // async handleIsSameAsDeliveryAddressChange(value: boolean) {
    //   if (value) {
    //     this.entity.billingInformation = cloneDeep(
    //       this.entity.deliveryInformation
    //     )
    //     this.bCities = await this.$services.common.getLocationLv3s({
    //       Level1Code: this.entity.billingInformation.state,
    //     })
    //   }
    // },
    async handleDStatesChange(value: { key: string; value: string }) {
      this.dCityLoading = true
      this.entity.deliveryInformation.city = {
        key: '',
        value: '',
      }
      this.dCities = await this.$services.common.getLocationLv3s({
        Level1Code: value.key,
      })
      this.dCityLoading = false
    },
    async handleBStatesChange(value: { key: string; value: string }) {
      this.bCityLoading = true
      this.entity.billingInformation.city = {
        key: '',
        value: '',
      }
      this.bCities = await this.$services.common.getLocationLv3s({
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
