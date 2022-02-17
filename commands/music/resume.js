module.exports = {
    name: 'resume',
    aliases: [],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`${message.author}, Żadna Muzyka Nie Jest Obecnie!. ❌`);

        const success = queue.setPaused(false);

        return message.channel.send(success ? `**${queue.current.title}**, Ta Muzyka Została Odpałzowana!. ✅` : `${message.author}, Coś Poszło Nie Tak!. ❌`);
    },
};