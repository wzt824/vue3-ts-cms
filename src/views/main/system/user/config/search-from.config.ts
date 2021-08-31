import { IFormItem, IForm } from '@/base-ui/form'

const formItems: IFormItem[] = [
  {
    field: 'id',
    type: 'input',
    label: 'id',
    placeholder: '请输入id'
  },
  {
    field: 'realname',
    type: 'input',
    label: '真实姓名',
    placeholder: '请输入真实姓名'
  },
  {
    field: 'cellphone',
    type: 'input',
    label: '电话号码',
    placeholder: '请输入电话号码'
  },
  {
    field: 'enable',
    type: 'select',
    label: '用户状态',
    placeholder: '请输入用户状态',
    options: [
      {title:'启用', value: "1"},
      {title:'禁用', value: "0"}
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
