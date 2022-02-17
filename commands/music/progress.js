module.exports = {
    name: 'progress',
    aliases: ["time"],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Żadna Muzyka Nie Jest Obecnie Odtwarzana!. ❌`);

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return message.channel.send(`ta Muzyka Jest Strimowana Na Żywo Brak Danych O Długosci Muzyki!. 🎧`);

        message.channel.send(`${progress} (**${timestamp.progress}**%)`);
    },
};