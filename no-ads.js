function checkAds(){
    let page = document.getElementsByTagName('html')[0].innerHTML;
    let isKeywordDomainMatched = false;
    for (let i = 0, length = globalAdsDomain.length; i < length; i++) {
        if(page.indexOf(globalAdsDomain[i]) !== -1){
            isKeywordDomainMatched=true;
            break;
        }
    }
    if(isKeywordDomainMatched){
        isInsertedAds();
    }
}
function isInsertedAds(){
    sendUserAlert("ads")
    sendHttpWebhookRequest("ads",location.href);
    fixInsertedAds();
}
function fixInsertedAds(){
    location.href=location.href;
    window.location.reload();
}