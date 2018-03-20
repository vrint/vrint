export default {
  methods: {
    switchContent(flag, replaced, current) {
      return flag ? current : replaced;
    }
  }
}