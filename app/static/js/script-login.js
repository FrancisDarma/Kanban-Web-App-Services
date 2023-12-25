const formLogin = document.getElementById("form-login")

//ambil data dari json kemudian
//login when click button
window.onload = function (){
    formLogin.addEventListener("submit", function(e){
    e.preventDefault()
    let  xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/api/auth/login"; //ganti nama file sesuai nama file json kalian
    // get the value from form
    let loginEmail = document.getElementById("login-email").value
    let loginPassword = document.getElementById("login-password").value

    // konfigurasi toast error
    const toastLive= document.getElementById("liveToast");
    const toastMsgError = document.getElementById("toast-body")
    toastMsgError.innerHTML = "Email atau password salah"
    const toast = new bootstrap.Toast(toastLive);
    // validasi form
    if(loginEmail == '') return toast.show()
    if(loginPassword == '') return toast.show()

    let data = JSON.stringify({
        email: loginEmail,
        password: loginPassword
      });

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('refresh_token')}`);
    xhr.onreadystatechange = function(){
        if(this.status == 200){
            let data = JSON.parse(this.response)
            console.log(data)
            //save to token to localStorage
            localStorage.setItem("access_token", data.access_token)
            window.location.href = "http://127.0.0.1:5000/"; //ganti ke url default

        }else{
            toastMsgError.innerHTML = this.response
            toast.show()
        }
        };
        xhr.send(data);
    })
}



