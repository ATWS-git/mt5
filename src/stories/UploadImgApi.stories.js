import UploadImgApi from '../components/UploadImgApi';

export default {
    title: 'StoryBook/UploadImgApi',
    component: UploadImgApi,
    argTypes: {},
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    component: { UploadImgApi },
    template: '<UploadImgApi v-bind="$props" ></UploadImgApi>',
});

export const UploadImgApiDemo = Template.bind({});
UploadImgApiDemo.args = {};
