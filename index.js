let lensType = "Miopia";
function changeLensType() {
  const lensTypeRadios = document.querySelectorAll('input[name="lensType"]');

  lensTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      document.getElementById("odSph").value = "0.00";
      document.getElementById("osSph").value = "0.00";
      document.getElementById("odCyl").value = "0.00";
      document.getElementById("osCyl").value = "0.00";
      document.getElementById("odAxis").value = "0.00";
      document.getElementById("osAxis").value = "0.00";

      const selectedLensType = document.querySelector(
        'input[name="lensType"]:checked'
      ).id;

      renderOptions(
        "odSph",
        "container_sphere_od",
        "list_sphere_od",
        spheres,
        selectedLensType
      );
      renderOptions(
        "osSph",
        "container_sphere_os",
        "list_sphere_os",
        spheres,
        selectedLensType
      );

      renderOptions(
        "odCyl",
        "container_cyl_od",
        "list_cyl_od",
        CylindersNegatives,
        selectedLensType
      );
      renderOptions(
        "osCyl",
        "container_cyl_os",
        "list_cyl_os",
        CylindersNegatives,
        selectedLensType
      );
      renderOptions(
        "odAxis",
        "container_axis_od",
        "list_axis_od",
        axys,
        selectedLensType
      );
      renderOptions(
        "osAxis",
        "container_axis_os",
        "list_axis_os",
        axys,
        selectedLensType
      );
    });
  });
}

changeLensType();
const checkbox = document.querySelectorAll("input[type=checkbox]");
checkbox.forEach((value) => {
  value.addEventListener("change", function () {
    document.getElementById("odSph").value = "0.00";
    document.getElementById("osSph").value = "0.00";
    document.getElementById("odCyl").value = "0.00";
    document.getElementById("osCyl").value = "0.00";
    document.getElementById("odAxis").value = "0.00";
    document.getElementById("osAxis").value = "0.00";
    const selectedLensType = value.id;

    if (value.checked && selectedLensType === "Presbiopia") {
      const button = document.querySelector(".submit_button");
      const title = document.createElement("h2");
      title.innerText = "Prescrição da sua Presbiopia";
      title.classList.add("lens_type_label");
      const inputPres = document.createElement("input");
      inputPres.type = "text";
      inputPres.id = "prescription";
      inputPres.placeholder = "Digite a prescrição";
      inputPres.required = true;
      button.insertAdjacentElement("beforebegin", inputPres);
      inputPres.insertAdjacentElement("beforebegin", title);
    } else if (!value.checked && selectedLensType === "Presbiopia") {
      document.getElementById("prescription").remove();
    }
  });
});

function renderOptions(
  inputId,
  containerClass,
  listClass,
  optionsArray,
  lensType
) {
  const input = document.getElementById(inputId);
  const container = document.querySelector(`.${containerClass}`);
  const list = container.querySelector(`.${listClass}`);
  const inputSelected = document.querySelector("input[type=radio]:checked").id;
  const checkbox = document.querySelectorAll("input[type=checkbox]");
  let checked;
  checkbox.forEach((value) => {
    if (value.checked) {
      checked = value.id;
    }
  });

  let opts = optionsArray.map((value) => {
    if (inputId.includes("Sph")) {
      return `<span class="styled-option option_${inputId}" id="option_${inputId}_${value}" data-value="${value.toFixed(
        2
      )}">${value.toFixed(2)}</span>`;
    } else if (lensType === "Astigmatismo" && inputId.includes("Cyl")) {
      return `<span class="styled-option option_${inputId}" id="option_${inputId}_${value}" data-value="${value.toFixed(
        2
      )}">${value.toFixed(2)}</span>`;
    } else if (lensType === "Astigmatismo" && inputId.includes("Axis")) {
      return `<span class="styled-option option_${inputId}" id="option_${inputId}_${value}" data-value="${value.toFixed(
        2
      )}">${value.toFixed(2)}º</span>`;
    }
  });

  opts = opts.filter((value) => value !== undefined);
  list.innerHTML = "";
  opts.forEach((opt) => {
    list.insertAdjacentHTML("beforeend", opt);
  });
  const styledOptions = container.querySelectorAll(`.styled-option`);
  styledOptions.forEach((styledOption) => {
    styledOption.addEventListener("click", function () {
      input.value = styledOption.getAttribute("data-value");
      container.style.display = "none";
    });
  });
  input.addEventListener("click", function (event) {
    if (!container.contains(event.target)) {
      container.style.display = "block";
      const zeroElement = document.getElementById(`option_${inputId}_0`);
      if (zeroElement) {
        list.scrollTop = zeroElement.offsetTop - 100;
      }
    }
  });

  document.addEventListener("click", function (event) {
    if (!container.contains(event.target) && event.target !== input) {
      container.style.display = "none";
    }
  });
}

renderOptions(
  "odSph",
  "container_sphere_od",
  "list_sphere_od",
  spheres,
  "Miopia"
);
renderOptions(
  "osSph",
  "container_sphere_os",
  "list_sphere_os",
  spheres,
  "Miopia"
);
renderOptions(
  "odCyl",
  "container_cyl_od",
  "list_cyl_od",
  CylindersNegatives,
  "Miopia"
);
renderOptions(
  "osCyl",
  "container_cyl_os",
  "list_cyl_os",
  CylindersNegatives,
  "Miopia"
);
renderOptions("odAxis", "container_axis_od", "list_axis_od", axys, "Miopia");
renderOptions("osAxis", "container_axis_os", "list_axis_os", axys, "Miopia");
