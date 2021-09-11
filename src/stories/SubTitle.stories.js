import SubTitle from '../components/SubTitle';

export default {
    title: 'StoryBook/SubTitle',
    component: SubTitle,
    argTypes: {},
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    component: { SubTitle },
    template: '<SubTitle v-bind="$props" ></SubTitle>',
});

export const SubTitleDemo = Template.bind({});
SubTitleDemo.args = {};
