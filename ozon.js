const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const readmore = node.querySelectorAll("div[data-widget='webListReviews'] > div:nth-child(2) > div > div > div:nth-child(2) span:nth-child(2)")
                    readmore.forEach(button => {
                        button.click()
                    })
                    const newSpans = node.querySelectorAll("div[data-widget='webListReviews'] > div > div > div > div > div > div > div:nth-child(2) > span:nth-child(1)");
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
                    newSpans.forEach(async (span) => {
                        data = summarizeRu(span.innerHTML).then((text) => {
                            div = span.parentNode.insertBefore(document.createElement("div"), span)
                            div.textContent = "💻📃" + text
                            console.log("Отзыв: " + span.innerHTML)
                            console.log("Обобщение: " + text)
                            console.log("-----------")
                        })
                        
                        

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