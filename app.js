const fromloc = document.querySelector(".selectfromlocation"),
    toloc = document.querySelector(".selecttolocation"),
    adultno = document.querySelector("input[name='adultsNumber']"),
    childno = document.querySelector("input[name='childrenNumber']"),
    slipcontainer = document.querySelector(".slipcontainer");

let getadultno = 1;
let getchildno = 1;

const locations = {
    NotSelected: 'notSelected',
    Bulandshahr: 'Bulandshahr',
    Baral: 'Baral',
    NayaChhaprawat: 'NayaChhaprawat',
    Chhaprawat: 'Chhaprawat',
    Gulaothi: 'Gulaothi',
    Hafizpur: 'Hafizpur',
    Hapur: 'Hapur',
};


function getadultpass() {
    return adultno.value;

}
let getchildpass = () => {
    return childno.value;

}
function logCheckedValues() {
    checkboxes = document.querySelectorAll('input[name="fare"]:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
};


function refreshPage() {
    window.location.reload();
}

function addstations(stationClass, stations) {
    const dropdowns = document.querySelectorAll('.' + stationClass);
    dropdowns.forEach(dropdown => {
        dropdown.innerHTML = '';
        Object.keys(stations).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = stations[key];
            dropdown.appendChild(option);
        });
    });
}
addstations('selectfromlocation', locations);
addstations('selecttolocation', locations);

function calculatefare(startloc, endloc) {
    const fares = {
        'Bulandshahr': {
            'Baral': 25,
            'NayaChhaprawat': 35,
            'Chhaprawat': 35,
            'Gulaothi': 45,
            'Hafizpur': 55,
            'Hapur': 68,
        },
        'Baral': {
            'Bulandshahr': 25,
            'NayaChhaprawat': 20,
            'Chhaprawat': 20,
            'Gulaothi': 32,
            'Hafizpur': 37,
            'Hapur': 48,
        },
        'NayaChhaprawat': {
            'Bulandshahr': 35,
            'Baral': 15,
            'Chhaprawat': 10,
            'Gulaothi': 25,
            'Hafizpur': 28,
            'Hapur': 40,
        },
        'Chhaprawat': {
            'Bulandshahr': 35,
            'Baral': 20,
            'NayaChhaprawat': 10,
            'Gulaothi': 20,
            'Hafizpur': 25,
            'Hapur': 40,
        },
        'Gulaothi': {
            'Bulandshahr': 50,
            'Baral': 42,
            'NayaChhaprawat': 25,
            'Chhaprawat': 20,
            'Hafizpur': 20,
            'Hapur': 35,
        },
        'Hafizpur': {
            'Bulandshahr': 55,
            'Baral': 37,
            'NayaChhaprawat': 28,
            'Chhaprawat': 25,
            'Gulaothi': 20,
            'Hapur': 25,
        },
    };
    if (fares[startloc] && fares[startloc][endloc]) {
        let passtypes = logCheckedValues();
        let getchildno = getchildpass();
        let getadultno = getadultpass();
        if (passtypes.includes("child") && !passtypes.includes("adult")) {
            console.log(getchildno);
            if (getchildno == "" || getchildno == 1) {
                let fare = fares[startloc][endloc] / 2;
                return fare;
            } else {
                let fare = (fares[startloc][endloc] / 2) * getchildno;
                return fare;
            }

        } else if (passtypes.includes("adult") && passtypes.includes("child")) {
            if (getadultno == 1 && getchildno == 1) {
                let fare = fares[startloc][endloc] + fares[startloc][endloc] / 2;
                return fare;
            } else {
                let fare = (fares[startloc][endloc]) * getadultno + (fares[startloc][endloc] / 2) * getchildno;
                return fare;
            }
        } else if (!passtypes.includes("child") && passtypes.includes("adult")) {
            console.log(getadultno);
            if (getadultno == "" || getadultno == 1) {
                let fare = fares[startloc][endloc];
                return fare;
            } else {
                let fare = (fares[startloc][endloc]) * getadultno;
                return fare;
            }
        } else {
            let fare = fares[startloc][endloc];
            return fare;
        }
    } else {
        return "fare not found";
    }
}

function printticket() {
    let content = document.querySelector(".slipcontainer").innerHTML;
    let originalcontent = document.body.innerHTML;
    document.body.innerHTML = content;
    window.print();
    document.body.innerHTML = originalcontent;
}

function slipcontainerfunc() {
    let getinfo = {
        startloc: fromloc.value,
        endloc: toloc.value,
        getadultno: getadultpass(),
        getchildno: getchildpass(),
        passtypes: logCheckedValues(),
        totalticket: eval(Number(getadultpass()) + Number(getchildpass())),
        fare: calculatefare(fromloc.value, toloc.value)
    };
    console.log(getinfo);
    slipcontainer.innerHTML += `<div class="detailbox">
        <table border="0" width="100%" cellspacing="5px">
            <tr align="center" bgcolor="#b2b2b2">
                <td colspan="2" >
                    <h2>Details</h2>
                </td>
            </tr>
            <tr>
                <td>From</td>
                <td>${getinfo.startloc}</td>
            </tr>
            <tr>
                <td>To</td>
                <td>${getinfo.endloc}</td>
            </tr>
            <tr>
                <td>Count</td>
                <td>${getinfo.totalticket}</td>
            </tr>
            <tr>
                <td>Total Fare</td>
                <td>₹${getinfo.fare}</td>
            </tr>
        </table>
        </div>
        <div class="printticket">
        <button class="printbtn" type="print" onclick="printticket()">Print Ticket</button>
        </div>`
    document.querySelector('.farebtn').removeEventListener("click", slipcontainerfunc);
}

document.querySelector('.farebtn').addEventListener("click", slipcontainerfunc);

