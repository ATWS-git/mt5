import DialogForm from '../components/DialogForm';

export default {
    title: 'StoryBook/DialogForm',
    component: DialogForm,
    argTypes: {},
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    component: { DialogForm },
    template: '<dialog-form v-bind="$props" ></dialog-form>',
});

export const DialogFormDemo = Template.bind({});
DialogFormDemo.args = {};
