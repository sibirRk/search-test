<template>
  <div id="app" class="app-wrapper">
    <SearchInput
      v-model="city"
    />
  </div>
</template>

<script>
import SearchInput from '@/components/Search-Input.vue';

export default {
  name: 'App',

  data() {
    return {
      city: {
        text: ''
      }
    }
  },
  
  created() {
    // this.$store.dispatch('getSuggestions', 'Моск');
  },
  
  components: {
    SearchInput
  },
}
</script>

<style lang="scss">
body {
  background-color: rgba(#000, 0.1);
}
.app-wrapper {
  width: 100%;

  .search-input {
    margin-left: auto;
    margin-right: auto;
  }

  * {
    box-sizing: border-box;
  }
}
</style>
