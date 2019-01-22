
(function() {
    new Vue({
        el: '#main',
        data: {
            images: []
        },
        mounted: function() {
            var self= this;
            // then runs when we get the respose fron the server
            axios.get('/images').then(function(response) {
                console.log("response form the images: ", response);
                self.images = response.data;
            });
        }
    });
})();
