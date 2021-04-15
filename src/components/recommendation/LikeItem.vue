<template>
  <div class="item-feature" v-show="!simulatorState">
    <button
      type="button"
      class="like-btn"
      :class="[indexLiked !== -1 ? 'border-red' : 'border-gray']"
      @click="handleItemLiked"
    >
      <span v-show="indexLiked !== -1"><i class="like-icon heart-red fas fa-heart"></i></span>
      <span v-show="indexLiked == -1"><i class="like-icon heart-gray far fa-heart"></i></span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    item: Object,
  },
  computed: {
    ...mapGetters({ user: 'getUserInfo' }),
    indexLiked() {
      const index = this.user.likedLip.findIndex(
        l => l._id === this.item._id && l.rgb_value === this.item.rgb_value
      );
      return index;
    },
  },
  methods: {
    handleItemLiked() {
      let updateLikedLip = this.user;
      if (this.liked) {
        if (this.indexLiked === -1) {
          updateLikedLip.likedLip.push(this.item);
        }
      } else {
        if (this.indexLiked !== -1) {
          updateLikedLip.likedLip.splice(this.indexLiked, 1);
        }
      }
      this.$store.dispatch('updateUserProfile', updateLikedLip);
    },
  },
};
</script>

<style lang="scss" scoped>
.item-feature {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  align-items: flex-end;
}
</style>
