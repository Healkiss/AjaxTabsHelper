AjaxTabsHelper
==============

Allow to simply addajax to a tabtable 

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