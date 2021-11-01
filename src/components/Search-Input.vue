<template>
  <div class="search-input">
    <label class="search-input__label">
      <span class="search-input__label-text">Выберите город</span>
      <input
        class="search-input__input"
        type="text"
        :value="$attrs.value.text"
        v-debounce:300="search"
        v-click-outside="hideSuggestions"
        @focus="active = true"
        @input="inputHandler($event.target.value)"
      >
    </label>

    <div
      class="search-input__suggestions"
      v-if="active"
    >
      <template v-if="suggestions.length">
        <div
          class="search-input__suggestion"
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          @click.stop="selectSuggestion(suggestion)"
        >
          <span class="search-input__suggestion-title">{{ suggestion.text }}</span>
          <span class="search-input__suggestion-description">{{ suggestion.url }}</span>
        </div>
      </template>
      <template v-else>
        <div class="search-input__suggestion">Нет подходящих вариантов</div>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import vueDebounce from 'vue-debounce';
import ClickOutside from 'vue-click-outside';

Vue.use(vueDebounce, {
  listenTo: 'input'
});

export default {
  name: 'Search-Input',

  data() {
    return {
      active: false,
    }
  },

  computed: {
    suggestions() {
      return this.$store.getters.suggestions
    }
  },

  methods: {
    search(value) {
      if (value?.length >= 2) {
        this.$store.dispatch('getSuggestions', value);
      } else {
        this.$store.dispatch('getSuggestions', []);
      }
    },

    selectSuggestion(suggestion) {
      this.$emit('input', suggestion);
      this.active = false;
    },

    inputHandler(value) {
      this.$emit('input', { 
        text: value 
      })
    },

    hideSuggestions() {
      this.active = false;
    }
  },

  directives: {
    ClickOutside
  }
}
</script>

<style lang="scss">
.search-input {
  width: 300px;
  position: relative;

  &__label-text {
    display: block;
    color: rgba(#000000, 0.35);
    margin-bottom: 5px;
  }

  &__input {
    width: 100%;
    height: 40px;
    padding: 5px;
    padding-left: 40px;
    border: none;
    border-radius: 3px;
    background: #fff url(/images/magnifier.svg) no-repeat 10px 10px;
    background-size: 20px;

    &:focus-visible {
      outline: none;
    }
  }

  &__suggestions {
    position: absolute;
    width: 100%;
    top: calc(100% + 5px);
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 2px 2px 11px 2px rgba(34, 60, 80, 0.1);
  }

  &__suggestion {
    padding: 10px 20px;
    cursor: pointer;

    &:first-child {
      padding-top: 20px;
    }

    &:last-child {
      padding-bottom: 20px;
    }

    &-title {
      display: block;
      margin-bottom: 5px;
    }

    &-description {
      display: block;
      color: rgba(#000000, 0.35);
    }
  }
}
</style>