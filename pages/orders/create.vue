<template>
  <main>
    <page-header title="New Order" show-back-button hide-order-button />

    <div class="r">
      <div class="lg:c8">
        <b-card>
          <div slot="header" class="r rsm fic fce">
            <div class="md:c">
              <h2>Your cart</h2>
            </div>
            <!-- <div class="ca mt3x md:mt0x">
              <form @submit.prevent="handleSearchInCart">
                <b-input
                  v-model="searchKeywordInCart"
                  rounded
                  placeholder="Searching for..."
                  class="w200"
                  input-class="fw6 tssm"
                >
                  <b-button-icon
                    slot="append"
                    type="submit"
                    primary
                    name="search"
                    class="myi025x"
                  />
                </b-input>
              </form>
            </div> -->
            <div class="ca mt3x md:mt0x">
              <b-button-group rounded class="bgg2">
                <b-button
                  ghost
                  primary
                  small
                  prefix-icon="control-plus"
                  @click.prevent="modalAddToCartVisible = true"
                  >New item</b-button
                >
                <b-button
                  ghost
                  danger
                  small
                  prefix-icon="delete"
                  @click.prevent="handleRemoveSelectedCartItems"
                  >Remove all selected</b-button
                >
              </b-button-group>
            </div>
          </div>
          <div class="mi6x">
            <b-table
              ref="cartTable"
              :data="filteredCart"
              empty-text="Your cart is empty"
              @selection-change="handleCartSelectionChange"
            >
              <b-table-column type="selection" width="58" align="right" />
              <b-table-column label="Product" min-width="240">
                <template #default="{ row }">
                  <h4>{{ row.name }}</h4>
                  <p class="df tsxs cg6 ttu">
                    <span>{{ row.code }}</span>
                    <span class="tusep mx1x cg5"></span>
                    <span>{{ row.category }}</span>
                    <span class="tusep mx1x cg5"></span>
                    <span>{{ row.uom }}</span>
                  </p>
                </template>
              </b-table-column>
              <b-table-column
                prop="quantity"
                label="Quantity"
                align="right"
                width="120"
              >
                <template #default="{ row }">
                  <b-numeric-input
                    v-model="row.quantity"
                    :min="1"
                    step-strictly
                    class="myi2x mxi6x"
                  />
                </template>
              </b-table-column>
              <b-table-column label="Unit Price" width="120" align="right">
                <template #default="{ row }">
                  {{ row.price | currency }}
                </template>
              </b-table-column>
              <b-table-column
                label="Total"
                width="120"
                align="right"
                class-name="fw6"
              >
                <template #default="{ row }">
                  {{ (row.quantity * row.price) | currency }}
                </template>
              </b-table-column>
            </b-table>
          </div>
        </b-card>
        <b-card class="mt6x lg:dn">
          <div class="r">
            <div class="c12 sm:c6">
              <b-form-item
                label="Delivery Date"
                topless
                :error="
                  $validationMessage('deliveryDate', $v.entity.deliveryDate)
                "
              >
                <b-date-picker
                  v-model="entity.deliveryDate"
                  :picker-options="{
                    disabledDate(value) {
                      const today = new Date()
                      const date = new Date(value)
                      return date < today || date.getDay() !== 5
                    },
                  }"
                  align="center"
                  format="MM/dd/yyyy"
                  placeholder="Choose the delivery date"
                />
              </b-form-item>
            </div>
          </div>
        </b-card>
        <b-card class="mt6x">
          <div class="df fic fcsb">
            <h2>Delivery Info</h2>
            <b-button
              small
              prefix-icon="write"
              text="Edit addresses"
              @click.prevent="modalChangeAddressesVisible = true"
            />
          </div>

          <div class="r">
            <div class="md:c6">
              <section class="bgg1 p4x bdrlg mt4x">
                <h4>Delivery Address</h4>
                <b-form-item label="Address">
                  <b-form-item-text :value="formattedDeliveryAddress" />
                </b-form-item>
                <b-form-item label="Phone Number">
                  <b-form-item-text :value="entity.deliveryAddress.phone" />
                </b-form-item>
              </section>
            </div>
            <div class="md:c6">
              <section class="bgg1 bdrlg p4x mt4x">
                <h4>Billing Address</h4>

                <b-form-item label="Address">
                  <b-form-item-text :value="formattedBillingAddress" />
                </b-form-item>

                <b-form-item label="Phone Number">
                  <b-form-item-text :value="entity.billingAddress.phone" />
                </b-form-item>
              </section>
            </div>
          </div>

          <b-form-item optional label="Notes">
            <b-input
              v-model="entity.notes"
              type="textarea"
              placeholder="Enter your notes"
              maxlength="1000"
              show-word-limit
              :autosize="{ minRows: 4, maxRows: 8 }"
            />
          </b-form-item>

          <b-form-item optional label="Payment">
            <common-document-uploader
              :doc-url="entity.paymentDocumentLink"
              upload-message="Charge on Statement"
              class="mt1x"
              @change="handlePaymentDocumentChange"
              @delete="handlePaymentDocumentDelete"
              @loading="handlePaymentDocumentLoading"
            />
          </b-form-item>
        </b-card>
      </div>
      <div class="lg:c4">
        <b-card class="dn lg:db">
          <b-form-item
            label="Delivery Date"
            topless
            :error="$validationMessage('deliveryDate', $v.entity.deliveryDate)"
          >
            <b-date-picker
              v-model="entity.deliveryDate"
              :picker-options="{
                disabledDate(value) {
                  const today = new Date()
                  const date = new Date(value)
                  return date < today || date.getDay() !== 5
                },
              }"
              align="center"
              format="MM/dd/yyyy"
              placeholder="Choose the delivery date"
            />
          </b-form-item>
        </b-card>
        <b-card class="mt6x">
          <h2>Pricing summary</h2>
          <div class="r mt4x">
            <div class="c6">
              <p class="tsmd mt2x">Subtotal</p>
            </div>
            <div class="c6">
              <p class="tsmd tar mt2x">{{ subTotalAmount | currency }}</p>
            </div>

            <div class="c6">
              <p class="tsmd mt2x">Delivery Fee</p>
            </div>
            <div class="c6">
              <p class="tsmd tar mt2x">{{ deliveryFee | currency }}</p>
            </div>

            <div class="c6">
              <p class="tsmd mt2x">Tax</p>
            </div>
            <div class="c6">
              <p class="tsmd tar mt2x">{{ taxAmount | currency }}</p>
            </div>
            <div class="c12">
              <div class="bgg2 bdrmd mxi4x mbi4x px4x py2x mt2x">
                <div class="r">
                  <div class="c6">
                    <p class="fw6 tsxl">Total</p>
                  </div>
                  <div class="c6">
                    <p class="fw6 tsxl tar">{{ totalAmount | currency }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-card>
        <div class="r fce">
          <div class="ca lg:c12">
            <b-button
              primary
              suffix-icon="arrow-right"
              :loading="busy"
              class="mt6x w100p"
              @click.prevent="handleSubmitOrder"
              >Submit Order</b-button
            >
          </div>
        </div>
      </div>
    </div>

    <modal-add-to-cart
      v-if="modalAddToCartVisible"
      :data="{
        products: refData.products,
        productCategories: refData.productCategories,
      }"
      @close="modalAddToCartVisible = false"
      @submit="handleAddCartItems"
    />
    <modal-change-addresses
      v-if="modalChangeAddressesVisible"
      :data="{
        deliveryAddress: entity.deliveryAddress,
        billingAddress: entity.billingAddress,
      }"
      @close="modalChangeAddressesVisible = false"
      @submit="handleChangeAddresses"
    />
  </main>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash'
import Vue from 'vue'
import { required } from 'vuelidate/lib/validators'
import { CategoryList, ProductList } from '~/models/catalog'
import { AddressObject } from '~/models/common'
import { CartItem, OrderDTO } from '~/models/order'
import ModalAddToCart from '~/partials/orders/ModalAddToCart.vue'
import ModalChangeAddresses from '~/partials/orders/ModalChangeAddresses.vue'

export default Vue.extend({
  name: 'OrderCreatePage',
  components: { ModalAddToCart, ModalChangeAddresses },
  meta: {
    breadcrumb: 'New Order',
  },
  // beforeRouteLeave(_, __, next) {
  //   const answer = window.confirm(
  //     'Do you really want to leave? You have unsaved changes!'
  //   )
  //   if (!answer) return false
  //   next()
  // },
  validations: {
    entity: {
      deliveryDate: { required },
    },
  },
  data() {
    return {
      busy: false,
      entity: {
        deliveryDate: '',
        notes: '',
        paymentDocumentLink: '',
        orderItems: [],
        deliveryAddress: {
          address1: '',
          city: {
            key: '',
            value: '',
          },
          state: {
            key: '',
            value: '',
          },
          zip: '',
          phone: '',
        },
        billingAddress: {
          address1: '',
          city: {
            key: '',
            value: '',
          },
          state: {
            key: '',
            value: '',
          },
          zip: '',
          phone: '',
        },
      },
      cart: [],
      selectedCartItems: [],
      searchKeywordInCart: '',
      modalAddToCartVisible: false,
      modalChangeAddressesVisible: false,
      formattedDeliveryAddress: '',
      formattedBillingAddress: '',
      refData: {
        products: {
          total: 0,
          entities: [],
        },
        productCategories: {
          total: 0,
          entities: [],
        },
      },
    } as {
      busy: boolean
      entity: OrderDTO
      cart: CartItem[]
      selectedCartItems: string[]
      searchKeywordInCart: string
      modalAddToCartVisible: boolean
      modalChangeAddressesVisible: boolean
      formattedDeliveryAddress: string
      formattedBillingAddress: string
      refData: {
        products: ProductList
        productCategories: CategoryList
      }
    }
  },
  async fetch() {
    const { state, dispatch } = this.$store

    if (!state.account.franchisee.fetched) {
      await dispatch('account/fetchFranchisee')
    }

    this.entity.deliveryAddress = cloneDeep(
      state.account.franchisee.data.deliveryInformation
    )
    this.entity.billingAddress = cloneDeep(
      state.account.franchisee.data.billingInformation
    )

    this.formattedDeliveryAddress = await this.formattedAddress(
      this.entity.deliveryAddress
    )
    this.formattedBillingAddress = await this.formattedAddress(
      this.entity.billingAddress
    )

    try {
      const productCategories =
        await this.$services.catalog.getProductCategories()
      productCategories && (this.refData.productCategories = productCategories)
    } catch {}

    try {
      const products = await this.$services.catalog.getProducts()
      products && (this.refData.products = products)
    } catch {}
  },
  head: {
    title: 'New Order',
  },
  computed: {
    filteredCart(): CartItem[] {
      return this.cart.filter((_) => true)
    },
    subTotalAmount(): number {
      return this.cart.reduce(
        (total, { price, quantity }) => total + price * quantity,
        0
      )
    },
    deliveryFee(): number {
      return 0
    },
    taxAmount(): number {
      return 0
    },
    totalAmount(): number {
      return this.subTotalAmount + this.deliveryFee + this.taxAmount
    },
  },
  methods: {
    async handleSubmitOrder() {
      if (this.cart.length === 0) {
        this.$message('Your cart is empty!')
        return false
      }

      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          this.busy = true
          this.entity.orderItems = this.cart.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
          }))
          const newOrderId = await this.$services.order.createOrder(this.entity)
          this.$router.push(`/orders/detail/${newOrderId}`)
        } catch (error) {
          this.$message.error(`${error}`)
        } finally {
          this.busy = false
        }
      }
    },
    handleSearchInCart() {},
    handleAddCartItems(payload: CartItem[]) {
      this.modalAddToCartVisible = false
      payload.forEach((i) => {
        const existed = this.cart.find((c) => c.id === i.id)

        if (existed) {
          existed.quantity += i.quantity
        } else {
          this.cart.push(i)
        }
      })
    },
    handleRemoveSelectedCartItems() {
      if (this.selectedCartItems.length) {
        this.cart = this.cart.filter(
          (i) => !this.selectedCartItems.includes(i.id)
        )
      } else {
        this.$message('You must select aleast one item!')
      }
    },
    handleCartSelectionChange(selectedItems: CartItem[]) {
      this.selectedCartItems = selectedItems.map((i) => i.id)
    },
    handlePaymentDocumentChange({ url }: { url: string }) {
      this.entity.paymentDocumentLink = url
    },
    handlePaymentDocumentDelete() {
      this.entity.paymentDocumentLink = ''
    },
    handlePaymentDocumentLoading(value: boolean) {
      this.busy = value
    },
    handleChangeAddresses(payload: {
      deliveryAddress: AddressObject
      billingAddress: AddressObject
    }) {
      this.modalChangeAddressesVisible = false
      this.entity.deliveryAddress = cloneDeep(payload.deliveryAddress)
      this.entity.billingAddress = cloneDeep(payload.billingAddress)
      this.formattedDeliveryAddress = this.formattedAddress(
        this.entity.deliveryAddress
      )
      this.formattedBillingAddress = this.formattedAddress(
        this.entity.billingAddress
      )
    },
    formattedAddress(address: AddressObject): string {
      const { state, city, zip, address1 } = address

      return [address1, city.value, state.value, zip]
        .filter((i) => !!i)
        .join(', ')
    },
  },
})
</script>
