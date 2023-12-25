//fungsi untuk update status task
function updateStatus(id, status) {
    let xhr = new XMLHttpRequest()
    let url = "http://127.0.0.1:5000/api/tasks/status/" + id

    let statusData = JSON.stringify({
        status: !status
    })
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
    );
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)

            location.reload()
        }
    };
    return xhr.send(statusData);
}


// cek apakah user telah login
function checkStatus(id) {
    let xhr = new XMLHttpRequest()
    let url = "http://127.0.0.1:5000/api/tasks/" + id

    xhr.open("GET", url, true);
    xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
    );
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            console.log(response.data.status)
            //update status tasks
            updateStatus(id, response.data.status)
        }
    };
    return xhr.send();
}

// Section untuk drag and drop
function allowDrop(event) {
    //cegah perilaku default elemen
    event.preventDefault();

}
function drag(event) {
    //mendeteksi elemen yang di drag dengan melihat id
    event.dataTransfer.setData("text", event.target.id);

}

function drop(event) {
    //cegah perilaku default elemen
    event.preventDefault();

    // let dataId = event.relatedTarget.attributes["id"];
    let data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
    let dataId = event.srcElement.lastChild.id
    //cek status tasks & update status
    checkStatus(dataId)
    //refresh page

}

//GET DATA FROM JSON
//seleksi todoITEM untuk menampung selurush item
let todoItem = document.getElementById("todo");
let doneItem = document.getElementById("done");
//fungsi dijalankan ketika window berhasil load
window.onload = function () {
    // cek apakah user telah login
    if (
        (localStorage.getItem("access_token") &&
            localStorage.getItem("access_token")) == null
    ) {
        window.location.href = "http://127.0.0.1:5000/auth/login"; //
    }
    //buat object ajax dan url data
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/api/tasks"; //ganti nama file sesuai nama file json kalian

    xhr.open("GET", url, true);
    xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
    );
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //masukan response kedalam local storage
            //ambil data dari local storage
            let getData = JSON.parse(this.response);
            //looping seluruh data untuk menampilkan data pada browser
            getData["data"].forEach((task) => {
                //artikel akan menjadi elemen parent yang akan menampung data
                let article = document.createElement("article");
                //buat button yang akan menampung tombol aksi
                let badgeDelete = document.createElement("button");
                let badgeEdit = document.createElement("button");

                //buat element paragraf dan header 4
                let h4 = document.createElement("h4");
                let p = document.createElement("p");
                //buat title dan description dari data menjadi child text node pada h4 dan p
                // console.log(data[0].tasks.title)
                h4.appendChild(document.createTextNode(task.title));
                h4.setAttribute("id", task.id);
                p.appendChild(document.createTextNode(task.description));

                //tambahkan konfigurasi html pada artkel
                article.setAttribute("class", "border p-3 mt-3");
                article.setAttribute("ondragstart", "drag(event)");
                article.setAttribute("draggable", "true");
                //berikan attribute id pada artikel
                article.setAttribute("id", task.id);

                //konfigurasi attribute untuk tombol edit dan
                badgeDelete.setAttribute("href", "#");
                badgeDelete.setAttribute("class", "badge bg-danger ");
                badgeDelete.setAttribute("data-id", task.id);
                badgeDelete.setAttribute("data-bs-toggle", "modal");
                badgeDelete.setAttribute("data-bs-target", "#myModalDelete");
                badgeEdit.setAttribute("href", "#");
                badgeEdit.setAttribute("class", "badge bg-info ");
                badgeEdit.setAttribute("data-title", task.title);
                badgeEdit.setAttribute("data-id", task.id);
                badgeEdit.setAttribute("data-description", task.desc);
                badgeEdit.setAttribute("data-bs-toggle", "modal");
                badgeEdit.setAttribute("data-bs-target", "#myModalEdit");

                //append element h4, p , tombol hapus, dan edit menjadi anak artikel
                article.appendChild(h4);
                article.appendChild(p);
                article.appendChild(badgeDelete);
                article.appendChild(badgeEdit);
                //buat tombol delete dan edit memiliki tulisan "delete" dan "edit"
                badgeDelete.appendChild(document.createTextNode("Delete"));
                badgeEdit.appendChild(document.createTextNode("Edit"));

                //append artikel kedalam sebuah todoITem
                // kondisional rendering
                if (task.status == true) {
                    article.setAttribute("style", "text-decoration: line-through")
                    doneItem.appendChild(article);
                } else {
                    todoItem.appendChild(article);
                }

            });
        }
    };
    xhr.send();
};

//Fungsi ADD
//seleksi tombol tambah
const addForm = document.getElementById("add-form");
addForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/api/tasks";
    //seleksi nilai dari input title dan description
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;

    //konfigurasi toast
    const toastLiveExample = document.getElementById("liveToastAdd");
    const toastMsgAdd = document.getElementById("toast-body-add");
    const toast = new bootstrap.Toast(toastLiveExample);
    //validasti input
    if (title == "") {
        toastMsgAdd.innerHTML = "Isian title tidak boleh kosong";
        toast.show();
    }
    if (description == "") {
        toastMsgAdd.innerHTML = "Isian deskripsi tidak boleh kosong";
        toast.show();
    }
    let new_data = JSON.stringify({
        title: title,
        description: description,
    });

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
    );
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //close the modal after adding data
            const myModalAdd = bootstrap.Modal.getInstance("#myModalAdd");
            myModalAdd.hide();

            //reset form
            addForm.reset();
            //refresh page
            location.reload();
        } else {
            //konfigurasi toast berhasil
            const toastLive = document.getElementById("liveToast");
            const toastMsg = document.getElementById("toast-body");
            const toast = new bootstrap.Toast(toastLive);
            toastMsg.innerHTML = "Data berhasil";
            toast.show();
        }
    };
    xhr.send(new_data);
});

//fungsi DELETE
// seleksi elemen modal delete
const myModalDelete = document.getElementById("myModalDelete");
//berikan event ketika modal delete muncul
myModalDelete.addEventListener("show.bs.modal", function (event) {
    //mendeteksi elemen yang diklik user
    let dataId = event.relatedTarget.attributes["data-id"];
    const deleteForm = document.getElementById("delete-form")
    //ketika tombol delte diklik jalankan fungsi hapus
    deleteForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest()
        let url = "http://127.0.0.1:5000/api/tasks/" + dataId.value

        xhr.open("DELETE", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.setRequestHeader(
            "Authorization",
            `Bearer ${localStorage.getItem("access_token")}`
        );
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.response)

                const myModalDelete = bootstrap.Modal.getInstance("#myModalDelete");
                myModalDelete.hide();

                const alertLoc = document.getElementById("alert-loc")
                const alertEl = document.createElement("div")
                alertEl.setAttribute("class", "alert alert-success")
                alertEl.setAttribute("role", "alert")
                alertEl.innerHTML = response.message

                alertLoc.append(alertEl)

                document.getElementById(dataId.value).classList.add('d-none');
            }
        };
        xhr.send();
        //close modal
        // const myModalDelete = bootstrap.Modal.getInstance("#myModalDelete");
        // myModalDelete.hide();
    });
});

// seleksi modal edit
const myModalEdit = document.getElementById("myModalEdit");
// ketika modal edit muncul jalankan fungsi berikut
myModalEdit.addEventListener("show.bs.modal", function (event) {
    //mendapatkan id dari item
    let dataId = event.relatedTarget.attributes["data-id"];
    // console.log(dataId.value)
    //get data with specific id 
    let xhr = new XMLHttpRequest()
    let url = "http://127.0.0.1:5000/api/tasks/" + dataId.value

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("access_token")}`
    );
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.response)
            let oldTitle = document.getElementById("edit-title");
            let oldDescription = document.getElementById("edit-description")
            oldTitle.value = data.data.title;
            oldDescription.value = data.data.description;
            //close the modal after adding data
        }
    };
    xhr.send();
    // let btnEdit = document.getElementById('btn-edit')
    let editForm = document.getElementById("edit-form");
    editForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest()
        let url = "http://127.0.0.1:5000/api/tasks/" + dataId.value

        let newTitle = document.getElementById("edit-title").value;
        let newDescription = document.getElementById("edit-description").value;
        //konfigurasi toast
        //konfigurasi toast
        const toastLiveExample = document.getElementById("liveToastEdit");
        const toastMsgEdit = document.getElementById("toast-body-edit");
        const toast = new bootstrap.Toast(toastLiveExample);
        //validasi input
        if (newTitle == "") {
            toastMsgEdit.innerHTML = "isian title tidak boleh kosong"
            toast.show()
        }
        if (newDescription == "") {
            toastMsgEdit.innerHTML = "isian description tidak boleh kosong"
            toast.show()
        }

        let data = JSON.stringify({
            title: newTitle,
            description: newDescription
        })
        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.setRequestHeader(
            "Authorization",
            `Bearer ${localStorage.getItem("access_token")}`
        );
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //close the modal after edit data
                const myModalEdit = bootstrap.Modal.getInstance("#myModalEdit");
                myModalEdit.hide();
                //reset form and reload page
                editForm.reset();
                location.reload();
            }
        };
        xhr.send(data);

    });
});


const logout = document.getElementById("logout")
logout.addEventListener("click", function (e) {
    e.preventDefault()
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/api/auth/logout";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('access_token')}`);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            localStorage.removeItem("access_token")
        } else {
            alert("Something went wrong !")
        }
    };
    xhr.send();

    //remove token from locasStorage
    window.location.href = "../auth/login"
})

//FUNGSI UNTUK MEREFRESH TOKEN
function refreshToken(){
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/api/auth/refresh";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('access_token')}`);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            localStorage.setItem("access_token", response.access_token)
        }
    };
    xhr.send();
}
// run refresh token every 15 minutes
setInterval(refreshToken, 900000)
//fugnsi untuk jam
let p = document.getElementById("jam");

function myTime() {
    let jam = new Date();
    p.innerHTML = jam.toLocaleTimeString([], {
        hour12: false,
    });
}
setInterval(myTime, 1000);
