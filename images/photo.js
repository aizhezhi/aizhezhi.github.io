photo ={
    page: 1,
    offset: 20,
    init: function () {
        var that = this;
        $.getJSON("/photo/output.json", function (data) {
            that.render(that.page, data);
            //that.scroll(data);
        });
    },

    render: function (page, data) {
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
        var html, li = "";
        for (var i = begin; i < end && i < data.length; i++) {

            li += '<div class="card">' +
                    '<div class="ImageInCard">' + 
                      '<a data-fancybox="gallery" href="/Images/' + data[i] + '">' +
                        '<img src="/Images/' + data[i] + '">' +
                      '</a>' +
                    '</div>' +
                    '<div class="TextInCard">'+data[i].split('.')[0]+'</div>' +
                  '</div>' 

        }

        $(".ImageGrid").append(li);
        $(".ImageGrid").lazyload();
        this.minigrid();
    },

    minigrid: function() {
        var grid = new Minigrid({
            container: '.ImageGrid',
            item: '.card',
            gutter: 12
        });
        grid.mount();
        $(window).resize(function() {
           grid.mount();
        });
    }

}

photo.init();