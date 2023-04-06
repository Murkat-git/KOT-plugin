process = (node) => {
    const newReviews = node.querySelectorAll('dl[data-auto="review-pro"] > dd, dl[data-auto="review-contra"] > dd, dl[data-auto="review-comment"] > dd');
    newReviews.forEach(async(review) => {
        data = summarizeRu(review.innerHTML).then((json) => {
            console.log(json)
            review.parentNode.classList.add(json["sentiment"])
            div = review.parentNode.insertBefore(document.createElement("div"), review)
            div.textContent = "💻📃" + json["summarization"]
            console.log("Отзыв: " + review.innerHTML)
            console.log("Обобщение: " + json["summarization"])
            console.log("-----------")
        })
    })
}
process(document)

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