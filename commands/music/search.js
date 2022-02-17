const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: [],
    utilisation: '{prefix}search [Nazwa Muzyki]',
    voiceChannel: true,

    async execute(client, message, args) {
      
if (!args[0]) return message.channel.send(`${message.author}, Prosze wpisz prawdziwą nazwe muzyki!. ❌`);

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`${message.author}, Nic Nie Znaleziono. ❌`);

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setTitle(`Wyszukana Muzyka: ${args.join(' ')}`);

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nWybierz Muzyke Od **1** do **${maxTracks.length}** Napisz Cyfre Utworu I Wyslij! Aby Anulowac Napisz: **cancel**.⬇️`);

        embed.setTimestamp();
        embed.setFooter('OPOROWCY DEVELOPING BOT TEAM❤️', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

       collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send(`Call cancelled. ✅`) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`Error: Wybierz Muzyke od **1** do **${maxTracks.length}** Napisz Cyfre Utworu I Wyslij! Aby Anulowac Napisz: **cancel**❌`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await client.player.deleteQueue(message.guild.id);
                return message.channel.send(`${message.author}, Nie Moge Dołączyc Na Kanał Głosowy!. ❌`);
            }

            await message.channel.send(`Ładuje Twoje Muzyczne Połączenie. 🎧`);

            queue.addTrack(res.tracks[Number(query.content)-1]);
            if (!queue.playing) await queue.play();
           
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send(`${message.author}, Wyszukanie Muzyki Wygasło... ❌`);
        });
    },
};