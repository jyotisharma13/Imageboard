
(function() {
    new Vue({
        el: '#main',
        data: {
            images: []
        },
        mounted: function() {
            axios.get('/images').then(function(response) {
                console.log("response form the images: ", response);
                this.images = response.data;
            });
        }
    });
})();
