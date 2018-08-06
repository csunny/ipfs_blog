/**
 * Created by magic on 2016/11/16.
 */

// ToDO use broserify Refactor

$(function(){
    /*导航跳转效果插件*/
    $('.nav').singlePageNav({
        offset:70
    });
    /*小屏幕导航点击关闭菜单*/
    $('.navbar-collapse a').click(function(){
        $('.navbar-collapse').collapse('hide');
    });

    new WOW().init();
    var card = $("#card_hide")[0].innerHTML;
    if (card){
        $('#carte div').removeClass('hide');
    }

//    $.ajaxSetup({
//        data: {csrfmiddlewaretoken: '{{ csrf_token }}' }
//    });

});

var WebDomain = "http://www.oceanpp.com"

var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
var nebPay = new NebPay();

// var dappAddress = "n1tTJ6u4UyPH1eTvv7RRuCzbFnamgXbUSEU"    // 06bc2147dd1062efade9aa9e56b11cfe4e988098ceba0b37b1be6b4d8ec17cad
var dappAddress = "n21Xp49DEGC1UF7r6Z6reVah4XzhxzmzN2t";    // 智能合约的地址 hash="8f750aa6c75a6bbbc38fcf42a2ead20d75e87ba5390199f4f0e8e26ddd42c02a"
// var dappAddress = "n1m1bgxfgzcuo3TERGzkEe9ohUywS1DwHmY"   // 智能合约地址 主网 hash 353b7067f1f4d0a08011a83e5ac436b523e5bea7707c0f21a00066b2445da6bd

function contract(key, val){
    //     todo生成参数，并将数据保存到链上
    var to = dappAddress;    // 调用合约，指定合约地址
    var value = '0';
    var callFunction = 'save'


    var callArgs = JSON.stringify([key, val]);

    nebPay.call(to, value, callFunction, callArgs, {
        callback: save
    })
}

function save(resp){
    // 保存成功之后关闭modal 窗口
    setTimeout("$('#choose_file').modal('hide')", 20000);
}

$(function(){
    $('#registrationForm').on('submit', function(e){
        e.preventDefault();

        data = $('#registrationForm').formSerialize()
        $.ajax({
            type: "post",
            async: true,
            url: 'save',
            dataType: 'json',
            data: data,
            success: function(result){
                if (result['code']==='10000'){
                    // 数据上链

                    contract(result['phone'], result)

                    $('#cname_p')[0].innerHTML='姓名:' + result['name'];
                    $('#company_p')[0].innerHTML='公司:' + result['company'];
                    $('#cposition_p')[0].innerHTML='职位:' + result['position'];
                    $('#csex_p')[0].innerHTML='性别:' + result['sex'];
                    $('#cbir_p')[0].innerHTML='生日:' + result['birthday'];
                    $('#cphone_p')[0].innerHTML='电话号码:' + result['phone'];
                    $('#cweb_p')[0].innerHTML='网站:' + result['website'];
                    $('#cweb_p')[0].href= result['website'];
                    $('#cweb_p')[0].target = "_blank"

                    $('#carte div').removeClass('hide');
                    $('#notice div').addClass('hide');
                }else{
                    $('#notice div').removeClass('hide');
                    $('#carte div').addClass('hide');
                }
            }
        })
    })
});

//// commit user commit information
$(function(){
    $("#comment_info").on('submit', function(event){

        var comment = $("#comment_info")

        event.preventDefault();
        data = comment.formSerialize()

        $.ajax({
            type: "post",
            async: true,
            url: 'contact',
            dataType: 'json',
            data: data,
            success: function(result){
                console.log(result);
            }
        })
    });
});

$('#query').click(function(){
    console.log(123);
    var name = $("#name_p").val()

    $.ajax({
        type: "get",
        async: true,
        url: "search",
        dataType: 'json',
        data: {'value': name},
        success: function(result){
            console.log(result)
            if (result['code']==='10000'){
                $('#cname_p')[0].innerHTML='姓名:' + result['name'];
                $('#company_p')[0].innerHTML='公司:' + result['company'];
                $('#cposition_p')[0].innerHTML='职位:' + result['position'];
                $('#csex_p')[0].innerHTML='性别:' + result['sex'];
                $('#cbir_p')[0].innerHTML='生日:' + result['birthday'];
                $('#cphone_p')[0].innerHTML='电话号码:' + result['phone'];
                $('#cweb_p')[0].innerHTML='网站:' + result['website'];
                $('#cweb_p')[0].href= result['website'];
                $('#cweb_p')[0].target = "_blank"

                $('#carte div').removeClass('hide');
                $('#notice div').addClass('hide');
            }else{
                $('#notice div').removeClass('hide');
                $('#carte div').addClass('hide');
            }
        }
    })
});


