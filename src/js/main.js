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
  
    const addImageToCourseBtn = document.querySelector(".jsImagesAdd");
    if (addImageToCourseBtn) {
      const ImagesContainerElement = document.querySelector(".jsImagesCourse");
      console.log(ImagesContainerElement);
      addImageToCourseBtn.addEventListener("click", e => {
        e.preventDefault();
        const input = document.createElement("input");
        input.classList.add("form__group-input");
        input.type = "file";
        input.name = "images";
        input.accept = "image/*";
        ImagesContainerElement.insertBefore(
          input,
          ImagesContainerElement.lastChild
        );
      });
    }
  
    const form = document.querySelector(".jsCourseForm");
  
    form.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(form);
      const fileInputs = form.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => {
        const files = input.files;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          formData.append("uploaded_images", file);
        }
      });
  
      const csrfToken = formData.get("csrfmiddlewaretoken");
  
      fetch("/account-courses", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        body: formData,
      })
        .then(response => {
          console.log(response);
          if (response.ok) {
            location.reload();
          } else {
            location.reload();
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  });
  