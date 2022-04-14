<template>
  <client-only>
    <main
      ref="content"
      v-loading.fullscreen="busy"
      b-loading-background="#ffffff"
      class="p6x bg-white"
    >
      <page-header :title="`Order #${entity.code}`" hide-order-button />

      <fieldset class="bd1 bdrmd">
        <legend>
          <h4>Detail</h4>
        </legend>
        <div class="r mti4x">
          <div class="ca">
            <b-form-item label="Order Date">
              <b-form-item-text>{{
                entity.createdAt | datetime
              }}</b-form-item-text>
            </b-form-item>
          </div>
          <div class="ca">
            <b-form-item label="Expected Delivery Date">
              <b-form-item-text>{{
                entity.deliveryDate | date
              }}</b-form-item-text>
            </b-form-item>
          </div>
          <div v-if="entity.trackingNumber" class="ca">
            <b-form-item label="Tracking Number ">
              <b-form-item-text>{{ entity.trackingNumber }}</b-form-item-text>
            </b-form-item>
          </div>
          <div class="ca">
            <b-form-item label="Order Status">
              <b-form-item-text>{{
                statusText(entity.status)
              }}</b-form-item-text>
            </b-form-item>
          </div>
          <div class="ca">
            <b-form-item label="Payment Status">
              <b-form-item-text>{{ entity.paymentStatus }}</b-form-item-text>
            </b-form-item>
          </div>
        </div>
      </fieldset>

      <div class="r mt6x">
        <div class="c">
          <fieldset class="bd1 bdrmd">
            <legend>
              <h4 class="">Delivery Address</h4>
            </legend>
            <div class="r mti4x">
              <div class="c">
                <b-form-item label="Address">
                  <b-form-item-text>{{
                    formatedDeliveryAddress
                  }}</b-form-item-text>
                </b-form-item>
              </div>
              <div class="ca">
                <b-form-item label="Phone Number ">
                  <b-form-item-text>{{
                    entity.deliveryAddress.phone | mask('(X#) ###-###-####')
                  }}</b-form-item-text>
                </b-form-item>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="c">
          <fieldset class="bd1 bdrmd">
            <legend>
              <h4 class="">Billing Address</h4>
            </legend>
            <div class="r mti4x">
              <div class="c">
                <b-form-item label="Address">
                  <b-form-item-text>{{
                    formatedBillingAddress
                  }}</b-form-item-text>
                </b-form-item>
              </div>
              <div class="ca">
                <b-form-item label="Phone Number ">
                  <b-form-item-text>{{
                    entity.billingAddress.phone | mask('(X#) ###-###-####')
                  }}</b-form-item-text>
                </b-form-item>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <h2 class="mt6x">Products</h2>
      <div class="r rsm mt4x">
        <div class="c">
          <p class="fw6 tssm">Code</p>
        </div>
        <div class="c6">
          <p class="fw6 tssm">Name</p>
        </div>
        <div class="c">
          <p class="fw6 tssm">UOM</p>
        </div>
        <div class="c">
          <p class="fw6 tssm tac">Quantity</p>
        </div>
        <div class="c">
          <p class="fw6 tssm tar">Unit Price</p>
        </div>
        <div class="c">
          <p class="fw6 tssm tar">Total</p>
        </div>
        <div class="c12">
          <b-divider class="my-3x" />
        </div>
      </div>
      <div v-for="(i, idx) in entity.orderItems" :key="idx" class="r rsm">
        <div class="c">
          <p>{{ i.productCode }}</p>
        </div>
        <div class="c6">
          <p>{{ i.productName }}</p>
        </div>
        <div class="c">
          <p>{{ i.productUOMCode }}</p>
        </div>
        <div class="c tac">
          <p>{{ i.quantity }}</p>
        </div>
        <div class="c tar">
          <p>{{ i.price | currency }}</p>
        </div>
        <div class="c tar">
          <p>{{ (i.price * i.quantity) | currency }}</p>
        </div>

        <div class="c12">
          <b-divider class="my-3x" />
        </div>
      </div>

      <div class="r rsm">
        <div class="c6">
          <fieldset v-if="entity.notes" class="bd1 bdrmd mt6x">
            <legend>
              <h4>Notes</h4>
            </legend>
            <p class="lh150p mt2x">
              {{ entity.notes }}
            </p>
          </fieldset>
        </div>
        <div class="c1"></div>
        <div class="c5">
          <div class="r rsm mt6x">
            <div class="c5">
              <p class="">Sub total</p>
            </div>
            <div class="c pl0x">
              <p class="fw6 tar">{{ entity.subTotal | currency }}</p>
            </div>
          </div>
          <div class="r rsm mt3x">
            <div class="c5">
              <p class="">Delivery Fee</p>
            </div>
            <div class="c pl0x">
              <p class="fw6 tar">{{ entity.shippingFee | currency }}</p>
            </div>
          </div>
          <div class="r rsm mt3x">
            <div class="c5">
              <p class="">Tax</p>
            </div>
            <div class="c pl0x">
              <p class="fw6 tar">{{ entity.tax | currency }}</p>
            </div>
          </div>
          <b-divider class="my-3x" />
          <div class="r rsm tsxl fw6">
            <div class="c5">
              <p class="ttu">Total</p>
            </div>
            <div class="c pl0x">
              <p class="tar">{{ entity.total | currency }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import { jsPDF as JsPdf } from 'jspdf'
import { OrderDetail } from '~/models/order'
import { getStatusText } from '~/utils'

export default Vue.extend({
  name: 'OrderPdfPage',
  async asyncData({ params, $services, error }) {
    try {
      const entity = await $services.order.getOrder(params.id)
      return {
        entity,
      }
    } catch (_) {
      return error({ statusCode: 404, message: `Order not found` })
    }
  },
  data() {
    return { entity: {} as OrderDetail, busy: true }
  },
  head: {
    title: 'Order Details',
  },
  computed: {
    formatedDeliveryAddress(): string {
      const { address1, city, state, zip } = this.entity.deliveryAddress

      return [address1, city.value, state.value, zip].join(', ')
    },
    formatedBillingAddress(): string {
      const { address1, city, state, zip } = this.entity.billingAddress

      return [address1, city.value, state.value, zip].join(', ')
    },
  },
  updated() {
    this.handleExportToPdf()
  },
  methods: {
    statusText(status: number) {
      return getStatusText(status)
    },
    handleExportToPdf() {
      const elm = this.$refs.content as Element
      const css =
        '<style>[data-print-hidden]{display:none}[data-print-visible]{display:block!important}</style>'

      // Convert HTML to PDF
      new JsPdf().html(elm.innerHTML + css, {
        margin: 10,
        width: 192,
        windowWidth: 1200,
        callback: (d) => {
          d.save(`order_${this.entity.code}.pdf`)
          this.$router.back()
        },
      })
    },
  },
})
</script>
