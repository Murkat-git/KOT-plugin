let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.ngrok.com/tunnels', false);
xhr.setRequestHeader('Authorization', "Bearer 2KzEJxdsOBvaLkkhSEkvCHqcRwr_5dUwMXisnnBsT1p695sPi")
xhr.setRequestHeader("Ngrok-Version", "2")

xhr.send();
if (xhr.status != 200) {
    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
} else {
    json = JSON.parse(xhr.response)
    base_url = new URL(json["tunnels"][0]["public_url"])
    alert(base_url)
}



const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const readmore = node.querySelectorAll("div[data-widget='webListReviews'] > div:nth-child(2) > div > div > div:nth-child(2) span:nth-child(2)")
                    readmore.forEach(button => {
                        button.click()
                    })
                    const newSpans = node.querySelectorAll("div[data-widget='webListReviews'] > div:nth-child(2) > div > div > div:nth-child(2) span");
                    // do something with the newSpans
                    // texts = Array.from(newSpans).map(node => node.textContent);

                    // if (texts.length != 0) {
                    //     console.log(texts)
                    //     data = {
                    //         "inputs": texts
                    //     }
                    //     console.log(navigator.serviceWorker.controller.postMessage({
                    //         type: 'summarizeRu',
                    //         payload: data
                    //     }));
                    // }
                    newSpans.forEach(span => {
                        let url = new URL("ru", base_url)
                        url.searchParams.set("text", span.innerHTML)
                        let xhr = new XMLHttpRequest();

                        xhr.open('POST', url, true);
                        xhr.setRequestHeader("ngrok-skip-browser-warning", "69420")

                        xhr.send();
                        xhr.onload = function() {
                            if (xhr.status != 200) { // HTTP ошибка?
                                // обработаем ошибку
                                alert('Ошибка: ' + xhr.status);
                                return;
                            }
                            
                            div = span.parentNode.insertBefore(document.createElement("div"), span)
                            div.textContent = "💻📃" + xhr.response
                            console.log("Отзыв: " + span.innerHTML)
                            console.log("Обобщение: " + xhr.response)
                            console.log("-----------")
                        };

                    })
                }
            });
        }
    });
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});