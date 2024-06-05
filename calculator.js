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
    return Math.round(value * 4) / 4;
  }

  let convertedOdSph = convertSpherical(odSph, vertexDistance);
  let convertedOsSph = convertSpherical(osSph, vertexDistance);

  return {
    rightEye: {
      spherical: roundToNearestQuarter(convertedOdSph),
      cylindrical: odCyl,
      axis: odAxis,
    },
    leftEye: {
      spherical: roundToNearestQuarter(convertedOsSph),
      cylindrical: osCyl,
      axis: osAxis,
    },
    lensType: lensType,
  };
}
document
  .getElementById("prescriptionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let zero = 0;
    const odSph = parseFloat(document.getElementById("odSph").value) || 0;
    const odCyl = parseFloat(document.getElementById("odCyl").value) || 0;
    const odAxis = parseInt(document.getElementById("odAxis").value) || 0;
    const osSph = parseFloat(document.getElementById("osSph").value) || 0;
    const osCyl = parseFloat(document.getElementById("osCyl").value) || 0;
    const osAxis = parseInt(document.getElementById("osAxis").value) || 0;
    const lensType = document.querySelector(
      'input[name="lensType"]:checked'
    ).id;

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
    </table>
    
`;
  });
