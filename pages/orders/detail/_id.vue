<template>
  <main v-loading.fullscreen="busy">
    <page-header
      title="Order Details"
      :sub-title="entity.code"
      show-back-button
    >
      <b-button
        small
        secondary
        prefix-icon="print"
        @click.prevent="handleExportToPdf"
        >Export to PDF</b-button
      >
    </page-header>

    <!-- <pre>
      {{ JSON.stringify(entity, null, 3) }}
    </pre> -->

    <div class="r">
      <div class="lg:c4 lg:fol">
        <b-card>
          <h2>Detail</h2>
          <div class="r mti2x">
            <div class="c6">
              <b-form-item label="Order Date">
                <b-data-value>{{ entity.createdAt | datetime }}</b-data-value>
              </b-form-item>
            </div>
            <div class="c6">
              <b-form-item label="Expected Delivery Date">
                <b-data-value>{{ entity.deliveryDate | date }}</b-data-value>
              </b-form-item>
            </div>

            <div class="c6">
              <b-form-item label="Order Status">
                <b-tag :type="statusType(entity.status)">{{
                  statusText(entity.status)
                }}</b-tag>
              </b-form-item>
            </div>
            <div class="c6">
              <b-form-item label="Payment Status">
                <b-tag v-if="entity.paymentStatus">{{
                  entity.paymentStatus
                }}</b-tag>
                <b-data-value v-else />
              </b-form-item>
            </div>
            <div v-if="entity.trackingNumber" class="c6">
              <b-form-item label="Tracking Number">
                <b-data-value>
                  <span>{{ entity.trackingNumber }}</span>
                  <b-button-icon
                    slot="suffix"
                    xsmall
                    secondary
                    name="copy"
                    class="ml1x"
                  />
                </b-data-value>
              </b-form-item>
            </div>
          </div>
        </b-card>
        <b-card class="mt6x dn lg:db">
          <h2>Pricing summary</h2>
          <div class="r mt4x">
            <div class="c6">
              <p class="tsmd mt2x">Subtotal</p>
            </div>
            <div class="c6">
              <p class="tsmd fw6 tar mt2x">{{ entity.subTotal | currency }}</p>
            </div>

            <div class="c6">
              <p class="tsmd mt2x">Delivery Fee</p>
            </div>
            <div class="c6">
              <p class="tsmd fw6 tar mt2x">
                {{ entity.shippingFee | currency }}
              </p>
            </div>

            <div class="c6">
              <p class="tsmd mt2x">Tax</p>
            </div>
            <div class="c6">
              <p class="tsmd fw6 tar mt2x">{{ entity.tax | currency }}</p>
            </div>
            <div class="c12">
              <div class="bgg2 bdrmd mxi4x mbi4x px4x py2x mt2x">
                <div class="r">
                  <div class="c6">
                    <p class="fw6 tsxl">Total</p>
                  </div>
                  <div class="c6">
                    <p class="fw6 tsxl tar">
                      {{ entity.total | currency }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-card>
      </div>
      <div class="lg:c8">
        <b-card class="mt-6x lg:mt0x">
          <h2>Products</h2>
          <div class="mxi6x">
            <b-table :data="entity.orderItems">
              <b-table-column label="Product" min-width="240">
                <template #default="{ row }">
                  <h4>{{ row.productName }}</h4>
                  <p class="df tsxs cg6 ttu">
                    <span>{{ row.productCode }}</span>
                    <span class="tusep mx1x cg5"></span>
                    <span>{{ row.productCategoryName }}</span>
                    <span class="tusep mx1x cg5"></span>
                    <span>{{ row.productUOMCode }}</span>
                  </p>
                </template>
              </b-table-column>
              <b-table-column prop="quantity" label="Quantity" align="center" />
              <b-table-column label="Unit Price" align="right">
                <template #default="{ row }">
                  {{ row.price | currency }}
                </template>
              </b-table-column>
              <b-table-column label="Total" align="right" class-name="fw6">
                <template #default="{ row }">
                  {{ (row.price * row.quantity) | currency }}
                </template>
              </b-table-column>
            </b-table>
          </div>
        </b-card>
        <b-card class="mt6x lg:dn">
          <h2>Pricing summary</h2>
          <div class="r mt4x">
            <div class="c6">
              <p class="tsmd mt2x">Subtotal</p>
            </div>
            <div class="c6">
              <p class="tsmd fw6 tar mt2x">{{ entity.subTotal | currency }}</p>
            </div>

            <div class="c6">
              <p class="tsmd mt2x">Delivery Fee</p>
            </div>
            <div class="c6">
              <p class="tsmd fw6 tar mt2x">
                {{ entity.shippingFee | currency }}
              </p>
            </div>

            <div class="c6">
              <p class="tsmd mt2x">Tax</p>
            </div>
            <div class="c6">
              <p class="tsmd fw6 tar mt2x">{{ entity.tax | currency }}</p>
            </div>
            <div class="c12">
              <div class="bgg2 bdrmd mxi4x mbi4x px4x py2x mt2x">
                <div class="r">
                  <div class="c6">
                    <p class="fw6 tsxl">Total</p>
                  </div>
                  <div class="c6">
                    <p class="fw6 tsxl tar">
                      {{ entity.total | currency }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-card>
        <b-card class="mt6x">
          <h2>Delivery Info</h2>
          <div class="r">
            <div class="md:c6">
              <section class="p4x bgg1 bdrmd mt4x">
                <h4>Delivery Address</h4>
                <b-form-item label="Address">
                  <b-data-value>{{ formatedDeliveryAddress }}</b-data-value>
                </b-form-item>
                <b-form-item label="Phone Number">
                  <b-data-value>
                    <a :href="`tel:${entity.deliveryAddress.phone}`">{{
                      entity.deliveryAddress.phone | mask('(X#) ###-###-####')
                    }}</a>
                  </b-data-value>
                </b-form-item>
              </section>
            </div>
            <div class="md:c6">
              <section class="p4x bgg1 bdrmd mt4x">
                <h4>Billing Address</h4>
                <b-form-item label="Address">
                  <b-data-value>{{ formatedBillingAddress }}</b-data-value>
                </b-form-item>
                <b-form-item label="Phone Number">
                  <b-data-value>
                    <a :href="`tel:${entity.billingAddress.phone}`">{{
                      entity.billingAddress.phone | mask('(X#) ###-###-####')
                    }}</a>
                  </b-data-value>
                </b-form-item>
              </section>
            </div>
            <div v-if="entity.notes" class="c">
              <b-form-item label="Notes">
                <div class="tsmd lh150p mt2x">
                  {{ entity.notes }}
                </div>
              </b-form-item>
            </div>
            <div v-if="entity.paymentDocumentLink" class="md:c6">
              <b-form-item label="Payment">
                <div class="bgg2 bdrmd p2x mt1x">
                  <div class="r rxs fic">
                    <div class="ca">
                      <b-icon
                        name="document"
                        size="20"
                        class="db ml1x"
                      ></b-icon>
                    </div>
                    <div class="c">
                      <p class="tssm fw6 wbba">
                        {{
                          entity.paymentDocumentLink
                            .split('/')
                            .slice(-1)
                            .join('')
                        }}
                      </p>
                    </div>
                    <div class="ca">
                      <b-button
                        small
                        ghost
                        primary
                        native-tag="a"
                        :href="entity.paymentDocumentLink"
                        target="blank"
                        text="View"
                      />
                    </div>
                  </div>
                </div>
              </b-form-item>
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { OrderDetail } from '~/models/order'
import { getStatusText, getStatusType } from '~/utils'

export default Vue.extend({
  name: 'OrderDetailPage',
  meta: {
    breadcrumb: 'Order Details',
  },
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
    return { entity: {} as OrderDetail, busy: false }
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
  methods: {
    handleExportToPdf() {
      this.$router.push(`/orders/pdf/${this.entity.id}`)
    },
    statusType(status: number) {
      return getStatusType(status)
    },
    statusText(status: number) {
      return getStatusText(status)
    },
  },
})
</script>
