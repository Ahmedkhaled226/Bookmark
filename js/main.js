let webSiteNameInput = document.getElementById('webSiteName')
let webSiteUrlInput = document.getElementById('webSiteUrl')
let searchInput = document.getElementById('searchInput')
let submitBtn = document.getElementById("submitBtn")
let editBtn = document.getElementById("editBtn")
let upForm = document.getElementById("upForm")
let downForm = document.getElementById("downForm")
let closeBtn = document.getElementById("closeBtn");
let boxModal = document.getElementById("msg");
let index = 0;
webSiteContainer = []



if (localStorage.getItem('allSites') != null) {
    webSiteContainer = JSON.parse(localStorage.getItem('allSites'))
    displayWebSite()

}
function addWebSite() {


    if (validName() == true && validURL() == true) {
        webSite = {
            Id: webSiteNameInput.value,
            url: webSiteUrlInput.value,
        }
        webSiteContainer.push(webSite)
        localStorage.setItem('allSites', JSON.stringify(webSiteContainer))
        displayWebSite()
        clearForm()


    } else {
        boxModal.classList.remove("d-none");
        // boxModal.classList.add("vh-100");

        document.body.style.overflow = "hidden";


    }
}
function closeModal() {
    boxModal.classList.add("d-none");
    document.body.style.overflow = "visible";

}






function clearForm() {
    webSiteNameInput.value = ''
    webSiteUrlInput.value = ''
    webSiteNameInput.classList.remove("is-valid")
    webSiteUrlInput.classList.remove("is-valid")
}
function deleteWebSite(index) {
    webSiteContainer.splice(index, 1)
    localStorage.setItem('allSites', JSON.stringify(webSiteContainer))
    displayWebSite()
}
function displayWebSite() {
    let term = searchInput.value
    let container = ''
    for (let i = 0; i < webSiteContainer.length; i++) {
        if (webSiteContainer[i].Id.toLowerCase().includes(term.toLowerCase())) {
            container += `
        <tr>
        <th class="text-capitalize">${[i + 1]}</th>
        <th class="text-capitalize">${webSiteContainer[i].Id}</th>
        <th class="text-capitalize"><button onclick="visitURL('${webSiteContainer[i].url}')"
                    class="btn btn-visit">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                </button></th>
                <th class="text-capitalize"><button onclick="setFormEdit(${i})" class="btn btn-info">
                <i class="fa-solid fa-pen-nib"></i> Edit
                </button></th> 
        <th class="text-capitalize"><button onclick="deleteWebSite(${i})" class="btn btn-delete pe-2"
             >
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button></th>
           
        </th>
       
    </tr>
        
        
        `
        }
    }
    document.getElementById('demo').innerHTML = container
}

function visitURL(url) {
    const regex = /^https?:\/\//;
    if (regex.test(url)) {
      window.open(url, "_blank");
    } else {
      window.open(`https://${url}`, "_blank");
    }
  }

function validName() {
    let text = webSiteNameInput.value;
    let regex = /^[A-Za-z]{3,20}$/;
    let msgNameElement = document.getElementById("msgName")
    if (regex.test(text) == true) {

        webSiteNameInput.classList.add("is-valid")
        webSiteNameInput.classList.remove("is-invalid")
        msgNameElement.classList.add('d-none')
        return true

    } else {

        webSiteNameInput.classList.add("is-invalid")
        webSiteNameInput.classList.remove("is-valid")
        msgNameElement.classList.remove('d-none')
        return false

    }
}
function validURL() {
    let text = webSiteUrlInput.value;
    const regex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    let msgURLElement = document.getElementById("msgURL")
    if (regex.test(text) == true) {

        webSiteUrlInput.classList.add("is-valid")
        webSiteUrlInput.classList.remove("is-invalid")
        msgURLElement.classList.add('d-none')
        return true

    } else {

        webSiteUrlInput.classList.add("is-invalid")
        webSiteUrlInput.classList.remove("is-valid")
        msgURLElement.classList.remove('d-none')
        return false

    }
}



function setFormEdit(indexElement) {
    webSiteNameInput.value = webSiteContainer[indexElement].Id
    webSiteUrlInput.value = webSiteContainer[indexElement].url

    submitBtn.classList.add('d-none')
    editBtn.classList.remove('d-none')
    index = indexElement
}

function editData() {
    let webSite = {
        Id: webSiteNameInput.value,
        url: webSiteUrlInput.value,
    }
    webSiteContainer.splice(index, 1, webSite)
    localStorage.setItem('allSites', JSON.stringify(webSiteContainer))
    displayWebSite()
    clearForm()

    submitBtn.classList.remove('d-none')
    editBtn.classList.add('d-none')

}







closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeModal();
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-info")) {
        closeModal();
    }
});

function download() {
    document.getElementById('download').addEventListener("click", () => {
        const pageMain = this.document.getElementById("pageMain");
    })
    var opt = {
        margin: 1,
        filename: 'myfile.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(pageMain).set(opt).save()

}



function toggleForm() {
    const form = document.getElementById("myForm");
    form.classList.toggle("hide");
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    boxModal.classList.toggle('dark-mode');
}