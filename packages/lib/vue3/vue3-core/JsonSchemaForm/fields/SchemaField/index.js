/**
 * Created by Liu.Jun on 2020/4/20 9:55 下午.
 */

import { h } from 'vue';

import { getUiField, isSelect, isHiddenWidget } from '@lljj/vjsf-utils/formUtils';
import { nodePath2ClassName } from '@lljj/vjsf-utils/vueUtils';
import { lowerCase } from '@lljj/vjsf-utils/utils';
import retrieveSchema from '@lljj/vjsf-utils/schema/retriev';
import FIELDS_MAP from '../../FIELDS_MAP';
import vueProps from '../props';

export default {
    name: 'SchemaField',
    props: vueProps,
    setup(props, ctx) {
        // 目前不支持schema依赖和additionalProperties 展示不需要传递formData
        // const schema = retrieveSchema(props.schema, props.rootSchema, formData);
        const schema = retrieveSchema(props.schema, props.rootSchema);

        // 当前参数
        const curProps = {
            ...props,
            schema
        };

        // 空数据
        if (Object.keys(schema).length === 0) {
            return null;
        }

        // 获取节点Ui配置渲染field组件
        const {
            field: fieldComponent,
            fieldProps
        } = getUiField(FIELDS_MAP, curProps);

        // hidden
        const hiddenWidget = isHiddenWidget({
            schema,
            uiSchema: props.uiSchema,
            curNodePath: props.curNodePath,
            rootFormData: props.rootFormData
        });

        const pathClassName = nodePath2ClassName(props.curNodePath);

        if (schema.anyOf && schema.anyOf.length > 0 && !isSelect(schema)) {
            // anyOf
            return () => h(FIELDS_MAP.anyOf, {
                class: {
                    [`${pathClassName}-anyOf`]: true,
                    fieldItem: true,
                    anyOfField: true
                },
                ...curProps
            });
        } if (schema.oneOf && schema.oneOf.length > 0 && !isSelect(schema)) {
            // oneOf
            return () => h(FIELDS_MAP.oneOf, {
                class: {
                    [`${pathClassName}-oneOf`]: true,
                    fieldItem: true,
                    oneOfField: true
                },
                ...curProps
            });
        }

        return () => ((fieldComponent && !hiddenWidget) ? h(fieldComponent, {
            ...curProps,
            fieldProps,
            class: {
                [lowerCase(fieldComponent.name) || fieldComponent]: true,
                hiddenWidget,
                fieldItem: true,
                [pathClassName]: true
            }
        }) : null);
    }
};
