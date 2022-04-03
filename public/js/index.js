
window.onload = async () => {
    let url = "http://localhost:4000/watchedcurrency/all";
    let res = await fetch(url)
    createTable(await res.json())
    monitor();
    declareViewEvents();    
};

// create tabel
const createTable = (data) => {
    data.forEach((element, index) => {
        createRow(index, element.id, element.CurrencySymbolFld, element.ThresholdFld)
    });
};

// create tabel rows 
const createRow = (_index, _id, _symbol, _threshold) => {
    let parent = document.querySelector("#id_parent");
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    parent.appendChild(tr)
    tr.innerHTML = `<td>${_index + 1}</td>
    <td>${_symbol}</td>
    <td>${_threshold}</td>`
};

//monitor
const monitor = async () => {
    let url = "http://localhost:4000/monitor";
    let res = await fetch(url);
    let data = await res.json()
    console.log(data)
    alert(data.msg);
    data.data.forEach((item, index) => {
        alert(`${index + 1 + ")"} date: ${item.timestamp}, currency Symbol: ${item.currencySymbol}, new value: ${item.valueToDate}`)
    });
};

const declareViewEvents = () => {
    let monitor_btn = document.querySelector("#monitor");
    monitor_btn.addEventListener("click", () => {
        monitor()
    });
};







