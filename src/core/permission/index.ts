import { TreeSelectProps } from "ant-design-vue";
import { permissions } from './modules/';

type DataNode=NonNullable<TreeSelectProps['treeData']>[number];

/**
 * @description 将权限列表转成级联选择器要求的数据格式
 */
export const formarPermsToCascader=()=>{
	return Object.keys(permissions).reduce<DataNode[]>((prev,moduleKey))=>{
		const module=
	}
}