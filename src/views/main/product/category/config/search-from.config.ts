import { IFormItem, IForm } from '@/base-ui/form'

const formItems: IFormItem[] = [
  {
    field: 'name',
    type: 'input',
    label: '分类名称',
    placeholder: '请输入分类名称'
  }
]
export const searchFormConfig: IForm = {
  formItems,
  labelWidth: '90px',
  itemStyle: {
    padding: '8px'
  }
}
