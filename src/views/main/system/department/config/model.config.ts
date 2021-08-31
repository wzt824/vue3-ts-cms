import { IFormItem, IForm } from '@/base-ui/form'
const formItems: IFormItem[] = [
  {
    field: 'name',
    type: 'input',
    label: '部门',
    placeholder: '请输入部门'
  },
  {
    field: 'leader',
    type: 'input',
    label: '部门领导',
    placeholder: '请输入部门领导'
  },
  {
    field: 'parentId',
    type: 'select',
    label: '部门分类',
    placeholder: '请选择部门分类',
    options: [
      { title:'一级部门', value: 1 },
      { title:'二级部门', value: 2 }
    ]
  }
]

export const modelConfig: IForm = {
  formItems,
  colLayout: { span: 24 },
  labelWidth: '90px',
  itemStyle: {
    padding: '8px'
  }
}
