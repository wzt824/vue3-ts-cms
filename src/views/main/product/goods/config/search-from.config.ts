import { IFormItem, IForm } from '@/base-ui/form'

const formItems: IFormItem[] = [
  {
    field: 'name',
    type: 'input',
    label: '商品名称',
    placeholder: '请输入商品名称'
  },
  {
    field: 'status',
    type: 'select',
    label: '状态',
    placeholder: '请输入状态',
    options: [
      { title:'上架', value: "1" },
      { title:'已下架', value: "0" }
    ]
  },
  {
    field: 'createAt',
    type: 'datepicker',
    label: '创建时间',
    placeholder: '请输入创建时间',
    otherOptions: {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      type: 'daterange'
    }
  }
]
export const searchFormConfig: IForm = {
  formItems,
  labelWidth: '90px',
  itemStyle: {
    padding: '8px'
  }
}
