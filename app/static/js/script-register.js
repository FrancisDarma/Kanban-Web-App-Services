const formRegister = document.getElementById("form-register");

formRegister.addEventListener("submit", function (event) {
  event.preventDefault();
  //ajax
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5000/api/auth/register";

  //memanggil toast error pada registration page
  const toastLive = document.getElementById("liveToast");
  const toastMsgError = document.getElementById("toast-body");
  toastMsgError.innerHTML = "Isian tidak boleh kosong";
  const toast = new bootstrap.Toast(toastLive);
  //ambil isian dari foṙm
  let email = document.getElementById("email").value;
  let nama = document.getElementById("nama").value;
  let password = document.getElementById("password").value;
  let confirm_password = document.getElementById("confirm_password").value;
  //validasi
  if (email == "") return toast.show();
  if (nama == "") return toast.show();
  if (password == "") return toast.show();
  if (password != confirm_password) {
    toastMsg.innerHTML = "Password yang dimasukan tidak cocok!";
    toast.show();
  }

  let data = JSON.stringify({
    email: email,
    name: nama,
    password: password,
  });
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.onreadystatechange = function () {
    if (this.status == 200) {
      //memanggil toast success
      const toastLive = document.getElementById("liveToastSuccess");
      const toastMsgSuccess = document.getElementById("toast-body-success");
      toastMsgSuccess.innerHTML = "Data berhasil dimasukan!";
      const toast = new bootstrap.Toast(toastLive);
      toast.show()
      //reset form
      formRegister.reset();
    } else {
        toastMsgError.innerHTML = this.response
        toast.show()
    }
  };
  xhr.send(data);
});
