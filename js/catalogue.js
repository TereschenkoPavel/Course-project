let xmlContent = '';
let grid = document.getElementById('grid');
fetch('xml/catalogue.xml').then((response)=>{
    response.text().then((xml)=>{
        xmlContent = xml;
        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
        let bouquets = xmlDOM.querySelectorAll('bouquet');
        bouquets.forEach(bouquetXmlNode => {
            let a = document.createElement('a');

            let image = document.createElement('img');
            image.src = bouquetXmlNode.children[0].innerHTML;
            a.appendChild(image);

            let name = document.createElement('p');
            name.innerText = bouquetXmlNode.children[1].innerHTML;
            a.appendChild(name);

            let cost = document.createElement('p');
            cost.innerText = bouquetXmlNode.children[2].innerHTML;
            a.appendChild(cost);

            a.href = bouquetXmlNode.children[3].innerHTML;
            grid.appendChild(a);
        })
    })
});
