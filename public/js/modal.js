Vue.component("modal", {
    template: "#modal-template",
    props: ["currentimage"],
    data: function() {
        return {
            currentimageurl: "",
            currentimagetitle: "",
            currentimagedescription: "",
            currentimageusername: "",
            currentimagecreatedate: "",
            comments: []
        };
    },
    mounted: function() {
        axios.get("/currentimageData/" + this.currentimage).then(
            function(response) {
                console.log("RESPONSE!!!!!", response);
                console.log("this.comments", response.data[1].rows[0]);
                this.currentimageurl = response.data[0].rows[0].url;
                this.currentimagetitle = response.data[0].rows[0].title;
                this.currentimagedescription = response.data[0].rows[0].description;
                this.currentimageusername = response.data[0].rows[0].username;
                this.currentimagecreatedate = response.data[0].rows[0].created_at;
                this.comments = response.data[1].rows;
            }.bind(this)
        );
    }

});
