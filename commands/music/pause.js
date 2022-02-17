module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send(`${message.author}, Żadna Muzyka Nie Jest Obecnie Odtwarzana!. ❌`);

        const success = queue.setPaused(true);

        return message.channel.send(success ? `Muzyka Która Grała O Tytule: **${queue.current.title}** Została Wstrzymana! ✅` : `${message.author}, Coś Poszło Nie Tak!. ❌`);
    },
};