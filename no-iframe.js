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