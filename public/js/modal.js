Vue.component('modal', {
    template: '#modal-template'
    data: function() {
            return {
                url: "",
                title: "",
                description: "",
                username: "",
                uploadTime: "",
                comments: [],
                comment: {
                    text: "",
                    name: ""
                }
            };
        },
});
// axios.post('/comment/add',{
//     iamgeId:this.id,
//     comment:this.comment.text,
//     username:this.cmment.username
// });
