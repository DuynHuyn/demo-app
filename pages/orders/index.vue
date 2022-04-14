<template>
  <main>
    <page-header title="My Orders" />

    <b-card v-loading="$fetchState.pending">
      <div v-if="!isEmpty" slot="header" class="r rsm fic fce mbi2x">
        <div class="ca mb2x">
          <form @submit.prevent="handleSearch">
            <b-input
              v-model="searchKeyword"
              rounded
              placeholder="Order Code, Order Date"
              class="w280 bgw"
              prefix-class="pr0x"
            >
              <template #append>
                <b-button-icon
                  type="submit"
                  primary
                  name="search"
                  class="cg6"
                />
              </template>
            </b-input>
          </form>
        </div>
        <div class="ca mb2x">
          <grid-filtering-option
            rounded
            type="single"
            label="Status"
            field="status"
            :initial-value="filteringOptions.status[0].value"
            :options="filteringOptions.status"
            @change="handleFilter"
          />
        </div>
        <div class="ca mb2x">
          <grid-filtering-option
            rounded
            type="daterange"
            label="Order Date"
            field="createdAt"
            :initial-value="filteringOptions.createdAt[0].value"
            :options="filteringOptions.createdAt"
            @change="handleFilter"
          />
        </div>
      </div>
      <grid-empty-state v-if="isEmpty">
        <b-button
          primary
          native-tag="nuxt-link"
          :extend-props="{ to: '/orders/create' }"
          text="Create Order"
        />
      </grid-empty-state>
      <grid-no-data v-else-if="isNoData" />
      <section v-else>
        <div class="mxi6x mti6x">
          <b-table
            :data="ordersList.entities"
            :default-sort="{ prop: 'code', order: 'desc' }"
            @sort-change="handleSort"
          >
            <b-table-column
              fixed="left"
              prop="code"
              label="Order Code"
              width="170"
              sortable="custom"
            >
              <template #default="{ row }">
                <nuxt-link
                  :to="`/orders/detail/${row.id}`"
                  class="link-primary"
                  >{{ row.code }}</nuxt-link
                >
              </template>
            </b-table-column>
            <b-table-column label="Order Date" width="210">
              <template #default="{ row }">{{
                row.createdAt | datetime
              }}</template>
            </b-table-column>
            <b-table-column label="Expected Delivery Date" width="184">
              <template #default="{ row }">{{
                row.deliveryDate | date
              }}</template>
            </b-table-column>
            <b-table-column label="Delivery Address" min-width="320">
              <template #default="{ row }">{{
                [
                  row.deliveryAddress.address1,
                  row.deliveryAddress.city.value,
                  row.deliveryAddress.state.value,
                  row.deliveryAddress.zip,
                ]
                  .filter((i) => !!i)
                  .join(', ')
              }}</template>
            </b-table-column>
            <b-table-column prop="status" label="Status" width="120">
              <template #default="{ row }">
                <b-tag :type="statusType(row.status)">{{
                  statusText(row.status)
                }}</b-tag>
              </template>
            </b-table-column>
            <b-table-column
              prop="total"
              label="Total Amount"
              align="right"
              width="160"
            >
              <template #default="{ row }">
                {{ row.total | currency }}
              </template>
            </b-table-column>
            <b-table-column
              fixed="right"
              label="Actions"
              width="146"
              align="center"
            >
              <template #default="{ row }">
                <b-button
                  ghost
                  small
                  primary
                  native-tag="nuxt-link"
                  :extend-props="{ to: `/orders/detail/${row.id}` }"
                  >View Details</b-button
                >
              </template>
            </b-table-column>
          </b-table>
        </div>
        <b-pagination
          class="mt4x"
          :page-size="query.Length"
          :total="ordersList.total"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
        />
      </section>
    </b-card>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { format, subDays } from 'date-fns'
import { ListQueryObject } from '~/models/common'
import { OrdersList } from '~/models/order'
import { getStatusText, getStatusType } from '~/utils'

export default Vue.extend({
  name: 'OrderListPage',
  data() {
    const today = format(new Date(), 'MM/dd/yyyy')
    const past30days = format(subDays(new Date(), 30), 'MM/dd/yyyy')
    const past60days = format(subDays(new Date(), 60), 'MM/dd/yyyy')
    const past90days = format(subDays(new Date(), 90), 'MM/dd/yyyy')

    return {
      ordersList: {
        total: 0,
        entities: [],
      },
      query: {
        Search: '',
        Status: '',
        FromOrderDate: past30days,
        ToOrderDate: format(new Date(), 'MM/dd/yyyy'),
        Start: 0,
        Length: 10,
        OrderBy: 'code desc',
      },
      currentPage: 1,
      filteringOptions: {
        status: [
          { label: 'All', value: '' },
          { label: 'New', value: '0' },
          { label: 'Approved', value: '1' },
          { label: 'Delivering', value: '2' },
          { label: 'Delivered', value: '3' },
        ],
        createdAt: [
          {
            label: 'Past 30 days',
            value: [today, past30days],
          },
          {
            label: 'Past 60 days',
            value: [today, past60days],
          },
          {
            label: 'Past 90 days',
            value: [today, past90days],
          },
        ],
      },
      searchKeyword: '',
    } as {
      query: ListQueryObject
      ordersList: OrdersList
      currentPage: number
      filteringOptions: {
        status: { label: string; value: string }[]
        createdAt: { label: string; value: string[] }[]
      }
      searchKeyword: string
    }
  },
  async fetch() {
    this.ordersList = await this.$services.order.getOrders(this.query)
  },
  head: {
    title: 'My Orders',
  },
  computed: {
    isQueryDirty(): boolean {
      return this.query.Search !== '' || this.query.status !== ''
    },
    isEmpty(): boolean {
      return this.ordersList.total === 0 && !this.isQueryDirty
    },
    isNoData(): boolean {
      return this.ordersList.total === 0 && this.isQueryDirty
    },
  },
  methods: {
    handlePageChange(page: number) {
      this.query.Start = this.query.Length! * (page - 1)
      this.$fetch()
    },
    handleSearch() {
      this.query.Search = this.searchKeyword
      this.query.Start = 0
      this.currentPage = 1
      this.$fetch()
    },
    handleFilter({
      field,
      value,
    }: {
      field: string
      value: string | string[]
    }) {
      if (field === 'status') {
        this.query.Status = value === '' ? value : parseInt(value as string)
      }

      if (field === 'createdAt') {
        this.query.FromOrderDate = value[0]
        this.query.ToOrderDate = value[1]
      }

      this.query.Start = 0
      this.currentPage = 1
      this.$fetch()
    },
    handleSort({
      prop,
      order,
    }: {
      prop: string
      order: 'asc' | 'desc' | null
    }) {
      this.query.OrderBy = order === null ? '' : `${prop} ${order}`

      this.query.Start = 0
      this.currentPage = 1
      this.$fetch()
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
