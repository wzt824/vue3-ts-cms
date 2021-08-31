import { IFormItem, IForm } from '@/base-ui/form'

const formItems: IFormItem[] = [
  {
    field: 'name',
    type: 'input',
    label: '角色名称',
    placeholder: '请输入角色名称'
  },
  {
    field: 'intro',
    type: 'input',
    label: '权限介绍',
    placeholder: '请输入权限介绍'
  },
  {
    field: 'createAt',
    type: 'datepicker',
    label: '创建时间',
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
