(function () {

    $('.control-items').on('change', function (e) {
        draw();
    });

    $('#redraw').on('click', function (e) {
        draw();
    });

    $('#download').on('click', function (e) {
        html2canvas(document.querySelector("#wrapper"), { scale: 1 }).then(c => {
            let downloadEle = document.createElement("a");
            downloadEle.href = c.toDataURL("image/png");
            const filename = "catch" + ".png";
            downloadEle.download = filename;
            downloadEle.click();
        });
    });


    const canvas = document.getElementById("myCanvas");
    const canvasWidth = 1280;
    const canvasHeight = 720;
    const context = canvas.getContext("2d");
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);

    draw();

    //draw background
    function drawBackground() {
        context.fillStyle = makeRandomColor();
        context.globalAlpha = 1;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }


    function draw() {
        const freq = $('input[name=freq]:checked').val();
        const size = $('input[name=size]:checked').val();
        const isWhite = $('input[name=white]:checked').val();
        drawBackground();
        context.globalAlpha = 0.3;
        if ($("#triangle").prop('checked')) drawTriangles(freq, isWhite, size);
        if ($("#rectangle").prop('checked')) drawRectangles(freq, isWhite, size);
        if ($("#circle").prop('checked')) drawCircles(freq, isWhite, size);
    }



    //draw Triangles
    function drawTriangles(f, w, s) {
        for (let i = 0; i < f; i++) {
            const position = {};
            const hue = Math.random() * 360;
            const color = w ? "rgb(255,255,255)" : `hsl( ${hue}, 30%, 70% )`;
            position.x = Math.random() * canvas.width - 100;
            position.y = Math.random() * canvas.height - 100;
            const radius = Math.random() * canvas.width / 4 * s;
            const rotation = Math.random() * 360;
            const x1 = radius * Math.cos(2 * Math.PI * (rotation + 30) / 360) + position.x;
            const y1 = radius * Math.sin(2 * Math.PI * (rotation + 30) / 360) + position.y;
            const x2 = radius * Math.cos(2 * Math.PI * (rotation + 150) / 360) + position.x;
            const y2 = radius * Math.sin(2 * Math.PI * (rotation + 150) / 360) + position.y;
            const x3 = radius * Math.cos(2 * Math.PI * (rotation + 270) / 360) + position.x;
            const y3 = radius * Math.sin(2 * Math.PI * (rotation + 270) / 360) + position.y;
            context.beginPath();
            context.strokeStyle = color;
            context.lineWidth = 10;
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.lineTo(x3, y3);
            context.closePath();

            if ($("#fill").prop('checked')) {
                context.fillStyle = color;
                context.fill();
            } else {
                context.stroke();
            }

        }
    }

    function makeRandomColor() {
        const hue = Math.random() * 360;
        const lum = $('input[name=background]:checked').val();
        return `hsl( ${hue}, 80%, ${lum} )`;
    }

    //draw Rectangles
    function drawRectangles(f, w, s) {
        for (let i = 0; i < f; i++) {
            const position = {};
            const rect = {};
            const hue = Math.random() * 360;
            const color = w ? "rgb(255,255,255)" : `hsl( ${hue}, 30%, 70% )`;
            const plusOrMinus = Math.round(Math.random()) ? 1 : -1;
            position.x = Math.random() * canvas.width - 200;
            position.y = Math.random() * canvas.height - 200;
            rect.width = Math.random() * canvas.width / 4 * plusOrMinus * s;
            rect.height = Math.random() * canvas.width / 4 * plusOrMinus * s;
            context.strokeStyle = color;
            context.lineWidth = 10;
            context.beginPath();
            context.fillStyle = color;

            if ($("#fill").prop('checked')) {
                context.fillRect(position.x, position.y, position.x + rect.width, position.y + rect.height);
                context.fill();
            } else {
                context.strokeRect(position.x, position.y, position.x + rect.width, position.y + rect.height);


            }

        }
    }

    //draw circle
    function drawCircles(f, w, s) {
        for (let i = 0; i < f; i++) {
            // break;
            const position = {};
            const hue = Math.random() * 360;
            const color = w ? "rgb(255,255,255)" : `hsl( ${hue}, 30%, 70% )`;
            position.x = Math.random() * canvas.width - 100;
            position.y = Math.random() * canvas.height - 100;
            const radius = Math.random() * canvas.width / 4 * s;
            context.beginPath();
            context.strokeStyle = color;
            context.lineWidth = 10;
            context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
            context.fillStyle = color;
            if ($("#fill").prop('checked')) {
                context.fill();
            } else {
                context.stroke();
            }

        }
    }

    $("#deleteImage").on("click", function (e) {
        $("#image").attr('src', "");
        $("#image").addClass("hide");
    });

    $("#shadow").on("change", function (e) {
        if ($(this).prop('checked')) {
            $("#textbox").addClass("shadow");
        } else {
            $("#textbox").removeClass("shadow");
        };
    });

    $('.fontSample').on('click', function (e) {
        const name = $(this).prop("name");
        const num = document.querySelectorAll(".fontSample").length;
        for (let i = 0; i < num; i++) {
            $("#textbox").removeClass(name.slice(0, -1) + i);
        }
        $("#textbox").addClass(name);

    });

    $('.fontSize').on('click', function (e) {
        const size = $(this).prop("name");
        const element = document.querySelector('#textbox');
        element.style.setProperty("--title-font-size", size);

    });

    $('.textAlign').on('click', function (e) {
        const align = $(this).prop("name");
        $("#textbox").css({
            textAlign: align
        });

    });


    $("#reset").on("click", function (e) {
        textbox.style.top = "50px";
        textbox.style.left = "50px";
        if (textbox.innerText === "") textbox.innerText = "text";
    });


    $("#loadImage").change(function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            $("#image").attr("src", reader.result);
            $("#image").removeClass("hide");
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    });




    //テキストボックスのドラッグ移動処理
    //以下のサイトにあったプログラムを元に作成
    // https://q-az.net/elements-drag-and-drop/

    const textbox = document.getElementById("textbox");

    //textboxにイベントを設定
    textbox.addEventListener("mousedown", mdown, false);
    textbox.addEventListener("touchstart", mdown, false);


    //マウスが押された時
    function mdown(e) {

        this.classList.add("drag");

        //タッチデイベントとマウスのイベントの差異を吸収
        const event = (e.type === "mousedown") ? e : e.changedTouches[0];

        //要素内の相対座標を取得。textboxにx,yプロパティを追加
        textbox.x = event.pageX - this.offsetLeft;
        textbox.y = event.pageY - this.offsetTop;

        //mousemoveイベントに設定
        document.body.addEventListener("mousemove", mmove, false);
        document.body.addEventListener("touchmove", mmove, false);
    }

    //mousedown中にカーソルが動いた時
    function mmove(e) {

        //マウスとタッチの差異を吸収
        const event = (e.type === "mousemove") ? e : e.changedTouches[0];

        //フリックしたときに画面を動かさないようにデフォルト動作を抑制
        e.preventDefault();

        //マウス位置にオブジェクトを移動。範囲制限付き
        textbox.style.top = clipNumber(event.pageY - textbox.y, 20, 600) + "px";
        textbox.style.left = clipNumber(event.pageX - textbox.x, 10, 1100) + "px";

        //マウスボタンが離されたとき、またはカーソルが外れたときmupを設定
        textbox.addEventListener("mouseup", mup, false);
        document.body.addEventListener("mouseleave", mup, false);
        document.body.addEventListener("click", mup, false);//クリック時の誤作動防止を追加
        textbox.addEventListener("touchend", mup, false);
        document.body.addEventListener("touchleave", mup, false);

    }

    //マウスボタンが上がった時の終了処理
    function mup() {

        document.body.removeEventListener("mousemove", mmove, false);
        document.body.removeEventListener("touchmove", mmove, false);
        document.body.removeEventListener("click", mup, false);
        textbox.removeEventListener("mouseup", mup, false);
        textbox.removeEventListener("touchend", mup, false);
        textbox.classList.remove("drag");
    }

    //数字を一定の範囲に収める関数
    function clipNumber(n, min, max) {
        if (isNaN(n)) return false;
        result = n < min ? min :
            n > max ? max : n;
        return result;
    }


})()