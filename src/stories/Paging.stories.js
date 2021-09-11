import Paging from '../components/Paging.vue';

export default {
    title: 'StoryBook/Paging',
    component: Paging,
    argTypes: {
        total: {
            description: '总数据量',
        },
        size: {
            description: '每页数据',
        },
        page: {
            description: '页码',
        },
    },
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    component: { Paging },
    template: '<paging v-bind="$props" />',
});

export const PagingDemo = Template.bind({});
PagingDemo.args = {
    total: 100,
    size: 20,
    page: 1,
};
