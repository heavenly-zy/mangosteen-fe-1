import { computed, defineComponent, onMounted, PropType, ref } from "vue"
import { FormItem } from "../../shared/Form"
import s from "./Charts.module.scss"
import { Bars } from "./Bars"
import { LineChart } from "./LineChart"
import { PieChart } from "./PieChart"
import { http } from "../../shared/Http"
import { Time } from "../../shared/time"

type Data1Item = { happen_at: string; amount: number }
type Data1 = Data1Item[]

const DAY = 24 * 3600 * 1000

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    }
  },
  setup: (props, context) => {
    const kind = ref("expenses")
    const data1 = ref<Data1>([])
    const betterData1 = computed<[string, number][]>(() => {
      if (!props.startDate || !props.endDate) {
        return []
      }
      const array = []
      const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime()
      // 不完全归纳，得出 n = diff / DAY + 1
      // n 表示折线图的 x 轴上的刻度数
      // start 1 end 2 diff/day = 1 n = 2
      // start 1 end 3 diff/day = 2 n = 3
      const n = diff / DAY + 1
      let data1Index = 0
      for (let i = 0; i < n; i++) {
        // 这里添加了 "T00:00:00.000+0800"，因为需要和后端返回的时间格式保持一致
        const time = new Time(props.startDate + "T00:00:00.000+0800").add(i, "day").getTimestamp()
        if (data1.value[data1Index] && new Date(data1.value[data1Index].happen_at).getTime() === time) {
          array.push([new Date(time).toISOString(), data1.value[data1Index].amount])
          data1Index += 1
        } else {
          array.push([new Date(time).toISOString(), 0])
        }
      }
      return array as [string, number][]
    })

    onMounted(async () => {
      const response = await http.get<{ groups: Data1; summary: number }>("/items/summary", {
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        _mock: "itemSummary"
      })
      data1.value = response.data.groups
    })
    return () => (
      <div class={s.wrapper}>
        <FormItem
          label="类型"
          type="select"
          options={[
            { value: "expenses", text: "支出" },
            { value: "income", text: "收入" }
          ]}
          v-model={kind.value}
        />
        <LineChart data={betterData1.value} />
        <PieChart />
        <Bars />
      </div>
    )
  }
})
