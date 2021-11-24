<template>
  <tr>
    <td v-for="(value, key, index) in item" :key="index">{{ value }}</td>
  </tr>
</template>

<script>
export default {
  name: "CommonTableRow",
  props: {
    item: Object,
  },
};
</script>
