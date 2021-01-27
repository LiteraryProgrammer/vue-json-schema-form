/**
 * Created by Liu.Jun on 2020/7/22 13:22.
 */

import { h } from 'vue';
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';
import { parseDateString } from '@lljj/vjsf-utils/utils';

const formatTimeStr = (dateString) => {
    const { hour, minute, second } = parseDateString(dateString, true);
    return `${hour}:${minute}:${second}`;
};

export default {
    name: 'TimePickerWidget',
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
        return () => h(resolveComponent('el-time-picker'), {
            ...attrs,
            'onUpdate:modelValue': (val) => {
                attrs['onUpdate:modelValue'].apply(attrs, [val === null ? undefined : formatTimeStr(val)]);
            }
        }, slots);
    }
};
