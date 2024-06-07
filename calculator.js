function convertPrescription(
  odSph,
  odCyl,
  odAxis,
  osSph,
  osCyl,
  osAxis,
  lensType,
  vertexDistance = 0.012
) {
  function convertSpherical(diopter, vertexDistance) {
    return diopter / (1 - vertexDistance * diopter);
  }

  function roundToNearestQuarter(value) {
    const quarter = 0.25;
    return Math.round(value / quarter) * quarter;
  }
  function convertCyl() {
    if (odCyl >= -0.75) {
      odSph = odSph + odCyl / 2;
      odCyl = 0;
    } else if (odCyl % 1 === 0 || odCyl % 0.5 === 0) {
      odCyl = odCyl + 0.25;
    }
    if (osCyl >= -0.75) {
      osSph = osSph + osCyl / 2;
      osCyl = 0;
    } else if (osCyl % -1 === 0 || osCyl % -0.5 === 0) {
      osCyl = osCyl + 0.25;
    }
  }
  function convertAxis() {
    if (lensType === "Astigmatismo") {
      if (odAxis >= 0) {
        odAxis = Math.floor(odAxis / 10) * 10;
        if (odAxis <= 0) odAxis = 180;
      }
      if (osAxis >= 0) {
        osAxis = Math.ceil(osAxis / 10) * 10;
      }
    }
  }
  convertCyl();
  let convertedOdSph = convertSpherical(odSph, vertexDistance);
  let convertedOsSph = convertSpherical(osSph, vertexDistance);
  let convertedOdCyl = roundToNearestQuarter(odCyl);
  let convertedOsCyl = roundToNearestQuarter(osCyl);
  convertAxis();

  return {
    rightEye: {
      spherical: roundToNearestQuarter(convertedOdSph),
      cylindrical: convertedOdCyl,
      axis: odAxis,
    },
    leftEye: {
      spherical: roundToNearestQuarter(convertedOsSph),
      cylindrical: convertedOsCyl,
      axis: osAxis,
    },
    lensType: lensType,
  };
}

document
  .getElementById("prescriptionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const odSph = parseFloat(document.getElementById("odSph").value) || 0;
    const odCyl = parseFloat(document.getElementById("odCyl").value) || 0;
    const odAxis = parseInt(document.getElementById("odAxis").value) || 0;
    const osSph = parseFloat(document.getElementById("osSph").value) || 0;
    const osCyl = parseFloat(document.getElementById("osCyl").value) || 0;
    const osAxis = parseInt(document.getElementById("osAxis").value) || 0;
    const prescription = document.getElementById("prescription");
    const lensType = document.querySelector(
      'input[name="lensType"]:checked'
    ).id;
    const Presbiopia = document.getElementById("Presbiopia").checked;

    const converted = convertPrescription(
      odSph,
      odCyl,
      odAxis,
      osSph,
      osCyl,
      osAxis,
      lensType
    );

    document.getElementById("result").innerHTML = `

    <h2>Prescrição Convertida:</h2>
    <div>
        <h2 class="lens_type_label">Olho direito:</h2>
        <div>
            <div class="form-group">
                <label for="ODcontactLensSphere"> Esférico:</label>
                <input type="text" value="${converted.rightEye.spherical.toFixed(
                  2
                )}" readonly disabled id="ODcontactLensSphere">
            </div>
            <div class="form-group">

                <label for="ODcontactLensCylinder">Cilíndrico:</label>
                <input type="text" value="${converted.rightEye.cylindrical.toFixed(
                  2
                )}" readonly disabled id="ODcontactLensCylinder">
            </div>
            <div class="form-group">
                <label for="ODcontactLensAxis">Eixo:</label>
                <input type="text" value="${
                  converted.rightEye.axis
                }" readonly disabled id="ODcontactLensAxis">
            </div>

        </div>
        <h2 class="lens_type_label">Olho esquerdo:</h2>
        <div>
            <div class="form-group">
                <label for="OScontactLensSphere"> Esférico:</label>

                <input type="text" value="${converted.leftEye.spherical.toFixed(
                  2
                )}" readonly disabled id="OScontactLensSphere">
            </div>
            <div class="form-group">
                <label for="OScontactLensCylinder">Cilíndrico:</label>

                <input type="text" value="${converted.leftEye.cylindrical.toFixed(
                  2
                )}" readonly disabled id="OScontactLensCylinder">
            </div>
            <div class="form-group">
                <label for="OScontactLensAxis">Eixo:</label>

                <input type="text" value="${
                  converted.leftEye.axis
                }" readonly disabled id="OScontactLensAxis">
            </div>
        </div>
        ${
          prescription
            ? `<p><strong>Prescrição de Presbiopia:</strong> ${prescription.value}</p>`
            : ""
        }
    </div>
`;
  });
