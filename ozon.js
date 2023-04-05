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
                    newSpans.forEach(async (span) => {
                        data = summarizeRu(span.innerHTML).then((json) => {
                            console.log(json)
                            span.parentNode.classList.add(json["sentiment"])
                            div = span.parentNode.insertBefore(document.createElement("div"), span)
                            div.textContent = "💻📃" + json["summarization"]
                            console.log("Отзыв: " + span.innerHTML)
                            console.log("Обобщение: " + json["summarization"])
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