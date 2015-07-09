AjaxTabsHelper
==============

Allow to simply add ajax to a tabtable 

WHAT:

Automatically call an url with one parametre depending on active tab(dynamic) or hash in URL(static) (url#myhash)
Add an alertResponse div allowing to display response code/message (display errors happened during ajax call for example), like a flash message.

RECOMMANDATION:

Work with bootstrap for a better compatibility (for the spinner)

SETUP :

Add class .ajaxTabs and a data-url(ajax url) to your tabtable div
    
```html
<div id="tabs" class="tabbable tabbable-custom tabbable-full-width ajaxTabs" data-url="mypage_url">
```
Add class .ajaxTab and a data-title (parametre) to each tabs
```HTML
<li class="active">
    <a class='ajaxTab' data-title='lastTab' data-toggle="tab">lastTab</a>
</li>
```

```Example
<div id="tabs" class="tabbable tabbable-custom tabbable-full-width ajaxTabs" data-url="mywebsite_url">
    <ul class="cl-tabs nav nav-tabs">
        <li class="active">
            <a class='ajaxTab' data-title='resume' data-toggle="tab">{{ 'resume'|trans }}</a>
        </li>
        <li class="active">
            <a class='ajaxTab' data-title='manageEntities' data-toggle="tab">{{ 'entity.action.manage'|transchoice(2) }}</a>
        </li>
        <li class="active">
            <a class='ajaxTab' data-title='parameters' data-toggle="tab">{{ 'parameter_perso'|transchoice(2) }}</a>
        </li>
    </ul>
    <div class="tab-content">
    </div>
</div>
```

USE :
```javascript
var myTabs = new AjaxTabs($("#tabs"));
myTabs.init();
```
