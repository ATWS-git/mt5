import TableMain from '../components/TableMain';

export default {
    title: 'StoryBook/TableMain',
    component: TableMain,
    argTypes: {},
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    component: { TableMain },
    template: '<TableMain v-bind="$props" ></TableMain>',
});

export const TableMainDemo = Template.bind({});
TableMainDemo.args = {};
