process = (node) => {
    const newReviews = node.querySelectorAll('.feedback__text');
    newReviews.forEach(async(review) => {
        data = summarizeRu(review.innerHTML).then((json) => {
            console.log(json)
            review.parentNode.classList.add(json["sentiment"])
            div = review.parentNode.insertBefore(document.createElement("div"), review)
            div.innerHTML = formatText(json["summarization"])
            console.log("Отзыв: " + review.innerHTML)
            console.log("Обобщение: " + json["summarization"])
            console.log("-----------")
        })
    })
}

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    process(node)
                }
            });
        }
    });
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});