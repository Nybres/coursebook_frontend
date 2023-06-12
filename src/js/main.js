addEventListener("DOMContentLoaded", event => {
  const alerts = document.querySelectorAll(".alert");
    console.log(alerts);
  if (alerts) {
    alerts.forEach(alert => {
      const deley = setTimeout(() => {
        alert.classList.add("alert__hide");
      }, 2000);
    });
  }
});
