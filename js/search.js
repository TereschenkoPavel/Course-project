const input = document.getElementById("search")
const template = document.querySelector("[bouquet-template]")
const container = document.getElementById("grid")

let flowers = []
let xmlContent = '';
let bouquets = '';
fetch('xml/catalogue.xml').then((response)=>{
    response.text().then((xml)=>{  
        xmlContent = xml;
        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
        bouquets = xmlDOM.querySelectorAll('bouquet');
        
        flowers = Array.from(bouquets).map(bouquetXmlNode => {
            const card = template.content.cloneNode(true).children[0]
            const image = card.querySelector("[image]")
            const desc = card.querySelector("[desc]")
            const price = card.querySelector("[price]")
            image.src = bouquetXmlNode.children[0].innerHTML;
            desc.innerText = bouquetXmlNode.children[1].innerHTML;
            price.innerText = bouquetXmlNode.children[2].innerHTML;
            card.href = bouquetXmlNode.children[3].innerHTML;
            card.classList.toggle("hide")
            container.append(card)
            return{ image: bouquetXmlNode.children[0].innerHTML, desc: bouquetXmlNode.children[1].innerHTML, price: bouquetXmlNode.children[2].innerHTML, element: card}
        })
    })
})
input.addEventListener("input", (e)=>{
    const value = e.target.value.toLowerCase()
    flowers.forEach(bouquet => {
        const isVisible = bouquet.desc.toLowerCase().includes(value) && value !=""
        bouquet.element.classList.toggle("hide", !isVisible)
    });
})