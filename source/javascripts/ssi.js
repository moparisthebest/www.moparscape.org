var smf_ssi = (function(){
    function escapeHtml(str) {
        str = str.replace(/<(img|br)[^>]*>/g, ' ');
        //return $('<div/>').text(str).html();
        return str;
    }
    function render(target, data){
        //alert(data.id);
        //console.log(data.id);
        //console.log(data[0].id);
        if (!data)
            return;
        var i = 0, fragment = '', t = $(target)[0];

        for(i = 0; i < data.length; i++) {
            fragment += '<li><a href="'+data[i].href+'">'+data[i].subject+'</a><p>'+escapeHtml(data[i].body||'')+'</p></li>';
        }
        t.innerHTML = fragment;
    }
    return {
        showThreads: function(options){
            $.ajax({
                url: "/ssijs.php"
                //url: "http://www.moparisthebest.com/ssijs.php"
                , dataType: 'jsonp'
                , data: { board: options.board, limit: options.limit, length: options.length }
                , error: function (err, textStatus, errorThrown) { $(options.target + ' li.loading').addClass('error').text("Error loading feed textStatus: '"+textStatus+"' errorThrown: '"+errorThrown+"'"); }
                , success: function(data) { render(options.target, data); }
            });
        }
    };
})();
