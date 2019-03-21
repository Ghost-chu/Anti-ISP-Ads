function sendUserAlert(type){
    if(enableUserAlert)
        alert(alertMsg);
}
function sendHttpWebhookRequest(type,href){
    const Http = new XMLHttpRequest();
    const Url = webhookURL;
    Http.open("GET",Url+"?type="+type+"&href="+encodeURIComponent(href));
    Http.send();
}