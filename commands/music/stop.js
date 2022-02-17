module.exports = {
    name: 'stop',
    aliases: ['st'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Żadna Muzyka Nie Jest Obecnie Odtwarzana!. ❌`);

        queue.destroy();

        message.channel.send(`Muzyka Odtwarzana Na Oporowcach Została Wyłączona... Widzimy Się Następny Razem ✅`);
    },
};