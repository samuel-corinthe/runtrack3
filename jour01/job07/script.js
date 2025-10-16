function jourtravaille(dateStr) {
    const [jour, mois, année] = dateStr.split('-');
    const date = new Date(`${année}-${mois}-${jour}`);

    const jourSemaine = date.getDay();
    const format = String(date.getDate()).padStart(2, '0') + '-' +
                   String(date.getMonth() + 1).padStart(2, '0') + '-' +
                   String(date.getFullYear());

    const jourFerier = [
        '25-12-2025', '26-12-2025', '01-01-2026', '13-04-2026',
        '01-05-2026', '08-05-2026', '21-05-2026', '01-06-2026',
        '14-07-2026', '15-08-2026', '01-11-2026', '11-11-2026'
    ];

    if (jourFerier.includes(format)) {
        console.log(`${dateStr} est un jour férié`);
        return;
    }

    if (jourSemaine === 0 || jourSemaine === 6) {
        console.log(`${dateStr} est un weekend`);
        return;
    }

    console.log(`${dateStr} est un jour travaillé`);
}

jourtravaille('25-12-2025');
