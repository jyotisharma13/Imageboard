(function() {
    new Vue({
        el: '#main',
        data: {
            images: [],
            title:[],
            currentimage:null,
            showModal: false,
            comment:"",
            form:{
                title:'',
                name:'',
                description:'',
                file: null  //0
            }
        },
        mounted: function() {
            var self= this;
            // then runs when we get the respose fron the server
            axios.get('/images').then(function(response) {
                console.log("response form the images: ", response);
                self.images = response.data;
            });
        }, // mounted ends here and make sure that there is comma
        // every function that i want to run in response to end event.
        // to an event should go in method
        methods:{
            uploadFile: function(e){
                e.preventDefault();
                // console.log('this.form.description:', this.form.description);
                // console.log('this.form.title:', this.form.title);
                // console.log('this.form.name:', this.form.name);
                var file = document.getElementById('file');
                console.log('file:', file);
                var uploadedFile = file.files[0];
                console.log('uploadedfile:',uploadedFile);
                // we want to send uploadedfiles to the server
                //we use formData to send files to server
                //formData is only for files
                var formData =  new FormData();
                formData.append('file', uploadedFile);
                formData.append('title',this.form.title);
                formData.append('name',this.form.name);
                formData.append('description',this.form.description);
                // post/upload and we are sending files, title, name , description to server as part of the request
                axios.post('/upload', formData).then(function(response){
                    var self  = this;
                    console.log("response: ", response);
                    console.log("self: ", self);
                    self.images.unshift(response.data);
                });
                // logging formData gives you empty things
                // console.log('formData',formData);
            }, // end uploadFile
            clicked: function(e) {
                var self = this;
                console.log("e.target", e.currentTarget);
                console.log("clicked!!!!!");
                self.currentimage = e.currentTarget.id;
                self.showModal = true;
                console.log("currentimage", self.currentimage);
            },
            moreImages: function() {
                var moreButton = document.getElementById("moreButton");

                axios.get("/moreImages/" + this.images[this.images.length - 1].id).then(
                    function(response) {
                        console.log("RESPONSE.dataMoreIMAGES!!!!!!!!!!!!!!", response.data);

                        this.images = this.images.concat(response.data[0]);
                        console.log("this.images!!!!!!!!!!!!!   ", this.images);
                        console.log(
                            "id of last image in images",
                            this.images[this.images.length - 1].id
                        );

                        if (
                            this.images[this.images.length - 1].id <=
                          response.data[1].rows[0].id
                        ) {
                            moreButton.style.display = "none";
                        }
                    }.bind(this)
                );
            },
            closeModal: function() {
                window.location.hash = "";
                this.showModal = false;
                this.currentimage = null;
                console.log("this.showModal", this.showModal);
            }
        } //end methods here
    });
})();
