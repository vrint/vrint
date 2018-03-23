import VrBreadcrumbs from './breadcrumbs'
import VrBreadcrumbsItem from './breadcrumbsItem'

export { VrBreadcrumbs, VrBreadcrumbsItem }

/* istanbul ignore next */
VrBreadcrumbs.install = function install (Vue) {
  Vue.component(VrBreadcrumbs.name, VrBreadcrumbs)
  Vue.component(VrBreadcrumbsItem.name, VrBreadcrumbsItem)
}

export default VrBreadcrumbs
