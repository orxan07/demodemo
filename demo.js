// расчет массы
for (let i = 1; i <= N + 1; i++) {
            let Dm = 0.5 * (D[i] + D[i - 1]);
            let Dms = 0.5 * (Ds[i] + Ds[i - 1]);

            let Vm = 0.5 * (V[i] + V[i - 1]);
            let Vms = 0.5 * (Vs[i] + Vs[i - 1]);

            let hm = 0.5 * (h[i] + h[i - 1]);


            let Msm = Vms * Dms - Ims,
                Mm = Vm * Dm - Im;

            Mw[i] = 0.5 * (Msm + Mm);
        }

        for (let i = 1; i <= N; i++) {
            Md[i] = 0.5 * (Mw[i + 1] + Mw[i]);
        }


for (let i = 1; i < N; i++) {
    let dM = Mw[i + 1] - Mw[i];

    fr[i] = h[i] * (Ds[i] - D[i]) + dt * dM;

}

//Расчет импульса

for (let i = 1; i < N; i++) {

    let Dps = 0.5 * (Ds[i + 1] + Ds[i]);
    let Dp = 0.5 * (D[i + 1] + D[i]);
    let Dpps = 0.5 * (Ds[i + 2] + Ds[i + 1]);
    let Dpp = 0.5 * (D[i + 2] + D[i + 1]);
    let Dms = 0.5 * (Ds[i] + Ds[i - 1]);
    let Dm = 0.5 * (D[i] + D[i - 1]);

    let Vp = 0.5 * (V[i + 1] + V[i]);
    let Vpp = 0.5 * (V[i + 1] + V[i + 2]);
    let Vm = 0.5 * (V[i] + V[i - 1]);
    let Vps = 0.5 * (Vs[i + 1] + Vs[i]);
    let Vpps = 0.5 * (Vs[i + 1] + Vs[i + 2]);
    let Vms = 0.5 * (Vs[i] + Vs[i - 1]);


    let sqrt = Math.sqrt;

    //плотностные весы
    let wps = sqrt(Dps) / (sqrt(Dps) + sqrt(Dp)),
        wpps = sqrt(Dpps) / (sqrt(Dpps) + sqrt(Dpp)),
        wms = sqrt(Dms) / (sqrt(Dms) + sqrt(Dm));

    let V1 = 0.5 * (Vp * (1 - wps) + Vps * wps + Vpp * (1 - wpps) + Vpps * wpps);
    let V2 = 0.5 * (Vm * (1 - wms) + Vms * wms + Vp * (1 - wps) + Vps * wps);

    let mp = 0.5 * (D[i] * h[i] + D[i + 1] * h[i + 1]);
    let mps = 0.5 * (Ds[i] * h[i] + Ds[i + 1] * h[i + 1]);


    let P1 = Ps[i + 1] + P[i + 1];
    let P2 = Ps[i] + P[i];
    let dP = 0.5 * (P1 - P2); // весы = 0.5

    let dM = Md[i + 1] * V1 - Md[i] * V2;

   fv[i] = (mps * Vps - mp * Vp) + dt * (dP + dM);
}

//расчет энергии

for (let i = 1; i < N; i++) {
    let Ep = 0.5 * (E[i + 1] + E[i]);
    let Em = 0.5 * (E[i] + E[i - 1]);
    let Eps = 0.5 * (Es[i + 1] + Es[i]);
    let Ems = 0.5 * (Es[i] + Es[i - 1]);

    let Dms = 0.5 * (Ds[i] + Ds[i - 1]);
    let Dm = 0.5 * (D[i] + D[i - 1]);
    let Dps = 0.5 * (Ds[i + 1] + Ds[i]);
    let Dp = 0.5 * (D[i + 1] + D[i]);

    let Vp = 0.5 * (V[i + 1] + V[i]);
    let Vm = 0.5 * (V[i] + V[i - 1]);
    let Vps = 0.5 * (Vs[i + 1] + Vs[i]);
    let Vms = 0.5 * (Vs[i] + Vs[i - 1]);

    let hp = 0.5 * (h[i + 1] + h[i]),
        hm = 0.5 * (h[i] + h[i - 1]);

    let Msp = (Vps * Eps),
        Msm = (Vms * Ems),
        Mp = (Vp * Ep ),
        Mm = (Vm * Em);

    let sqrt = Math.sqrt;

    let wps = sqrt(Dps) / (sqrt(Dps) + sqrt(Dp)),
        wms = sqrt(Dms) / (sqrt(Dms) + sqrt(Dm));


    let M1 = 0.5 * (Msp + Mp);
    let M2 = 0.5 * (Msm + Mm);

    let dP = 0.5 * (Ps[i] + P[i]);
    let dM = M1 - M2;


    let dV = (wps * Vps + (1 - wps) * Vp) -
        (wms * Vms + (1 - wms) * Vm);

    fe[i] = h[i] * (Es[i] - E[i]) + dt * (dP * dV + dM);

}