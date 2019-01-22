
(function() {
    new Vue({
        el: '#main',
        data: {
            images: [],
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
                axios.post('/upload', formData).then(function(){

                });
                // logging formData gives you empty things
                // console.log('formData',formData);


            } // end uploadFile
        } //end methods here
    });
})();
