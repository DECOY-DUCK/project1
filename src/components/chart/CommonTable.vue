<template>
  <table>
    <thead>
      <tr v-if="items">
        <th v-for="(value, key, index) in items[0]" :key="index">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <common-table-row
        v-for="(item, index) in items"
        :key="index"
        :item="item"
      />
    </tbody>
  </table>
</template>

<script>
import CommonTableRow from "@/components/chart/CommonTableRow.vue";

export default {
  components: { CommonTableRow },
  name: "CommonTable",
  props: {
    items: Array,
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px;
  border-bottom: 1px solid var(--color-light-grey);
}

tr {
  height: 2rem;
  background-color: var(--color-white);
  font-size: var(--font-small);
  font-weight: var(--weight-regular);
  line-height: 2rem;
  text-align: center;
}

td {
  line-height: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-top: 1px solid var(--color-light-white);
}

th {
  border-top: 1px solid var(--color-light-grey);
  background-color: var(--color-back);
  color: var(--color-dark-grey);
}

tr {
  transition: all 200ms ease-out;
}

tr:hover {
  background-color: var(--color-back);
}
</style>
