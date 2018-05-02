/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

export default {
  data() {
    return {
      timeoutIds: []
    }
  },

  methods: {
    /**
     * Set a timeout and remember its ID.
     * All stored timeouts will be cleared when component unmounts.
     * @returns a "cancel" function that will clear timeout when invoked.
     */
    setTimeout(callback, timeout) {
      const handle = window.setTimeout(callback, timeout)
      this.timeoutIds.push(handle)
      return () => window.clearTimeout(handle)
    },

    /**
     * Clear all known timeouts.
     */
    clearTimeouts() {
      if (this.timeoutIds.length > 0) {
        for (const timeoutId of this.timeoutIds) {
          window.clearTimeout(timeoutId)
        }
        this.timeoutIds = []
      }
    }
  }
}
