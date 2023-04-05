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

async function summarizeRu(text) {
    url = new URL("ru", base_url)
    url.searchParams.set("text", text)
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