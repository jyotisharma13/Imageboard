
Vue.component("comment-input", {
    template: "#comment-input-template",
    props: ["comment", "commentusername", "currentimage"],
    methods: {
        postComment: function() {
            // this.$emit("post-comment");
            console.log("posting comment!");
            console.log("body", this.comment, this.commentusername);
            var y = this.commentusername;
            var x = this.comment;
            var z = this.currentimage;
            axios.post("/postComment", { x, y, z }).then(function(response) {
                console.log("response:",response);
            });
        }

    }
});
