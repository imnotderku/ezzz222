const maxVol = require("../../config.js").opt.maxVol;

module.exports = {
    name: 'volume',
    aliases: ['vol' , 'głośność'],
    utilisation: `{prefix}głośność [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send(`${message.author}, Żadna Muzyka Nie Jest Obecnie Odtwarzana!. ❌`);

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send(`Obecna Głośność: **${queue.volume}** 🔊\n**Żeby Zmienić Głośność, od \`1\` do \`${maxVol}\` Napisz Numer Poniżej!.**`);

        if (queue.volume === vol) return message.channel.send(`${message.author}, Głośność Którą Chcesz Zmienić Jest Obecnie Ustawiona! ❌`);

        if (vol < 0 || vol > maxVol) return message.channel.send(`${message.author}, **Napisz Numer od \`1\` do \`${maxVol}\` Żeby Zmienić Głośność .** ❌`);

        const success = queue.setVolume(vol);

        return message.channel.send(success ? `Głośność Zmieniona: **%${vol}**/**${maxVol}** 🔊` : `${message.author}, Coś Poszło Nie Tak!. ❌`) ;
    },
};