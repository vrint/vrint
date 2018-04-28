<template>
  <section>
    <h4>Tooltip</h4>
    <div class="content">
      <p>
        Inline text can have 
        <vr-tooltip text="a tooltip.">
          <em slot="content">
            This tooltip contains an <strong>em</strong> tag.
          </em>
        </vr-tooltip>
      </p>
      <p>
        <vr-tooltip intent="primary" text="Available" placement="right">
          <span slot="content">intent.PRIMARY</span>
        </vr-tooltip>
        <vr-tooltip intent="success" text="in the full" placement="top">
          <span slot="content">intent.SUCCESS</span>
        </vr-tooltip>
        <vr-tooltip intent="warning" text="range of" placement="bottom">
          <span slot="content">intent.WARNING</span>
        </vr-tooltip>
        <vr-tooltip intent="danger" text="visual intents!" placement="left">
          <span slot="content">intent.DANGER</span>
        </vr-tooltip>
      </p>
    </div>
  </section>
</template>

<style scoped>
.content {
  padding: 100px
}
</style>
