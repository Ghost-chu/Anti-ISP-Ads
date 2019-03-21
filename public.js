//Run script
const globalURL = ["foxres.cn","www.foxres.cn"];
const globalProtocol = ["http","https"]; //Set ["https"] if your website is force-https.
//祝下述Domain的所有人全家爆炸
const globalAdsDomain = ["adhudong.com","duiba.com","tuia.com","yuyiya.com","duiba.com.cn","chinadmp.cn","usu8.com","4336wang.cn"]
//祝上述Domain的所有人全家爆炸
const enableUserAlert = false;
const alertMsg = "网页劫持警告\n您正在访问的站点疑似被劫持，我们即将为您重载页面以修复此问题。\n如您频繁看到此警告，请联系站点管理员！";
const webhookURL = "./process_request.php"
window.onload=function(){
    checkIframe();
    checkProxy(globalURL,globalProtocol);
    checkAds(globalAdsDomain);
}
function checkIframe(){
    if (self !== top) {
        inIframe();
        return;
    }
    if (self.frameElement && self.frameElement.tagName.toLocaleLowerCase() === "iframe") {
        inIframe();
        return;
    }
    if (window.frames.length !== parent.frames.length) {
        inIframe();
        return;
    }

}
function inIframe(){
    sendUserAlert("iframe")
    sendHttpWebhookRequest("iframe",location.href);
    fixIframe();
}
function fixIframe(){
    if (top.location != location) {
        top.location.href = location.href; //Auto reload page
        top.location.reload();
    }
}
function checkProxy(){
    let hostname = location.hostname;
    let protocol = location.protocol;
    let isHostnameMatched = false; //If all passed the test, it should be true
    let isProtocolMatched = false; //If all passed the test, it should be true
    //==================Hostname Checker==================
    for (let i = 0, length = globalURL.length; i < length; i++) {
        if (globalURL[i] === hostname) {
            isHostnameMatched = true; //Okay we know the domain is correct.
            break;
        }
    }
    //==================Protocol Checker==================
    for (let i2 = 0, length = globalProtocol.length; i2 < length; i2++) {
        if(globalProtocol[i2] === protocol){
            isProtocolMatched = true; //Okay we know the domain is correct.
            break;
        }
    }
    if(!isHostnameMatched){ //We must first fix the hostname, and fix protocol.
        sendUserAlert("proxy-hostname")
        sendHttpWebhookRequest("proxy-hostname",location.href);
        //Fix hostname is hard, cause you didn't know ISP how hook your website, so only send report to Webhook.
        return;
    }
    if(!isProtocolMatched){
        sendUserAlert("proxy-protocol")
        sendHttpWebhookRequest("proxy-protocol");
        //Fix https, reload the page.
        location.href=location.href
        location.reload();
    }

}
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