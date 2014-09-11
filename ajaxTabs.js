/*
Help for ajax tabs
WHAT:
Automatically call an url with one parametre depending on active tab(dynamic) or hash in URL(static) (url#myhash)
Add an alertResponse div allowing to display response code/message (display errors happened during ajax call for example), like a flash message.

RECOMMENDATION:
Work with bootstrap for a better compatibility (for the spinner)

SETUP :
Use the tabtable you need
Add class .ajaxTabs and a data-url(ajax url) to your tabtable div
    example : 
        <div id="tabs" class="tabbable tabbable-custom tabbable-full-width ajaxTabs" data-url="mywebsite_url">
Add class .ajaxTab and a data-title (parametre) to each tabs
    example :
        <li class="active">
            <a class='ajaxTab' data-title='societies' data-toggle="tab">Assos</a>
        </li>

USE :
myTabs = new AjaxTabs($("#tabs"));
myTabs.init();
*/
var AjaxTabs = (function($, AjaxTabs)
{
    AjaxTabs = function(tabs)
    {
        this.element = tabs;
        this.url = this.element.data('url');
        this.requestRunning = false;
    };
    var proto = AjaxTabs.prototype;


    //event on tab click
    proto.init = function()
    {
        var global = this;
        this.element.prepend("<div id='alertResponse'></div>");
        this.element.append("<span class='wait icon-spinner icon-spin icon-4x hidden'></span>");
        this.openTabInHash();
        var requestRunning = false;
        this.element.find(".ajaxTab").on("click",function(){
            title = $(this).data('title');
            global.displayTab(title)
            parent.location.hash = title;
            $(".tab-content").html("");
            $("#alertResponse").html("");
            requestRunning = true;
        });
    }

    //get hash to open the right tab
    proto.openTabInHash = function()
    {
        if (window.location.hash){
            var hash = window.location.hash.substring(1);
            this.displayTab( hash );
            $(".active").removeClass('active');
            $(".ajaxTab[data-title='" + hash + "']").parent().addClass('active');
        }else{
            this.displayTab( $(".active").find('.ajaxTab').data('title') );
        }
    }


    //display tab in ajax form given url with tab title given
    proto.displayTab = function(title, feedback)
    {
        if (this.requestRunning){
            return;
        }
        $(".wait").removeClass("hidden");
        this.requestRunning = true;
        global = this;
        $.ajax({
            url: global.url,
            dataType: 'html',
            data: {
                filter: title,
            },
            success: function(response)
            {
                $(".tab-content").append(response);
                if(feedback){
                    global.printAlert(feedback);
                }
            },
            error: function()
            { 
                global.printAlert(createAlert(null, null, true));
            },
            complete: function()
            {
                global.requestRunning = false;
                $(".wait").addClass("hidden");
            },
        })
    }

    proto.printAlert = function(alertResponse)
    {
        this.element.find("#alertResponse").html(alertResponse);
    }

    proto.ajaxSuccess = function(data, msg, resume)
    {
        if(data != 'ok'){
            this.printAlert(createAlert(data, false));
        }else{
            this.displayTab(resume, createAlert(msg, true));
        }
    }

    proto.reload = function(msg)
    {
        $(".tab-content").html("");
        this.displayTab($(".active").find('a').data('title'), msg);
    }

    return AjaxTabs;

}(jQuery, AjaxTabs));