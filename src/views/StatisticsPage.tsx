import { defineComponent } from "vue"
import { Charts } from "../components/statistics/Charts"
import { TimeTabsLayout } from "../layouts/TimeTabsLayout"

export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    return () => <TimeTabsLayout rerenderOnSwitchTab={true} hideThisYear={true} component={Charts} />
  }
})

export default StatisticsPage