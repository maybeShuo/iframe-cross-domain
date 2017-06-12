$(function() {


    function crossDomain(attrs) {
        this.domain = 'http://localhost:8000/crossdomain.html';
        this.src = attrs.src;
        var canvas = attrs.canvas;
        var ctx = canvas.getContext('2d');
        var iframe = document.createElement('iframe');
        iframe.src = this.domain + '?' + 'src=' + this.src;
        document.body.append(iframe);

        iframe.onload = function (e) {
            console.log('iframe onload');
            post({method: 'play'}, 'http://localhost:8000/');
        };

        function post (data, domain) {
            // console.log(iframe);
            iframe.contentWindow.postMessage(data, domain);
        };

        window.addEventListener('message',function(e){
            switch (e.data.method) {
                case 'frame':
                    ctx.putImageData(e.data.data, 0, 0);
                    break;
                default:
                    break;

            }
        },false);
    }


    var url = 'http://localhost:8000/f1.mp4';
    var width = 1440;
    var height = 800;
    var canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    var a = new crossDomain({
        canvas: canvas,
        src: url
    });
});
