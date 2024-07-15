let handler = async (m, { conn, text, mentionedJid }) => {
    let user1 = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
    let user2 = m.mentionedJid[1] ? m.mentionedJid[1] : false;

    if (!user1 || !user2) {
        return conn.reply(m.chat, 'Etiqueta dos usuarios o una etiqueta y una cita', m);
    }

    let jodohReasons = [
        "Ustedes dos tienen similitudes extraordinarias y se complementan.",
        "Su relación está llena de comprensión y apoyo mutuo.",
        "Tienen una química fuerte y se complementarán",
        "Se entienden sin necesidad de muchas palabras.",
        "Ustedes dos siempre encuentran la manera de hacerse sonreír el uno al otro.",
        "Tenéis los mismos objetivos de vida y os apoyáis mutuamente.",
        "Ustedes dos se respetan mucho el uno al otro.",
        "Podéis confiar el uno en el otro en cualquier situación.",
        "Siempre os sentís cómodos y seguros cuando estáis juntos.",
        "Ustedes dos siempre saben cómo hacerse felices el uno al otro.",
        "Tenéis los mismos intereses y podéis disfrutarlos juntos.",
        "Podéis complementaros de muchas maneras.",
        "Siempre se apoyan y alientan mutuamente.",
        "Ustedes dos tienen una manera única de demostrar amor.",
        "Comparten muchos recuerdos hermosos juntos.",
        "Siempre encuentras una manera de resolver los problemas juntos.",
        "Se entienden y aceptan los defectos de los demás".
   ];

    let tidakReasons = [
        "Aunque ustedes sean buenos, es posible que no sean adecuados juntos".
        "Puede que sean mejores como amigos que como pareja.",
        "Sus diferencias son demasiado grandes para superarlas en una relación romántica.",
        "Es posible que tengas diferentes visiones de la vida.",
        "Hay demasiadas diferencias que dificultan la relación.",
        "Puede que le resulte difícil encontrar puntos en común en asuntos importantes.",
        "Tiendes a pelear a menudo y te resulta difícil llegar a un acuerdo.",
        "Es posible que les falten similitudes en valores y principios.",
        "Podrías ser más feliz si estuvieras con otra persona.",
        "Sus diferencias de personalidad pueden ser difíciles de superar.",
        "Puede que le resulte difícil comunicarse eficazmente.",
        "Es posible que no puedan comprender las necesidades de los demás.",
        "Quizás sería mejor que vivieran sus vidas separadas.",
        "Es posible que te falte compatibilidad a largo plazo.",
        "Es posible que carezcan de algo en común en aspectos importantes.",
        "Puede que les resulte difícil ponerse de acuerdo sobre asuntos importantes."
    ];

    let result = pickRandom(["Pareja", "No"]);
    let reason = result === "Pareja" ? pickRandom(jodohReasons) : pickRandom(tidakReasons);

    conn.reply(m.chat, `
⬣───「 *BUSQUESA DE PAREJA 」───⬣
⬡ Nombre 1: @${user1.split`@`[0]}
⬡ Nombre 2: @${user2.split`@`[0]}
⬡ Resultado: ${result}
⬡ Razon: ${reason}
⬣────────────────⬣
`.trim(), m, { mentions: [user1, user2] });
};

handler.command = /^(parejaideal)$/i;
export default handler
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
