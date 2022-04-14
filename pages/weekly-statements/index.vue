<template>
  <main>
    <page-header>
      <h1>Weekly Statements</h1>
    </page-header>

    <b-card class="mt-6x">
      <b-table
        :data="reportsData"
        :default-sort="{ prop: 'location', order: 'desc' }"
      >
        <b-table-column prop="weekEnding" label="Week Ending" />
        <b-table-column
          prop="location"
          label="Location"
          sortable
          :width="240"
        />
        <b-table-column prop="totalSales" label="Total Sales" />
        <b-table-column prop="salesOff" label="65% of Sales" />
        <b-table-column prop="totalExpenses" label="Total Expenses" />
        <b-table-column prop="totalProfits" label="Total Profits" />
        <b-table-column prop="actions" label="Actions" :width="150">
          <template slot-scope="scope">
            <b-button small @click="handleViewDetails(scope.$index, scope.row)"
              >View Details</b-button
            >
          </template>
        </b-table-column>
      </b-table>
      <b-pagination
        class="mt-2x"
        :page-size="20"
        :total="1000"
        @current-change="handleCurrentPageChange"
      />
    </b-card>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'WeeklyStatementsPage',
  meta: {
    breadcrumb: 'Weekly Statements',
  },
  data() {
    return {
      reportsData: [],
    }
  },
  head: {
    title: 'Weekly Statements',
  },
  methods: {
    handleViewDetails(index: Number) {
      this.$router.push(`/weekly-statements/details/${index}`)
    },
    handleCurrentPageChange() {},
  },
})
</script>
