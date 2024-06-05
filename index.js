const miopia = spheres.filter((value) => value < 0);
const hipermetropia = spheres.filter((value) => value > 0);
const astigmatismo = CylindersNegatives.filter((value) => value < 0);

let lensType = miopia;
function changeLensType() {
  const lensTypeRadios = document.querySelectorAll('input[name="lensType"]');

  lensTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
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

  input.addEventListener("click", function (event) {
    if (!container.contains(event.target)) {
      container.style.display = "block";
    }
  });

  document.addEventListener("click", function (event) {
    if (!container.contains(event.target) && event.target !== input) {
      container.style.display = "none";
    }
  });

  let opts = optionsArray.map((value) => {
    if (
      (lensType === "Miopia" && value <= 0) ||
      (lensType === "Hipermetropia" && value >= 0) ||
      (lensType === "Astigmatismo" && value <= 0)
    ) {
      return `<span class="styled-option option_${inputId}" data-value="${value.toFixed(
        2
      )}">${value.toFixed(2)}</span>`;
    }
  });
  opts = opts.filter((value) => value !== undefined);
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
