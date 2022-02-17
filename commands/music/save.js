module.exports = {
    name: 'save',
    aliases: [],
    utilisation: '{prefix}save',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

  if (!queue || !queue.playing) return message.channel.send(`${message.author}, Żadna Muzyka Nie Jest Obecnie Odtwarzana!. ❌`);

        message.author.send(`Zarejestrowana Muzyka: **${queue.current.title}** | ${queue.current.author}, Zapisany Serwer: **${message.guild.name}** ✅`) .then(() => {
            message.channel.send(`Wysłałem Tytuł Piosenki Na Prywatną Wiadomość. ✅`);
        }).catch(error => {
            message.channel.send(`${message.author}, Nie Moge Wysłac Ci Prywatnej Wiadomosci!. ❌`);
        });
    },
};