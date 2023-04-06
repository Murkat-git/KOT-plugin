xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.ngrok.com/tunnels', false);
xhr.setRequestHeader('Authorization', "Bearer 2KzEJxdsOBvaLkkhSEkvCHqcRwr_5dUwMXisnnBsT1p695sPi")
xhr.setRequestHeader("Ngrok-Version", "2")

xhr.send();
if (xhr.status != 200) {
    //alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    throw new Error({
        "API Error": "Couldn`t find API url"
    })
} else {
    const json = JSON.parse(xhr.response)
    base_url = new URL(json["tunnels"][0]["public_url"])
    alert(base_url)
}

const removeEmojis = (text) => {
    if (!text) {
        return '';
    }
    return text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
}

const removeSpecialCharacters = (text) => {
    return text.replace(/[&]nbsp[;]/gi," ")
}

const formatText = (text) => {
    return removeSpecialCharacters(removeEmojis(text));
}

async function summarizeRu(text) {
    url = new URL("ru", base_url)
    url.searchParams.set("text", formatText(text))
    return await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "ngrok-skip-browser-warning": "1"
        }
    }).then((response) => {
        return response.json()
    })
}

