const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'pętla',
    aliases: ['lp' , 'pętla' , 'loop'],
    utilisation: '{prefix}pętla <kolejka>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

 
if (!queue || !queue.playing) return message.channel.send(`${message.author}, Żadna Muzyka Nie Jest Obecnie Odtwarzana!. ❌`);

        if (args.join('').toLowerCase() === 'kolejka') {
            if (queue.repeatMode === 1) return message.channel.send(`${message.author}, Musisz Najpierw Wyłączyc Tryb Pętli! **(${client.config.px}pętla)** ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `	Tryb Pętli: **${queue.repeatMode === 0 ? 'Nieaktywny' : 'Aktywny'}**, Ta Sekwencja Muzyczna Będzie Odtwarzana Non Stop! 🔁` : `${message.author}, Coś Poszło Nie Tak!. ❌`);
        } else {
            if (queue.repeatMode === 2) return message.channel.send(`${message.author}, W Trybie Pętli Musisz Najpierw Wyłączyc Kolejke! **(${client.config.px}Kolejka Pętli)** ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Tryb Pętli: **${queue.repeatMode === 0 ? 'Nieaktywny' : 'Aktywny'}**, Obecna Muzyka Będzie Odtwarzana Non Stop (Aby Zapętlić Kolejke Wpisz: **${client.config.px} **  A Twoja Kolejka Zostanie Powtarzana Non Stop!.) 🔂` : `${message.author}, Coś Poszło Nie Tak! ❌`);
};
    },
};