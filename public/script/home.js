$("document").ready(function(){
   

   //ABRIR JANELAS 
   var controladorAcesso = 0
    $("header ul a:eq(4)").click(function(){
        if (controladorAcesso == 0){
            $("#acessoBg").show("100").css("display", "flex") 
            $("#acesso #user").slideDown(500)
            $("#acesso #senha").slideDown(750)
            $("#acesso #btnAcesso").slideDown(1000)

        } else {
        $("#novoPostbg").show("1000")
        } 
    })

    //CONFIRMACAO ADMIN

    $("#btnAcesso").click(function(){
        if ($("#user :text").val() == "admin" && $("#senha :password").val() == "123"){
            controladorAcesso = 1
            $("#acessoBg").hide("1000")
            $("#novoPostbg").show("1000").css("display", "flex")
        }
        else {
            alert("Acesso negado")
        }
    })
    

//FECHAR JANELAS

    $("#novoPostbg #novoPost p").click(function(){
        $("#novoPostbg").hide("1000")
    })

    $("#acesso p").click(function(){
        $("#acesso #user").slideUp("500")
        $("#acesso #senha").slideUp("750")
        $("#acesso #btnAcesso").slideUp("1000")
        $("#acessoBg").delay("100").hide("1000")
    })


//NOVO POST

$("#novoPost button").click(function(){
    var imagem = $("#img_nova :text")
    var titulo = $("#titulo_novo :text")
    var texto = $("#txt_novo textarea")
    var texto2 = $("#txt_novo2 textarea")
    if (imagem.val() == "" || titulo.val() == "" || texto.val() == "") {
        alert("Algo está em branco")
    } else {
    $("#tudo #postagens").prepend('<article class="post"> <div class="img_post"></div><div class="infos_post"></div></div> </article>')
    $(".post .img_post:empty").html("<img src =" + imagem.val() + ">")
    $(" .post .infos_post:empty")
    .append("<h1>"+ titulo.val() +"</h1>")
    .append("<p>"+ texto.val() +"</p>")
    .append("<p>"+ texto2.val() +"</p>")
    .append(' <div class="btn_post"> <button>Continue lendo</button></div>')
    $(":text, textarea").val("")
    }
})

$("#tudo_comentarios #input button").click(function(){
    var comentario = $("#tudo_comentarios #input :text")
    if (comentario.val() != ""){
    $("#comentarios").prepend('<div class="comentario"><div class="img_comentario"><img src="https://www.nicepng.com/png/full/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png"></div><div class="comentario_content"></div></div>')
    $("#tudo_comentarios #comentarios .comentario .comentario_content:empty").append("<h2> User </h2>").append("<p>"+ comentario.val() + "</p>")
    $(comentario).val("")
    }
    else {
        alert("Comentário vazio")
    }
})

});