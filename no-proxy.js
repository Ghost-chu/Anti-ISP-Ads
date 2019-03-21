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
