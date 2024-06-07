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
    }
    if (osCyl >= -0.75) {
      osSph = osSph + osCyl / 2;
      osCyl = 0;
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
    <p><strong>Tipo de Lente:</strong> ${converted.lensType}</p>
    <h2>Prescrição Convertida:</h2>
    <table>
        <tr>
            <th class="empty"></th>
            <th>Esférico</th>
            <th>Cilíndrico</th>
            <th>Eixo</th>
        </tr>
        <tr>
            <td><strong>OD (Olho Direito):</strong></td>
            <td>${converted.rightEye.spherical.toFixed(2)}</td>
            <td>${converted.rightEye.cylindrical.toFixed(2)}</td>
            <td>${converted.rightEye.axis}</td>
        </tr>
        <tr>
            <td><strong>OS (Olho Esquerdo):</strong></td>
            <td>${converted.leftEye.spherical.toFixed(2)}</td>
            <td>${converted.leftEye.cylindrical.toFixed(2)}</td>
            <td>${converted.leftEye.axis}</td>
        </tr>
        <tr> 
          <td><strong>Presbiopia:</strong></td>
          <td>${Presbiopia ? "Sim" : "Não"}</td>
          <td>${prescription ? prescription.value : ""}</td>

        </tr>

       
    </table>
    
`;
  });
