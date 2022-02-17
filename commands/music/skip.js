module.exports = {
    name: 'skip',
    aliases: [],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Żadna Muzyka Nie Jest Obecnie Odtwarzana!. ❌`);

        const success = queue.skip();

        return message.channel.send(success ? `**${queue.current.title}**, Pominąłeś Utwór ✅` : `${message.author}, Coś Poszło Nie Tak! ❌`);
    },
};