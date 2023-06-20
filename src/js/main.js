addEventListener("DOMContentLoaded", event => {
  const alerts = document.querySelectorAll(".alert");
  if (alerts) {
    alerts.forEach(alert => {
      const deley = setTimeout(() => {
        alert.classList.add("alert__hide");
      }, 2000);
    });
  }

  const accountAddBtn = document.querySelector(".js-account-add");
  if (accountAddBtn) {
    const overlay = document.querySelector(".overlay");
    const drawer = document.querySelector(".drawer");
    const drawerBackBtn = drawer.querySelector(".drawer__back");

    accountAddBtn.addEventListener("click", () => {
      drawer.classList.add("drawer--active");
      overlay.classList.add("overlay--active");
      document.body.classList.add("no-scroll");
    });

    drawerBackBtn.addEventListener("click", () => {
      drawer.classList.remove("drawer--active");
      overlay.classList.remove("overlay--active");
      document.body.classList.remove("no-scroll");
    });
  }
});
