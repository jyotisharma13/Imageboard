
Vue.component("comment-input", {
    template: "#comment-input-template",
    props: ["comment", "commentusername", "currentimage", "created_at"],
    methods: {
        postComment: function() {
            // this.$emit("post-comment");
            console.log("posting comment!");
            console.log("body", this.comment, this.commentusername, this.created_at);
            var y = this.commentusername;
            var x = this.comment;
            var z = this.currentimage;
            var a = this.created_at;
            axios.post("/postComment", { x, y, z, a}).then(function(response) {
                console.log("response:",response);
            });
        }

    }
});
