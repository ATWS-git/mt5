import UeditorCus from '../components/UeditorCus';

export default {
    title: 'StoryBook/UeditorCus',
    component: UeditorCus,
    argTypes: {},
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    component: { UeditorCus },
    template: '<UeditorCus v-bind="$props" ></UeditorCus>',
});

export const UeditorCusDemo = Template.bind({});
UeditorCusDemo.args = {};
