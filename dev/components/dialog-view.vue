<template>
  <section>
    <h4>Dialog</h4>
    <vr-button @click="show = !show">Open</vr-button>
    <vr-button @click="show1 = !show1">Open</vr-button>
    <vr-dialog 
      title="Palantir Foundry"
      iconName="info-sign"
      :isOpen="show" 
      :onClose="onClose">
      <p>
        <strong>
            Data integration is the seminal problem of the digital age. For over ten years, we’ve
            helped the world’s premier organizations rise to the challenge.
        </strong>
      </p>
      <p>
          Palantir Foundry radically reimagines the way enterprises interact with data by amplifying
          and extending the power of data integration. With Foundry, anyone can source, fuse, and
          transform data into any shape they desire. Business analysts become data engineers — and
          leaders in their organization’s data revolution.
      </p>
      <p>
          Foundry’s back end includes a suite of best-in-class data integration capabilities: data
          provenance, git-style versioning semantics, granular access controls, branching,
          transformation authoring, and more. But these powers are not limited to the back-end IT
          shop.
      </p>
      <p>
          In Foundry, tables, applications, reports, presentations, and spreadsheets operate as data
          integrations in their own right. Access controls, transformation logic, and data quality
          flow from original data source to intermediate analysis to presentation in real time. Every
          end product created in Foundry becomes a new data source that other users can build upon.
          And the enterprise data foundation goes where the business drives it.
      </p>
      <p>Start the revolution. Unleash the power of data integration with Palantir Foundry.</p>
      <template slot="action">
        <vr-button @click="onClose">Close</vr-button>
        <vr-button intent="primary" @click="onClose">Visit the Foundry website</vr-button>
      </template>
    </vr-dialog>
    <vr-dialog 
      title="Palantir Foundry"
      iconName="info-sign"
      :isOpen="show1" 
      :usePortal="false"
      :onClose="onClose">
      <p>
        <strong>
            Data integration is the seminal problem of the digital age. For over ten years, we’ve
            helped the world’s premier organizations rise to the challenge.
        </strong>
      </p>
      <p>
          Palantir Foundry radically reimagines the way enterprises interact with data by amplifying
          and extending the power of data integration. With Foundry, anyone can source, fuse, and
          transform data into any shape they desire. Business analysts become data engineers — and
          leaders in their organization’s data revolution.
      </p>
      <p>
          Foundry’s back end includes a suite of best-in-class data integration capabilities: data
          provenance, git-style versioning semantics, granular access controls, branching,
          transformation authoring, and more. But these powers are not limited to the back-end IT
          shop.
      </p>
      <p>
          In Foundry, tables, applications, reports, presentations, and spreadsheets operate as data
          integrations in their own right. Access controls, transformation logic, and data quality
          flow from original data source to intermediate analysis to presentation in real time. Every
          end product created in Foundry becomes a new data source that other users can build upon.
          And the enterprise data foundation goes where the business drives it.
      </p>
      <p>Start the revolution. Unleash the power of data integration with Palantir Foundry.</p>
      <template slot="action">
        <vr-button @click="onClose">Close</vr-button>
        <vr-button intent="primary" @click="onClose">Visit the Foundry website</vr-button>
      </template>
    </vr-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      show1: false
    }
  },
  methods: {
    onClose() {
      this.show = false
      this.show1 = false
    }
  }
}
</script>

<style scoped>
section {
  position: relative;
  height: 200px;
}
</style>
