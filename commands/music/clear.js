module.exports = {
    name: 'clear',
    aliases: [],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Żadna Muzyka Nie Jest Obecnie Odtwarzana. ❌`);

        if (!queue.tracks[0]) return message.channel.send(`${message.author}, Obecnie Nie Ma  Zadnej Muzyki W Kolejce Po Tej ❌`);

        await queue.clear();

        message.channel.send(`Kolejka Została Wyczyszczona!. 🗑️`);
    },
};