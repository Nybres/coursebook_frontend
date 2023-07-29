addEventListener("DOMContentLoaded", event => {
  const alerts = document.querySelectorAll(".alert");
  if (alerts) {
    alerts.forEach(alert => {
      const deley = setTimeout(() => {
        alert.classList.add("alert__hide");
      }, 2000);
    });
  }

  const backdropActivate = overlay => {
    overlay.classList.add("overlay--active");
    document.body.classList.add("no-scroll");
  };

  const backdropDeActivate = overlay => {
    overlay.classList.remove("overlay--active");
    document.body.classList.remove("no-scroll");
  };

  const drawer = document.querySelector(".drawer");
  if (drawer) {
    const overlay = document.querySelector(".overlay");
    const accountAddBtn = document.querySelector(".jsAccountAdd");
    const drawerBackBtn = drawer.querySelector(".drawer__back");

    accountAddBtn.addEventListener("click", () => {
      drawer.classList.add("drawer--active");
      backdropActivate(overlay);
    });

    drawerBackBtn.addEventListener("click", () => {
      drawer.classList.remove("drawer--active");
      backdropDeActivate(overlay);
    });
  }

  const handleShadowNavigation = () => {
    if (window.scrollY > 148) {
      navigationElement.classList.add("nav--shadow");
    } else {
      navigationElement.classList.remove("nav--shadow");
    }
  };

  const navigationElement = document.querySelector(".nav");
  if (navigationElement) {
    window.addEventListener("scroll", handleShadowNavigation);
  }
});
