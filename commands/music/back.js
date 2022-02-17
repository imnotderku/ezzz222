module.exports = {
    name: 'back',
    aliases: [],
    utilisation: '{prefix}cofnij',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Muzyka Nie Jest Obecnie Odtwarzana! ❌`);

        if (!queue.previousTracks[1]) return message.channel.send(`${message.author}, Muzyka Nie Grała Wczesniej! ❌`);

        await queue.back();

        message.channel.send(`Odtwarzam Poprzednią Muzyke... ✅`);
    },
};